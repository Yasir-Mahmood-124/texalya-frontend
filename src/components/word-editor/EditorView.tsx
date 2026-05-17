"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft, ChevronDown,
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Undo2, Redo2,
  Link2, Minus, Save, FileDown, Printer,
  Type, Highlighter, Eraser, Check, X,
} from "lucide-react";
import { WEDocument } from "./types";

/* ─────────── constants ─────────── */

const FONTS = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana", "Trebuchet MS"];

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

const FORMATS = [
  { label: "Paragraph",  value: "p",          cls: "text-sm" },
  { label: "Heading 1",  value: "h1",         cls: "text-2xl font-bold" },
  { label: "Heading 2",  value: "h2",         cls: "text-xl font-bold" },
  { label: "Heading 3",  value: "h3",         cls: "text-lg font-semibold" },
  { label: "Heading 4",  value: "h4",         cls: "text-base font-semibold" },
  { label: "Quote",      value: "blockquote", cls: "text-sm italic text-gray-400 pl-3 border-l-2 border-gray-500" },
  { label: "Code Block", value: "pre",        cls: "text-xs font-mono bg-gray-100 px-1" },
];

const TEXT_COLORS = [
  "#000000","#1a1a1a","#434343","#666666","#999999","#b7b7b7","#cccccc","#ffffff",
  "#ff0000","#ff4500","#ff9900","#ffff00","#00c000","#00bcd4","#1565c0","#3f51b5",
  "#9c27b0","#e91e63","#e57373","#f9a825","#aed581","#80cbc4","#90caf9","#ce93d8",
  "#795548","#607d8b",
];

const HIGHLIGHT_COLORS = [
  "#ffff00","#adff2f","#00ffff","#ff69b4","#ffa500","#da70d6",
  "#fffde7","#f3e5f5","#e3f2fd","#e8f5e9","#fff3e0","#fce4ec",
  "#fff9c4","#b2dfdb","#bbdefb","#dcedc8","#ffccbc","#d7ccc8",
];

/* ─────────── props ─────────── */

interface Props {
  doc: WEDocument;
  onSave: (doc: WEDocument) => void;
  onClose: () => void;
}

/* ─────────── component ─────────── */

export default function EditorView({ doc, onSave, onClose }: Props) {
  const editorRef   = useRef<HTMLDivElement>(null);
  const saveTimer   = useRef<ReturnType<typeof setTimeout>>();

  const [docTitle,      setDocTitle]      = useState(doc.title);
  const [wordCount,     setWordCount]     = useState(doc.wordCount || 0);
  const [charCount,     setCharCount]     = useState(0);
  const [saveStatus,    setSaveStatus]    = useState<"saved"|"saving"|"unsaved">("saved");
  const [editingTitle,  setEditingTitle]  = useState(false);

  /* dropdown open states */
  const [dd, setDd] = useState({
    format: false, font: false, size: false,
    textColor: false, highlight: false, export: false,
  });

  /* toolbar reflect states */
  const [fmt,         setFmt]         = useState("Paragraph");
  const [fontFamily,  setFontFamily]  = useState("Arial");
  const [fontSize,    setFontSize]    = useState(11);
  const [active,      setActive]      = useState<Record<string,boolean>>({});

  /* link dialog */
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl,  setLinkUrl]  = useState("");
  const [linkText, setLinkText] = useState("");

  /* ── init content ── */
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = doc.content || "<p>Start typing here…</p>";
      refreshCounts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc.id]);

  const refreshCounts = () => {
    const text = editorRef.current?.innerText ?? "";
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    setWordCount(words);
    setCharCount(text.length);
  };

  const reflectFormats = useCallback(() => {
    try {
      setActive({
        bold:               document.queryCommandState("bold"),
        italic:             document.queryCommandState("italic"),
        underline:          document.queryCommandState("underline"),
        strikeThrough:      document.queryCommandState("strikeThrough"),
        justifyLeft:        document.queryCommandState("justifyLeft"),
        justifyCenter:      document.queryCommandState("justifyCenter"),
        justifyRight:       document.queryCommandState("justifyRight"),
        justifyFull:        document.queryCommandState("justifyFull"),
        insertUnorderedList:document.queryCommandState("insertUnorderedList"),
        insertOrderedList:  document.queryCommandState("insertOrderedList"),
        subscript:          document.queryCommandState("subscript"),
        superscript:        document.queryCommandState("superscript"),
      });
    } catch { /* ignore */ }
  }, []);

  /* ── auto-save ── */
  const scheduleSave = useCallback(() => {
    setSaveStatus("unsaved");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaveStatus("saving");
      const content  = editorRef.current?.innerHTML ?? "";
      const text     = editorRef.current?.innerText ?? "";
      const words    = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
      onSave({ ...doc, title: docTitle, content, wordCount: words, updatedAt: new Date() });
      setTimeout(() => setSaveStatus("saved"), 300);
    }, 1500);
  }, [doc, docTitle, onSave]);

  /* ── close all dropdowns on outside click ── */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-dd]")) {
        setDd({ format: false, font: false, size: false, textColor: false, highlight: false, export: false });
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* ── helpers ── */

  const closeDd = () =>
    setDd({ format: false, font: false, size: false, textColor: false, highlight: false, export: false });

  const toggleDd = (key: keyof typeof dd) =>
    setDd(prev => ({ format: false, font: false, size: false, textColor: false, highlight: false, export: false, [key]: !prev[key] }));

  const exec = (cmd: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    reflectFormats();
    scheduleSave();
  };

  const applyFormat = (value: string) => {
    exec("formatBlock", value);
    setFmt(FORMATS.find(f => f.value === value)?.label ?? "Paragraph");
    closeDd();
  };

  const applyFont = (family: string) => {
    editorRef.current?.focus();
    document.execCommand("fontName", false, family);
    setFontFamily(family);
    closeDd();
    scheduleSave();
  };

  const applySize = (size: number) => {
    editorRef.current?.focus();
    document.execCommand("fontSize", false, "7");
    editorRef.current?.querySelectorAll('font[size="7"]').forEach(tag => {
      const span = document.createElement("span");
      span.style.fontSize = `${size}pt`;
      span.innerHTML = (tag as HTMLElement).innerHTML;
      tag.replaceWith(span);
    });
    setFontSize(size);
    closeDd();
    scheduleSave();
  };

  const applyColor = (color: string) => {
    editorRef.current?.focus();
    document.execCommand("foreColor", false, color);
    closeDd();
    scheduleSave();
  };

  const applyHighlight = (color: string) => {
    editorRef.current?.focus();
    document.execCommand("hiliteColor", false, color);
    closeDd();
    scheduleSave();
  };

  const insertLink = () => {
    if (!linkUrl) return;
    editorRef.current?.focus();
    const html = `<a href="${linkUrl}" target="_blank" style="color:#4a86e8;text-decoration:underline;">${linkText || linkUrl}</a>`;
    document.execCommand("insertHTML", false, html);
    setLinkOpen(false);
    setLinkUrl("");
    setLinkText("");
    scheduleSave();
  };

  const manualSave = () => {
    clearTimeout(saveTimer.current);
    setSaveStatus("saving");
    const content = editorRef.current?.innerHTML ?? "";
    const text    = editorRef.current?.innerText ?? "";
    const words   = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    onSave({ ...doc, title: docTitle, content, wordCount: words, updatedAt: new Date() });
    setTimeout(() => setSaveStatus("saved"), 400);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!DOCTYPE html><html><head><title>${docTitle}</title>
      <style>body{font-family:Arial,sans-serif;font-size:11pt;margin:1in;color:#1a1a1a}
      h1{font-size:2em;margin:.67em 0}h2{font-size:1.5em;margin:.75em 0}
      h3{font-size:1.17em;margin:.83em 0}ul,ol{padding-left:2em}
      blockquote{border-left:3px solid #ccc;padding-left:1em;color:#555;font-style:italic}
      pre{background:#f4f4f4;padding:1em;border-radius:4px;font-family:monospace;font-size:.9em}
      a{color:#4a86e8}</style></head><body>${editorRef.current?.innerHTML ?? ""}</body></html>`);
    w.document.close();
    w.print();
    setDd(prev => ({ ...prev, export: false }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertText", false, "    ");
    }
  };

  /* ─── sub-components ─── */

  const Sep = () => <div className="w-px h-5 bg-white/[0.09] flex-shrink-0 mx-0.5" />;

  const Btn = ({
    cmd, active: isActive, title, children, onClick,
  }: {
    cmd?: string; active?: boolean; title: string;
    children: React.ReactNode; onClick?: () => void;
  }) => (
    <button
      onMouseDown={e => { e.preventDefault(); onClick ? onClick() : cmd && exec(cmd); }}
      title={title}
      className={`h-7 min-w-[28px] px-1.5 flex items-center justify-center rounded-md text-xs flex-shrink-0 transition-all border
        ${isActive
          ? "bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] border-[var(--gold-primary)]/30"
          : "text-gray-400 hover:text-white hover:bg-white/[0.07] border-transparent"}`}
    >
      {children}
    </button>
  );

  const DdBtn = ({
    label, open, onToggle, children, width = "w-28",
  }: {
    label: string; open: boolean; onToggle: () => void;
    children: React.ReactNode; width?: string;
  }) => (
    <div className="relative flex-shrink-0" data-dd>
      <button
        onMouseDown={e => { e.preventDefault(); onToggle(); }}
        className="h-7 flex items-center gap-1.5 px-2 rounded-md text-xs text-gray-300 hover:text-white hover:bg-white/[0.07] border border-transparent transition-all"
      >
        <span className={`${width} text-left truncate`}>{label}</span>
        <ChevronDown size={10} className="text-gray-500 flex-shrink-0" />
      </button>
      {open && children}
    </div>
  );

  /* ─── render ─── */

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: "#0d0d0d" }}>

      {/* ══════════ TOP BAR ══════════ */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 bg-[#111111] border-b border-white/[0.06]">

        {/* Back */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors pr-3 border-r border-white/[0.08] flex-shrink-0"
        >
          <ChevronLeft size={15} />
          <span className="hidden sm:inline text-xs">Docs</span>
        </button>

        {/* Title */}
        <div className="flex-1 min-w-0">
          {editingTitle ? (
            <input
              autoFocus
              value={docTitle}
              onChange={e => setDocTitle(e.target.value)}
              onBlur={() => { setEditingTitle(false); scheduleSave(); }}
              onKeyDown={e => { if (e.key === "Enter" || e.key === "Escape") { setEditingTitle(false); scheduleSave(); } }}
              className="text-sm font-medium text-white bg-white/[0.06] rounded-lg px-3 py-1 outline-none border border-[var(--gold-primary)]/40 w-full max-w-md"
            />
          ) : (
            <button
              onClick={() => setEditingTitle(true)}
              title="Click to rename"
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors truncate max-w-md block text-left group"
            >
              {docTitle}
              <span className="ml-2 opacity-0 group-hover:opacity-40 text-[10px] text-gray-400 font-normal">✏</span>
            </button>
          )}
        </div>

        {/* Save status badge */}
        <div className={`hidden sm:flex items-center gap-1.5 text-[11px] flex-shrink-0 transition-colors ${
          saveStatus === "saved"   ? "text-emerald-500"
          : saveStatus === "saving" ? "text-amber-400"
          : "text-gray-500"
        }`}>
          {saveStatus === "saved" && <Check size={11} />}
          {saveStatus === "saved" ? "Saved" : saveStatus === "saving" ? "Saving…" : "Unsaved changes"}
        </div>

        {/* Export dropdown */}
        <div className="relative flex-shrink-0" data-dd>
          <button
            onClick={() => toggleDd("export")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
          >
            <FileDown size={13} />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown size={10} />
          </button>
          {dd.export && (
            <div className="absolute right-0 top-9 w-48 rounded-xl bg-[#1c1c1c] border border-white/[0.10] py-1 shadow-2xl z-50">
              <button
                onClick={handlePrint}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <Printer size={12} className="text-gray-500" />
                Print / Save as PDF
              </button>
              <button
                disabled
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-500 cursor-not-allowed opacity-50"
              >
                <FileDown size={12} className="text-gray-500" />
                Export .docx
                <span className="ml-auto text-[10px] text-gray-600 bg-white/[0.04] px-1.5 py-0.5 rounded">Soon</span>
              </button>
            </div>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={manualSave}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[var(--gold-primary)] text-[#0d0d0d] hover:brightness-110 transition-all flex-shrink-0"
        >
          <Save size={13} />
          <span className="hidden sm:inline">Save</span>
        </button>
      </div>

      {/* ══════════ RIBBON TOOLBAR ══════════ */}
      <div className="flex-shrink-0 flex items-center gap-0.5 px-3 py-1.5 bg-[#111111] border-b border-white/[0.06] overflow-x-auto">

        {/* Undo / Redo */}
        <Btn cmd="undo"  title="Undo (Ctrl+Z)"><Undo2 size={13} /></Btn>
        <Btn cmd="redo"  title="Redo (Ctrl+Y)"><Redo2 size={13} /></Btn>
        <Sep />

        {/* Format block */}
        <DdBtn label={fmt} open={dd.format} onToggle={() => toggleDd("format")} width="w-20">
          <div className="absolute left-0 top-8 w-44 rounded-xl bg-[#1c1c1c] border border-white/[0.10] py-1 shadow-2xl z-50">
            {FORMATS.map(f => (
              <button
                key={f.value}
                onMouseDown={e => { e.preventDefault(); applyFormat(f.value); }}
                className={`w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors ${f.cls}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </DdBtn>

        {/* Font family */}
        <DdBtn label={fontFamily} open={dd.font} onToggle={() => toggleDd("font")} width="w-28">
          <div className="absolute left-0 top-8 w-52 rounded-xl bg-[#1c1c1c] border border-white/[0.10] py-1 shadow-2xl z-50">
            {FONTS.map(f => (
              <button
                key={f}
                onMouseDown={e => { e.preventDefault(); applyFont(f); }}
                style={{ fontFamily: f }}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {f}
              </button>
            ))}
          </div>
        </DdBtn>

        {/* Font size */}
        <DdBtn label={String(fontSize)} open={dd.size} onToggle={() => toggleDd("size")} width="w-6">
          <div className="absolute left-0 top-8 w-20 rounded-xl bg-[#1c1c1c] border border-white/[0.10] py-1 shadow-2xl z-50 max-h-56 overflow-y-auto">
            {FONT_SIZES.map(s => (
              <button
                key={s}
                onMouseDown={e => { e.preventDefault(); applySize(s); }}
                className={`w-full text-center px-3 py-1.5 text-xs transition-colors ${
                  fontSize === s
                    ? "text-[var(--gold-primary)] bg-[var(--gold-primary)]/10"
                    : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </DdBtn>

        <Sep />

        {/* Text format */}
        <Btn cmd="bold"         active={active.bold}         title="Bold (Ctrl+B)"><Bold          size={13} /></Btn>
        <Btn cmd="italic"       active={active.italic}       title="Italic (Ctrl+I)"><Italic        size={13} /></Btn>
        <Btn cmd="underline"    active={active.underline}    title="Underline (Ctrl+U)"><Underline    size={13} /></Btn>
        <Btn cmd="strikeThrough" active={active.strikeThrough} title="Strikethrough"><Strikethrough  size={13} /></Btn>

        <Sep />

        {/* Text color */}
        <div className="relative flex-shrink-0" data-dd>
          <Btn title="Text Color" onClick={() => toggleDd("textColor")}>
            <Type size={13} />
          </Btn>
          {dd.textColor && (
            <div className="absolute left-0 top-8 rounded-xl bg-[#1c1c1c] border border-white/[0.10] p-3 shadow-2xl z-50 w-[168px]">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Text Color</p>
              <div className="grid grid-cols-8 gap-1.5 mb-2">
                {TEXT_COLORS.map(c => (
                  <button
                    key={c}
                    onMouseDown={e => { e.preventDefault(); applyColor(c); }}
                    style={{ backgroundColor: c, border: c === "#ffffff" ? "1px solid rgba(255,255,255,0.2)" : "none" }}
                    className="w-4.5 h-4.5 rounded hover:scale-125 transition-transform"
                    title={c}
                  />
                ))}
              </div>
              <button
                onMouseDown={e => { e.preventDefault(); applyColor("inherit"); closeDd(); }}
                className="w-full text-center text-[10px] text-gray-400 hover:text-white transition-colors py-0.5 hover:bg-white/[0.05] rounded"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Highlight */}
        <div className="relative flex-shrink-0" data-dd>
          <Btn title="Highlight" onClick={() => toggleDd("highlight")}>
            <Highlighter size={13} />
          </Btn>
          {dd.highlight && (
            <div className="absolute left-0 top-8 rounded-xl bg-[#1c1c1c] border border-white/[0.10] p-3 shadow-2xl z-50 w-[140px]">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Highlight</p>
              <div className="grid grid-cols-6 gap-1.5 mb-2">
                {HIGHLIGHT_COLORS.map(c => (
                  <button
                    key={c}
                    onMouseDown={e => { e.preventDefault(); applyHighlight(c); }}
                    style={{ backgroundColor: c }}
                    className="w-5 h-5 rounded hover:scale-125 transition-transform border border-white/10"
                    title={c}
                  />
                ))}
              </div>
              <button
                onMouseDown={e => { e.preventDefault(); applyHighlight("transparent"); closeDd(); }}
                className="w-full text-center text-[10px] text-gray-400 hover:text-white transition-colors py-0.5 hover:bg-white/[0.05] rounded"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <Sep />

        {/* Alignment */}
        <Btn cmd="justifyLeft"   active={active.justifyLeft}   title="Align Left"><AlignLeft    size={13} /></Btn>
        <Btn cmd="justifyCenter" active={active.justifyCenter} title="Align Center"><AlignCenter  size={13} /></Btn>
        <Btn cmd="justifyRight"  active={active.justifyRight}  title="Align Right"><AlignRight   size={13} /></Btn>
        <Btn cmd="justifyFull"   active={active.justifyFull}   title="Justify"><AlignJustify size={13} /></Btn>

        <Sep />

        {/* Lists + indent */}
        <Btn cmd="insertUnorderedList" active={active.insertUnorderedList} title="Bullet List">
          <List size={13} />
        </Btn>
        <Btn cmd="insertOrderedList" active={active.insertOrderedList} title="Numbered List">
          <ListOrdered size={13} />
        </Btn>
        <Btn cmd="indent"  title="Indent"><span className="text-[10px] leading-none font-mono">→|</span></Btn>
        <Btn cmd="outdent" title="Outdent"><span className="text-[10px] leading-none font-mono">|←</span></Btn>

        <Sep />

        {/* Subscript / Superscript */}
        <Btn cmd="subscript"   active={active.subscript}   title="Subscript">
          <span className="text-[10px] font-semibold leading-none">x₂</span>
        </Btn>
        <Btn cmd="superscript" active={active.superscript} title="Superscript">
          <span className="text-[10px] font-semibold leading-none">x²</span>
        </Btn>

        <Sep />

        {/* Link */}
        <Btn title="Insert Link" onClick={() => { editorRef.current?.focus(); setLinkOpen(true); }}>
          <Link2 size={13} />
        </Btn>
        {/* Horizontal rule */}
        <Btn cmd="insertHorizontalRule" title="Horizontal Rule"><Minus size={13} /></Btn>

        <Sep />

        {/* Clear format */}
        <Btn cmd="removeFormat" title="Clear Formatting"><Eraser size={13} /></Btn>
      </div>

      {/* ══════════ DOCUMENT AREA ══════════ */}
      <div className="flex-1 overflow-y-auto" style={{ background: "#1c1c1c" }}>
        <div className="py-10 px-4 sm:px-10 min-h-full">
          <div
            className="mx-auto bg-white shadow-2xl shadow-black/70 we-canvas"
            style={{ maxWidth: 816, minHeight: 1056, padding: "96px 96px 80px" }}
          >
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={() => { refreshCounts(); scheduleSave(); }}
              onKeyUp={reflectFormats}
              onMouseUp={reflectFormats}
              onKeyDown={handleKeyDown}
              className="outline-none min-h-[860px] text-[#1a1a1a] we-content"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "11pt", lineHeight: 1.6 }}
              data-placeholder="Start typing your document here…"
            />
          </div>
        </div>
      </div>

      {/* ══════════ STATUS BAR ══════════ */}
      <div className="flex-shrink-0 flex items-center gap-4 px-4 py-1.5 bg-[#0a0a0a] border-t border-white/[0.05]">
        <span className="text-[11px] text-gray-600">
          {wordCount.toLocaleString()} {wordCount === 1 ? "word" : "words"}
        </span>
        <span className="text-gray-800 text-[11px]">·</span>
        <span className="text-[11px] text-gray-600">
          {charCount.toLocaleString()} characters
        </span>
        <div className="flex-1" />
        <span className="text-[11px] text-gray-600">100%</span>
      </div>

      {/* ══════════ LINK DIALOG ══════════ */}
      {linkOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111111] border border-white/[0.10] rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-white">Insert Link</h3>
              <button onClick={() => setLinkOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">URL *</label>
                <input
                  autoFocus
                  type="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={e => setLinkUrl(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && insertLink()}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-[#1a1a1a] border border-white/[0.08] text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--gold-primary)]/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Display text (optional)</label>
                <input
                  type="text"
                  placeholder="Link text…"
                  value={linkText}
                  onChange={e => setLinkText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && insertLink()}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-[#1a1a1a] border border-white/[0.08] text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--gold-primary)]/40 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => setLinkOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-xs text-gray-400 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                disabled={!linkUrl}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-[#0d0d0d] bg-[var(--gold-primary)] hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
