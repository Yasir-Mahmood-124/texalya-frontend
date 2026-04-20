"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, AlertCircle } from "lucide-react";
import UploadCard from "@/components/medimind/UploadCard";
import AnalysisLoader from "@/components/medimind/AnalysisLoader";
import DiagnosisResult from "@/components/medimind/DiagnosisResult";
import {
  useUploadReportMutation,
  useLazyGetReportQuery,
  type GetReportResponse,
} from "@/redux/services/medimind/medimind";

type FlowState = "idle" | "uploading" | "analyzing" | "completed" | "timeout" | "error";

const POLL_INTERVAL_MS = 3_000;  // poll every 3 s
const POLL_TIMEOUT_MS  = 60_000; // give up after 60 s

export default function MediMindPage() {
  const [flowState, setFlowState] = useState<FlowState>("idle");
  const [result,    setResult]    = useState<GetReportResponse | null>(null);
  const [errorMsg,  setErrorMsg]  = useState("");
  const [elapsed,   setElapsed]   = useState(0);

  const [uploadReport] = useUploadReportMutation();
  const [fetchReport]  = useLazyGetReportQuery();

  const pollRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);

  /* Cleanup on unmount */
  useEffect(() => () => { stopPolling(); }, []);

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const startPolling = (report_id: string) => {
    elapsedRef.current = 0;
    setElapsed(0);
    setFlowState("analyzing");

    pollRef.current = setInterval(async () => {
      elapsedRef.current += POLL_INTERVAL_MS;
      setElapsed(elapsedRef.current);

      /* Timed out */
      if (elapsedRef.current >= POLL_TIMEOUT_MS) {
        stopPolling();
        setFlowState("timeout");
        return;
      }

      try {
        /* preferCacheValue=false forces a fresh network request each tick */
        const data = await fetchReport(report_id, false).unwrap();
        if (data.status === "completed" && data.diagnosis) {
          stopPolling();
          setResult(data);
          setFlowState("completed");
        }
      } catch {
        /* Ignore transient errors — keep polling */
      }
    }, POLL_INTERVAL_MS);
  };

  const handleUpload = async (file: File) => {
    setFlowState("uploading");
    setErrorMsg("");

    try {
      /* Step 1 — get presigned URL */
      const { report_id, presigned_url } = await uploadReport().unwrap();

      /* Step 2 — PUT the PDF directly to S3 */
      const s3Res = await fetch(presigned_url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": "application/pdf" },
      });

      if (!s3Res.ok) throw new Error(`S3 upload failed (${s3Res.status})`);

      /* Step 3 — start polling get-report */
      startPolling(report_id);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Upload failed. Please try again.",
      );
      setFlowState("error");
    }
  };

  const handleReset = () => {
    stopPolling();
    setFlowState("idle");
    setResult(null);
    setErrorMsg("");
    setElapsed(0);
    elapsedRef.current = 0;
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8">

      {/* ── Page header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center">
            <Brain size={15} className="text-[var(--gold-primary)]" />
          </div>
          <h1 className="text-xl font-bold text-white">MediMind Agent</h1>
        </div>
        <p className="text-sm text-gray-500 ml-11">
          Upload a medical report PDF and let AI diagnose it for you
        </p>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col items-center">

        {/* Upload / error state */}
        {(flowState === "idle" || flowState === "uploading" || flowState === "error") && (
          <div className="w-full max-w-2xl rounded-2xl bg-[#111111] border border-[var(--gold-primary)]/30 p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-base font-semibold text-white">Upload Medical Report</h2>
              <p className="text-xs text-gray-500 mt-1">Supported format: PDF</p>
            </div>

            <UploadCard
              onUpload={handleUpload}
              isUploading={flowState === "uploading"}
            />

            {flowState === "error" && (
              <div className="flex items-center justify-center gap-2 text-xs text-red-400">
                <AlertCircle size={13} />
                {errorMsg}
              </div>
            )}
          </div>
        )}

        {/* Analyzing state */}
        {flowState === "analyzing" && (
          <div className="w-full max-w-2xl rounded-2xl bg-[#111111] border border-[var(--gold-primary)]/30 p-8">
            <AnalysisLoader elapsed={elapsed} timeout={POLL_TIMEOUT_MS} />
          </div>
        )}

        {/* Timeout state */}
        {flowState === "timeout" && (
          <div className="w-full max-w-2xl rounded-2xl bg-[#111111] border border-white/[0.08] p-12 flex flex-col items-center gap-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <span className="text-2xl select-none">⏱</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Analysis is taking longer than expected
              </h3>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                The report is still being processed. Please try again in a few moments.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[var(--gold-primary)]/40 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/5 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Completed state */}
        {flowState === "completed" && result?.diagnosis && (
          <div className="w-full max-w-2xl pb-8">
            <DiagnosisResult
              diagnosis={result.diagnosis}
              reportId={result.report_id ?? ""}
              onReset={handleReset}
            />
          </div>
        )}

      </div>
    </div>
  );
}
