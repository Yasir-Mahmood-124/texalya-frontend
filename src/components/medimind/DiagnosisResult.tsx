"use client";

import {
  CheckCircle2, AlertTriangle, Shield, Info, FileText, ChevronRight, RotateCcw,
} from "lucide-react";
import type { Diagnosis } from "@/redux/services/medimind/medimind";

/* ── Renders a disease object as key-value rows ── */
function DiseaseCard({
  title,
  disease,
}: {
  title: string;
  disease: Record<string, unknown>;
}) {
  const entries = Object.entries(disease).filter(
    ([, v]) => v !== null && v !== undefined && v !== "",
  );
  if (entries.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#111111] border border-[var(--gold-primary)]/30 p-5">
      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-primary)] mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-start gap-2">
            <ChevronRight
              size={11}
              className="text-[var(--gold-primary)]/50 mt-0.5 flex-shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[11px] text-gray-500 capitalize">
                {key.replace(/_/g, " ")}:{" "}
              </span>
              <span className="text-xs text-white break-words">
                {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */
interface Props {
  diagnosis: Diagnosis;
  reportId: string;
  onReset: () => void;
}

export default function DiagnosisResult({ diagnosis, reportId, onReset }: Props) {
  const hasPrimary   = Object.keys(diagnosis.primary_disease).length > 0;
  const hasSecondary = Object.keys(diagnosis.secondary_disease).length > 0;
  const hasDetails   = Object.keys(diagnosis.details).length > 0;

  return (
    <div className="space-y-4 w-full">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center">
            <CheckCircle2 size={15} className="text-[var(--gold-primary)]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Analysis Complete</h2>
            <p className="text-[11px] text-gray-600">Report ID: {reportId}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.1] text-gray-400 text-xs hover:border-[var(--gold-primary)]/40 hover:text-[var(--gold-primary)] transition-all duration-200"
        >
          <RotateCcw size={11} /> New Analysis
        </button>
      </div>

      {/* ── Disease cards ── */}
      {(hasPrimary || hasSecondary) && (
        <div className={`grid gap-4 ${hasPrimary && hasSecondary ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
          {hasPrimary   && <DiseaseCard title="Primary Diagnosis"   disease={diagnosis.primary_disease}   />}
          {hasSecondary && <DiseaseCard title="Secondary Diagnosis" disease={diagnosis.secondary_disease} />}
        </div>
      )}

      {/* ── Reasons ── */}
      {diagnosis.reasons.length > 0 && (
        <div className="rounded-2xl bg-[#111111] border border-[var(--gold-primary)]/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info size={13} className="text-[var(--gold-primary)]" />
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-primary)]">
              Clinical Reasons
            </h3>
          </div>
          <ul className="space-y-2">
            {diagnosis.reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 text-[var(--gold-primary)] text-[9px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-xs text-gray-300 leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Details ── */}
      {hasDetails && (
        <div className="rounded-2xl bg-[#111111] border border-[var(--gold-primary)]/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={13} className="text-[var(--gold-primary)]" />
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-primary)]">
              Details
            </h3>
          </div>
          <div className="space-y-2">
            {Object.entries(diagnosis.details).map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <ChevronRight size={11} className="text-[var(--gold-primary)]/50 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] text-gray-500 capitalize">
                    {key.replace(/_/g, " ")}:{" "}
                  </span>
                  <span className="text-xs text-white break-words">
                    {typeof value === "object" ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Safety measures ── */}
      {diagnosis.safety_measures.length > 0 && (
        <div className="rounded-2xl bg-[#111111] border border-[var(--gold-primary)]/30 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={13} className="text-[var(--gold-primary)]" />
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-primary)]">
              Safety Measures
            </h3>
          </div>
          <ul className="space-y-2">
            {diagnosis.safety_measures.map((measure, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={12} className="text-[var(--gold-primary)]/60 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-300 leading-relaxed">{measure}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Disclaimer ── */}
      {diagnosis.disclaimer && (
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 flex items-start gap-2.5">
          <AlertTriangle size={13} className="text-yellow-500/60 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-gray-600 leading-relaxed">{diagnosis.disclaimer}</p>
        </div>
      )}

    </div>
  );
}
