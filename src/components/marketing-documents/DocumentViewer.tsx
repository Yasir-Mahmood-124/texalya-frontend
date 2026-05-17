"use client";

import React, { useState } from "react";
import {
  ArrowLeft, FileText, Download, MessageSquarePlus, Clock,
} from "lucide-react";
import { StrategyDoc, TYPE_STYLES } from "./types";

interface Props {
  doc: StrategyDoc;
  onBack: () => void;
  onEditWithAI: (doc: StrategyDoc) => void;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export default function DocumentViewer({ doc, onBack, onEditWithAI }: Props) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const typeStyle = TYPE_STYLES[doc.type];

  const handlePrint = () => {
    window.print();
    setShowExportMenu(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">

      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 px-4 h-[52px] border-b border-white/[0.06] bg-[#111111] flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs px-2 py-1.5 rounded-lg hover:bg-white/[0.05]"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="w-px h-5 bg-white/[0.08]" />

        {/* Title */}
        <h1 className="flex-1 min-w-0 text-sm font-semibold text-white truncate">
          {doc.title}
        </h1>

        {/* Type badge */}
        <span className={`hidden sm:inline-flex text-[10px] px-2.5 py-0.5 rounded-full border flex-shrink-0 ${typeStyle.badge}`}>
          {doc.type}
        </span>

        {/* Modified date */}
        <div className="hidden md:flex items-center gap-1 text-[11px] text-gray-600 flex-shrink-0">
          <Clock size={11} />
          <span>Updated {formatDate(doc.updatedAt)}</span>
        </div>

        <div className="w-px h-5 bg-white/[0.08]" />

        {/* Edit with AI button */}
        <button
          onClick={() => onEditWithAI(doc)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all flex-shrink-0"
        >
          <MessageSquarePlus size={13} />
          <span className="hidden sm:inline">Edit with AI</span>
        </button>

        {/* Export */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export</span>
          </button>
          {showExportMenu && (
            <div className="absolute right-0 top-9 w-44 rounded-xl bg-[#1c1c1c] border border-white/[0.10] py-1 shadow-2xl shadow-black/80 z-20 animate-slideUp">
              <button
                onClick={handlePrint}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <FileText size={12} className="text-gray-500" /> Print / Save as PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Document canvas area ── */}
      <div className="flex-1 overflow-y-auto py-8 px-6 bg-[#080808]">

        {/* Document info banner */}
        <div className="max-w-[816px] mx-auto mb-4 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#111111] border border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center flex-shrink-0">
            <FileText size={13} className="text-[var(--gold-primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{doc.title}</p>
            <p className="text-[10px] text-gray-500">{doc.wordCount.toLocaleString()} words · {doc.type}</p>
          </div>
          <button
            onClick={() => onEditWithAI(doc)}
            className="flex-shrink-0 flex items-center gap-1.5 text-[11px] text-[var(--gold-primary)]/80 hover:text-[var(--gold-primary)] transition-colors"
          >
            <MessageSquarePlus size={12} />
            Refine with AI
          </button>
        </div>

        {/* A4 document */}
        <div className="max-w-[816px] mx-auto bg-white rounded-xl shadow-2xl shadow-black/70 overflow-hidden">
          {/* Type-colored top strip */}
          <div className={`h-1 w-full bg-gradient-to-r ${typeStyle.bar}`} />

          <div className="px-[88px] py-[80px]">
            <div
              className="we-canvas text-[#1a1a1a] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: doc.content }}
            />
          </div>
        </div>

        {/* Bottom action strip */}
        <div className="max-w-[816px] mx-auto mt-4 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#111111] border border-white/[0.06]">
          <p className="text-[11px] text-gray-600">
            Created {formatDate(doc.createdAt)}
          </p>
          <button
            onClick={() => onEditWithAI(doc)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all"
          >
            <MessageSquarePlus size={12} />
            Continue editing with AI
          </button>
        </div>
      </div>
    </div>
  );
}
