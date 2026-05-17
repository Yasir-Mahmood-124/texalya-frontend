"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Plus, Search, FileText, Clock, MoreVertical, Trash2,
  PenLine, Grid3X3, LayoutList, FileEdit, FolderOpen,
} from "lucide-react";
import { WEDocument } from "./types";

interface Props {
  documents: WEDocument[];
  onNewDoc: () => void;
  onOpenDoc: (doc: WEDocument) => void;
  onDeleteDoc: (id: string) => void;
  onRenameDoc: (id: string, newTitle: string) => void;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function HomeView({ documents, onNewDoc, onOpenDoc, onDeleteDoc, onRenameDoc }: Props) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [menuDocId, setMenuDocId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const filtered = search.trim()
    ? documents.filter(d => d.title.toLowerCase().includes(search.toLowerCase()))
    : documents;

  const totalWords = documents.reduce((sum, d) => sum + (d.wordCount || 0), 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuDocId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (renamingId && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [renamingId]);

  const startRename = (doc: WEDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuDocId(null);
    setRenamingId(doc.id);
    setRenameValue(doc.title);
  };

  const commitRename = () => {
    if (renamingId && renameValue.trim()) onRenameDoc(renamingId, renameValue.trim());
    setRenamingId(null);
  };

  return (
    <div className="min-h-screen px-8 py-8">

      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <FileEdit size={18} className="text-[var(--gold-primary)]" />
          <h1 className="text-2xl font-semibold text-white">Word Editor</h1>
        </div>
        <p className="text-sm text-gray-500">Create, edit, and manage your documents.</p>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-5">
          <div>
            <span className="text-2xl font-bold text-white">{documents.length}</span>
            <span className="text-sm text-gray-500 ml-2">Documents</span>
          </div>
          <div className="w-px h-6 bg-white/[0.08]" />
          <div>
            <span className="text-2xl font-bold text-white">{totalWords.toLocaleString()}</span>
            <span className="text-sm text-gray-500 ml-2">Total Words</span>
          </div>
        </div>
      </div>

      {/* ── Toolbar row ── */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-[#111111] border border-white/[0.08] text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--gold-primary)]/40 transition-colors"
          />
        </div>

        <div className="flex-1" />

        {/* View toggle */}
        <div className="flex items-center rounded-xl bg-[#111111] border border-white/[0.08] p-1 gap-0.5">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-[var(--gold-primary)]/15 text-[var(--gold-primary)]" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Grid3X3 size={14} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[var(--gold-primary)]/15 text-[var(--gold-primary)]" : "text-gray-500 hover:text-gray-300"}`}
          >
            <LayoutList size={14} />
          </button>
        </div>

        <button
          onClick={onNewDoc}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all"
        >
          <Plus size={15} />
          New Document
        </button>
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#111111] border border-white/[0.06] flex items-center justify-center mb-5 shadow-inner">
            <FileText size={34} className="text-gray-700" />
          </div>
          <p className="text-white font-medium mb-1.5">
            {search ? "No documents match your search" : "No documents yet"}
          </p>
          <p className="text-sm text-gray-500 mb-7">
            {search ? "Try a different keyword" : "Create your first document to get started"}
          </p>
          {!search && (
            <button
              onClick={onNewDoc}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all"
            >
              <Plus size={15} />
              Create Document
            </button>
          )}
        </div>

      ) : viewMode === "grid" ? (
        /* ── Grid view ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {/* New document card */}
          <button
            onClick={onNewDoc}
            className="h-48 rounded-2xl border-2 border-dashed border-white/[0.07] hover:border-[var(--gold-primary)]/35 hover:bg-[var(--gold-primary)]/[0.03] flex flex-col items-center justify-center gap-3 text-gray-600 hover:text-[var(--gold-primary)] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-current flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={18} />
            </div>
            <span className="text-sm font-medium">New Document</span>
          </button>

          {/* Document cards */}
          {filtered.map(doc => (
            <div
              key={doc.id}
              onClick={() => renamingId !== doc.id && onOpenDoc(doc)}
              className="h-48 rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.14] hover:shadow-xl hover:shadow-black/50 cursor-pointer group relative flex flex-col overflow-hidden transition-all duration-200"
            >
              {/* Sky accent top bar */}
              <div className="h-0.5 w-full bg-gradient-to-r from-[var(--gold-primary)]/50 via-[var(--gold-primary)]/20 to-transparent flex-shrink-0" />

              <div className="flex-1 p-4 flex flex-col">
                {/* Icon + menu row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--gold-primary)]/15 transition-colors">
                    <FileText size={16} className="text-[var(--gold-primary)]" />
                  </div>

                  <div className="relative" ref={menuDocId === doc.id ? menuRef : undefined}>
                    <button
                      onClick={e => { e.stopPropagation(); setMenuDocId(menuDocId === doc.id ? null : doc.id); }}
                      className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <MoreVertical size={13} />
                    </button>

                    {menuDocId === doc.id && (
                      <div className="absolute right-0 top-7 w-40 rounded-xl bg-[#1c1c1c] border border-white/[0.10] py-1 shadow-2xl shadow-black/80 z-20 animate-slideUp">
                        <button
                          onClick={e => { e.stopPropagation(); onOpenDoc(doc); setMenuDocId(null); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <FolderOpen size={12} className="text-gray-500" />
                          Open
                        </button>
                        <button
                          onClick={e => startRename(doc, e)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <PenLine size={12} className="text-gray-500" />
                          Rename
                        </button>
                        <div className="mx-2 my-0.5 border-t border-white/[0.06]" />
                        <button
                          onClick={e => { e.stopPropagation(); onDeleteDoc(doc.id); setMenuDocId(null); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-red-400 hover:bg-red-500/[0.07] transition-colors"
                        >
                          <Trash2 size={12} className="text-gray-500" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                {renamingId === doc.id ? (
                  <input
                    ref={renameInputRef}
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onClick={e => e.stopPropagation()}
                    onBlur={commitRename}
                    onKeyDown={e => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setRenamingId(null); }}
                    className="text-sm font-medium text-white bg-white/[0.08] rounded-lg px-2 py-1 outline-none border border-[var(--gold-primary)]/40 w-full"
                  />
                ) : (
                  <h3 className="text-sm font-medium text-white leading-snug line-clamp-2 flex-1">
                    {doc.title}
                  </h3>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 pb-3.5 flex items-center justify-between border-t border-white/[0.04] pt-2.5">
                <div className="flex items-center gap-1 text-[11px] text-gray-600">
                  <Clock size={10} />
                  <span>{formatDate(doc.updatedAt)}</span>
                </div>
                <span className="text-[11px] text-gray-600">
                  {(doc.wordCount || 0).toLocaleString()} words
                </span>
              </div>
            </div>
          ))}
        </div>

      ) : (
        /* ── List view ── */
        <div className="rounded-2xl bg-[#111111] border border-white/[0.06] overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_148px_96px_44px] px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-600">Name</span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-600">Modified</span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-600 text-right">Words</span>
            <span />
          </div>

          {filtered.map((doc, i) => (
            <div
              key={doc.id}
              onClick={() => renamingId !== doc.id && onOpenDoc(doc)}
              className={`grid grid-cols-[1fr_148px_96px_44px] px-5 py-3.5 cursor-pointer group hover:bg-white/[0.03] transition-colors ${i > 0 ? "border-t border-white/[0.04]" : ""}`}
            >
              {/* Name */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center flex-shrink-0">
                  <FileText size={13} className="text-[var(--gold-primary)]" />
                </div>
                {renamingId === doc.id ? (
                  <input
                    ref={renameInputRef}
                    value={renameValue}
                    onChange={e => setRenameValue(e.target.value)}
                    onClick={e => e.stopPropagation()}
                    onBlur={commitRename}
                    onKeyDown={e => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setRenamingId(null); }}
                    className="text-sm text-white bg-white/[0.08] rounded-lg px-2 py-0.5 outline-none border border-[var(--gold-primary)]/40 flex-1 min-w-0"
                  />
                ) : (
                  <span className="text-sm text-white truncate group-hover:text-gray-100">{doc.title}</span>
                )}
              </div>

              {/* Modified */}
              <div className="flex items-center">
                <span className="text-xs text-gray-500">{formatDate(doc.updatedAt)}</span>
              </div>

              {/* Word count */}
              <div className="flex items-center justify-end">
                <span className="text-xs text-gray-500">{(doc.wordCount || 0).toLocaleString()}</span>
              </div>

              {/* Menu */}
              <div className="flex items-center justify-center">
                <div className="relative" ref={menuDocId === doc.id ? menuRef : undefined}>
                  <button
                    onClick={e => { e.stopPropagation(); setMenuDocId(menuDocId === doc.id ? null : doc.id); }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-600 hover:text-gray-300 hover:bg-white/[0.06] opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <MoreVertical size={13} />
                  </button>
                  {menuDocId === doc.id && (
                    <div className="absolute right-0 top-7 w-40 rounded-xl bg-[#1c1c1c] border border-white/[0.10] py-1 shadow-2xl shadow-black/80 z-20 animate-slideUp">
                      <button
                        onClick={e => startRename(doc, e)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                      >
                        <PenLine size={12} className="text-gray-500" />Rename
                      </button>
                      <div className="mx-2 my-0.5 border-t border-white/[0.06]" />
                      <button
                        onClick={e => { e.stopPropagation(); onDeleteDoc(doc.id); setMenuDocId(null); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-red-400 hover:bg-red-500/[0.07] transition-colors"
                      >
                        <Trash2 size={12} className="text-gray-500" />Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Add new row at bottom of list */}
          <div
            onClick={onNewDoc}
            className="grid grid-cols-[1fr_148px_96px_44px] px-5 py-3.5 border-t border-white/[0.04] cursor-pointer group hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3 text-gray-600 group-hover:text-[var(--gold-primary)] transition-colors">
              <div className="w-7 h-7 rounded-lg border border-dashed border-current flex items-center justify-center">
                <Plus size={12} />
              </div>
              <span className="text-sm">New Document</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
