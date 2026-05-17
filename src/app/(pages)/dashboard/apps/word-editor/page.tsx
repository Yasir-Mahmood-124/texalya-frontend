"use client";

import { useState, useCallback } from "react";
import HomeView from "@/components/word-editor/HomeView";
import EditorView from "@/components/word-editor/EditorView";
import { WEDocument } from "@/components/word-editor/types";

const INITIAL_DOCS: WEDocument[] = [
  {
    id: "1",
    title: "Project Proposal Q3 2025",
    content: `<h1>Project Proposal Q3 2025</h1>
<h2>Overview</h2>
<p>This document outlines the key deliverables and milestones for Q3 2025, including strategic objectives, resource allocation, and expected outcomes.</p>
<h2>Objectives</h2>
<ul>
  <li>Increase user engagement by <strong>25%</strong></li>
  <li>Launch three new product features</li>
  <li>Expand into two new markets</li>
</ul>
<h2>Timeline</h2>
<p>All deliverables are expected to be completed by <strong>September 30, 2025</strong>. Weekly check-ins will be held every Monday at 10:00 AM.</p>`,
    createdAt: new Date("2025-06-10"),
    updatedAt: new Date("2025-06-15"),
    wordCount: 842,
  },
  {
    id: "2",
    title: "Meeting Notes — Strategy Review",
    content: `<h2>Meeting Notes</h2>
<p><strong>Date:</strong> June 8, 2025 &nbsp;&nbsp; <strong>Attendees:</strong> All department leads</p>
<hr/>
<h3>Key Discussion Points</h3>
<p>The team reviewed current KPIs and identified several areas for improvement in the upcoming quarter. Budget reallocation was approved for the product team.</p>
<h3>Action Items</h3>
<ol>
  <li>Marketing to submit Q3 campaign brief by <em>June 20</em></li>
  <li>Engineering to finalize API migration plan</li>
  <li>Sales to update CRM pipeline by end of week</li>
</ol>`,
    createdAt: new Date("2025-06-08"),
    updatedAt: new Date("2025-06-08"),
    wordCount: 327,
  },
  {
    id: "3",
    title: "Marketing Campaign Brief",
    content: `<h1>Marketing Campaign Brief</h1>
<p>This brief outlines the strategy, goals, and execution plan for the upcoming product launch campaign scheduled for Q3 2025.</p>
<h2>Target Audience</h2>
<p>Mid-size SaaS companies (50–500 employees) with active marketing and sales teams looking to scale lead generation.</p>
<h2>Key Channels</h2>
<ul>
  <li>LinkedIn sponsored content</li>
  <li>Google Search &amp; Display</li>
  <li>Email nurture sequences</li>
  <li>Partner co-marketing</li>
</ul>`,
    createdAt: new Date("2025-05-30"),
    updatedAt: new Date("2025-06-01"),
    wordCount: 1205,
  },
];

export default function WordEditorPage() {
  const [docs,       setDocs]       = useState<WEDocument[]>(INITIAL_DOCS);
  const [currentDoc, setCurrentDoc] = useState<WEDocument | null>(null);

  const handleNewDoc = useCallback(() => {
    const newDoc: WEDocument = {
      id:         Date.now().toString(),
      title:      "Untitled Document",
      content:    "<p>Start typing your document here…</p>",
      createdAt:  new Date(),
      updatedAt:  new Date(),
      wordCount:  0,
    };
    setDocs(prev => [newDoc, ...prev]);
    setCurrentDoc(newDoc);
  }, []);

  const handleOpenDoc = useCallback((doc: WEDocument) => {
    setCurrentDoc(doc);
  }, []);

  const handleSaveDoc = useCallback((updated: WEDocument) => {
    setDocs(prev => prev.map(d => d.id === updated.id ? updated : d));
    setCurrentDoc(updated);
  }, []);

  const handleDeleteDoc = useCallback((id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  }, []);

  const handleRenameDoc = useCallback((id: string, newTitle: string) => {
    setDocs(prev =>
      prev.map(d => d.id === id ? { ...d, title: newTitle, updatedAt: new Date() } : d)
    );
  }, []);

  const handleClose = useCallback(() => {
    setCurrentDoc(null);
  }, []);

  if (currentDoc) {
    return (
      <EditorView
        doc={currentDoc}
        onSave={handleSaveDoc}
        onClose={handleClose}
      />
    );
  }

  return (
    <HomeView
      documents={docs}
      onNewDoc={handleNewDoc}
      onOpenDoc={handleOpenDoc}
      onDeleteDoc={handleDeleteDoc}
      onRenameDoc={handleRenameDoc}
    />
  );
}
