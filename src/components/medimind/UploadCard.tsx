"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

interface Props {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export default function UploadCard({ onUpload, isUploading }: Props) {
  const [file, setFile]       = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !file && !isUploading && inputRef.current?.click()}
        className={`w-full rounded-2xl border-2 border-dashed p-14 flex flex-col items-center gap-4 transition-all duration-300 ${
          dragging
            ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/5"
            : file
            ? "border-[var(--gold-primary)]/50 bg-[var(--gold-primary)]/5"
            : "border-white/[0.12] hover:border-[var(--gold-primary)]/40 hover:bg-white/[0.02] cursor-pointer"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />

        {file ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center">
              <FileText size={26} className="text-[var(--gold-primary)]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {file.size < 1024 * 1024
                  ? `${(file.size / 1024).toFixed(1)} KB`
                  : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
              </p>
            </div>
            {!isUploading && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-white transition-colors"
              >
                <X size={12} /> Remove file
              </button>
            )}
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <UploadCloud size={26} className="text-gray-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">Drop your medical report here</p>
              <p className="text-xs text-gray-500 mt-1.5">or click to browse — PDF only</p>
            </div>
          </>
        )}
      </div>

      {/* Analyse button */}
      {file && (
        <button
          type="button"
          onClick={() => onUpload(file)}
          disabled={isUploading}
          className="flex items-center gap-2 px-8 py-3 rounded-xl animate-button-gradient text-white text-sm font-medium hover:scale-[1.02] hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <UploadCloud size={15} />
              Analyze Report
            </>
          )}
        </button>
      )}
    </div>
  );
}
