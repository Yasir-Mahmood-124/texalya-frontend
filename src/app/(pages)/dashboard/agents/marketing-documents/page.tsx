"use client";

import { useState, useCallback } from "react";
import HomeView from "@/components/marketing-documents/HomeView";
import ChatEditorView from "@/components/marketing-documents/ChatEditorView";
import DocumentViewer from "@/components/marketing-documents/DocumentViewer";
import { StrategyDoc } from "@/components/marketing-documents/types";

type View = "home" | "chat" | "viewer";

const INITIAL_DOCS: StrategyDoc[] = [
  {
    id: "1",
    title: "Q3 2025 Go-To-Market Strategy",
    type: "Go-To-Market Plan",
    content: `<h1>Q3 2025 Go-To-Market Strategy</h1>

<h2>Executive Summary</h2>
<p>This comprehensive go-to-market strategy provides a detailed roadmap for capturing significant market share in Q3 2025. Drawing from rigorous market analysis, competitive intelligence, and customer discovery, this document equips our team with actionable strategies for sustainable growth.</p>

<h2>Market Opportunity</h2>
<p>The total addressable market (TAM) stands at <strong>$4.2 billion</strong> globally, with a serviceable addressable market (SAM) of <strong>$820 million</strong> in primary geographies. Current market penetration sits at approximately 12%, leaving substantial whitespace for expansion.</p>

<h3>Target Segments</h3>
<ul>
  <li><strong>Primary:</strong> Mid-market SaaS companies (50–500 employees) seeking operational efficiency</li>
  <li><strong>Secondary:</strong> Enterprise organizations undergoing digital transformation initiatives</li>
  <li><strong>Tertiary:</strong> High-growth startups with Series B+ funding and aggressive scaling goals</li>
</ul>

<h2>Value Proposition</h2>
<ol>
  <li><strong>Speed to Value:</strong> Customers achieve measurable ROI within 30 days of deployment</li>
  <li><strong>Frictionless Integration:</strong> Zero-disruption implementation with existing technology infrastructure</li>
  <li><strong>AI-Powered Intelligence:</strong> Continuous performance optimization through advanced machine learning</li>
</ol>

<h2>Distribution Channels</h2>
<h3>Direct Sales</h3>
<p>A dedicated enterprise sales team targeting high-value accounts. Each Account Executive carries a quota of <strong>$1.2M ARR</strong> with a structured 6-month ramp.</p>

<h3>Product-Led Growth</h3>
<p>Freemium tier drives organic adoption. Target conversion rate of <strong>8%</strong> from free to paid within 90 days.</p>

<h2>Pricing Architecture</h2>
<ul>
  <li><strong>Starter — $299/month:</strong> Up to 10 users · Core features · Email support</li>
  <li><strong>Growth — $799/month:</strong> Up to 50 users · Advanced analytics · Priority support</li>
  <li><strong>Enterprise — Custom:</strong> Unlimited users · Dedicated CSM · SLA guarantees</li>
</ul>

<h2>Key Performance Indicators</h2>
<ul>
  <li>ARR Target: <strong>$3.2M</strong> by end of Year 1</li>
  <li>Customer Acquisition Cost: <strong>&lt; $8,500</strong></li>
  <li>Net Revenue Retention: <strong>≥ 115%</strong></li>
  <li>Time-to-Value: <strong>≤ 30 days</strong></li>
</ul>`,
    chatHistory: [
      { id: "c1", role: "user", content: "Create a go-to-market strategy for our B2B SaaS platform targeting mid-market companies.", timestamp: new Date("2025-05-10T09:15:00") },
      { id: "c2", role: "assistant", content: "I've created a comprehensive go-to-market strategy covering your market opportunity, value proposition, distribution channels, pricing, and KPIs. Let me know if you'd like to adjust any section.", timestamp: new Date("2025-05-10T09:15:04"), docRef: "1" },
    ],
    createdAt: new Date("2025-05-10"),
    updatedAt: new Date("2025-05-15"),
    wordCount: 1247,
  },
  {
    id: "2",
    title: "Product Roadmap H2 2025",
    type: "Product Roadmap",
    content: `<h1>Product Roadmap — H2 2025</h1>

<h2>Vision & Strategic Direction</h2>
<p>Our product vision for H2 2025 centers on becoming the definitive platform for enterprise workflow automation, with a focus on AI-first capabilities and deep integrations that deliver measurable business outcomes.</p>

<h2>Q3 2025 Priorities</h2>
<h3>Core Platform</h3>
<ul>
  <li><strong>AI Workflow Engine v2.0</strong> — Natural language automation configuration · <em>ETA: July 2025</em></li>
  <li><strong>Real-time Collaboration</strong> — Live editing across all modules · <em>ETA: August 2025</em></li>
  <li><strong>Advanced Analytics</strong> — Custom KPI tracking and predictive insights · <em>ETA: August 2025</em></li>
</ul>

<h2>Q4 2025 Priorities</h2>
<h3>Enterprise Features</h3>
<ul>
  <li><strong>SSO / SAML 2.0</strong> — Enterprise identity provider support · <em>ETA: October 2025</em></li>
  <li><strong>Audit Log & Compliance</strong> — SOC 2 Type II readiness · <em>ETA: November 2025</em></li>
  <li><strong>iOS App v2.0</strong> — Complete feature parity with web · <em>ETA: December 2025</em></li>
</ul>

<h2>Success Criteria</h2>
<ul>
  <li>Feature adoption: <strong>≥ 60%</strong> of active users within 30 days</li>
  <li>NPS uplift: <strong>+8 points</strong> from current baseline</li>
  <li>Enterprise upgrades: <strong>35 new accounts</strong> driven by Q4 features</li>
</ul>`,
    chatHistory: [
      { id: "c3", role: "user", content: "Generate a product roadmap for H2 2025 with Q3 and Q4 themes.", timestamp: new Date("2025-05-08T14:30:00") },
      { id: "c4", role: "assistant", content: "Here's your H2 2025 product roadmap. I've organized it by quarter with core platform, enterprise features, and success metrics. Feel free to ask me to add specific features or adjust timelines.", timestamp: new Date("2025-05-08T14:30:03"), docRef: "2" },
    ],
    createdAt: new Date("2025-05-08"),
    updatedAt: new Date("2025-05-12"),
    wordCount: 923,
  },
  {
    id: "3",
    title: "Competitive Analysis — B2B SaaS 2025",
    type: "Competitive Analysis",
    content: `<h1>Competitive Analysis — B2B SaaS Market 2025</h1>

<h2>Executive Summary</h2>
<p>This analysis benchmarks our platform against the four primary competitors in the B2B workflow automation space. We hold a defensible position in mid-market AI capabilities but face increasing pressure from well-funded incumbents expanding downmarket.</p>

<h2>Competitor Profiles</h2>

<h3>Competitor A — Enterprise Incumbent</h3>
<p><strong>Market Position:</strong> Category leader · 32% market share · Public company</p>
<ul>
  <li><strong>Strengths:</strong> Deep enterprise integrations, strong brand recognition, extensive partner network</li>
  <li><strong>Weaknesses:</strong> Legacy architecture, slow 18-month release cadence, high implementation costs</li>
  <li><strong>Our Advantage:</strong> 3× faster deployment, AI-native, 40% lower TCO</li>
</ul>

<h3>Competitor B — AI-First Challenger</h3>
<p><strong>Market Position:</strong> Fastest-growing entrant · Series B, $65M raised</p>
<ul>
  <li><strong>Strengths:</strong> Modern AI capabilities, developer-first community</li>
  <li><strong>Weaknesses:</strong> Limited integrations (85 vs our 320+), immature enterprise features</li>
  <li><strong>Our Advantage:</strong> Enterprise compliance, proven scalability, broader integration library</li>
</ul>

<h2>Win/Loss Analysis</h2>
<ul>
  <li>vs. Competitor A: <strong>34% win rate</strong> (up from 22% in Q1)</li>
  <li>vs. Competitor B: <strong>58% win rate</strong> (declining from 67% — requires attention)</li>
</ul>

<h2>Strategic Recommendations</h2>
<ol>
  <li>Accelerate AI roadmap to close the perception gap</li>
  <li>Develop Competitor A displacement playbook with ROI calculator</li>
  <li>Strengthen analyst relations (Gartner, Forrester) before next evaluation cycle</li>
</ol>`,
    chatHistory: [
      { id: "c5", role: "user", content: "Create a competitive analysis for our B2B SaaS platform against the top competitors.", timestamp: new Date("2025-04-28T11:00:00") },
      { id: "c6", role: "assistant", content: "I've completed the competitive analysis covering your top competitors with detailed profiles, win/loss data, and strategic recommendations. I can expand any section or add more competitors.", timestamp: new Date("2025-04-28T11:00:05"), docRef: "3" },
    ],
    createdAt: new Date("2025-04-28"),
    updatedAt: new Date("2025-05-02"),
    wordCount: 2103,
  },
];

export default function MarketingDocumentsPage() {
  const [view, setView]                 = useState<View>("home");
  const [docs, setDocs]                 = useState<StrategyDoc[]>(INITIAL_DOCS);

  // Two separate slots: chat context and current viewer doc
  const [chatDoc, setChatDoc]           = useState<StrategyDoc | null>(null);
  const [viewerDoc, setViewerDoc]       = useState<StrategyDoc | null>(null);
  const [viewerFrom, setViewerFrom]     = useState<View>("home"); // where back goes from viewer

  /* ── Handlers ── */

  const handleNewDoc = useCallback(() => {
    setChatDoc(null);
    setView("chat");
  }, []);

  const handleOpenDoc = useCallback((doc: StrategyDoc) => {
    setViewerDoc(doc);
    setViewerFrom("home");
    setView("viewer");
  }, []);

  const handleEditWithAI = useCallback((doc: StrategyDoc) => {
    setChatDoc(doc);
    setView("chat");
  }, []);

  // Called from within ChatEditorView when user clicks "Open" on a generated doc card
  const handleOpenFromChat = useCallback((doc: StrategyDoc) => {
    setViewerDoc(doc);
    setViewerFrom("chat");
    setView("viewer");
  }, []);

  const handleSaveDoc = useCallback((updated: StrategyDoc) => {
    setDocs(prev => {
      const exists = prev.some(d => d.id === updated.id);
      return exists
        ? prev.map(d => d.id === updated.id ? updated : d)
        : [updated, ...prev];
    });
    setChatDoc(updated); // keep chat context in sync with latest saved version
  }, []);

  const handleDeleteDoc = useCallback((id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  }, []);

  const handleRenameDoc = useCallback((id: string, newTitle: string) => {
    setDocs(prev =>
      prev.map(d => d.id === id ? { ...d, title: newTitle, updatedAt: new Date() } : d)
    );
  }, []);

  const handleBackFromViewer = useCallback(() => {
    setView(viewerFrom); // returns to chat or home depending on origin
  }, [viewerFrom]);

  const handleBackFromChat = useCallback(() => {
    setChatDoc(null);
    setView("home");
  }, []);

  /* ── Render ── */

  if (view === "chat") {
    return (
      <ChatEditorView
        doc={chatDoc}
        onSave={handleSaveDoc}
        onBack={handleBackFromChat}
        onOpenDocument={handleOpenFromChat}
      />
    );
  }

  if (view === "viewer" && viewerDoc) {
    return (
      <DocumentViewer
        doc={viewerDoc}
        onBack={handleBackFromViewer}
        onEditWithAI={handleEditWithAI}
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
