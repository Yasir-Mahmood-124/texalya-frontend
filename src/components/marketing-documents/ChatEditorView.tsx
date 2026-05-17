"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft, Bot, SendHorizontal, FileText,
  TrendingUp, Map, Target, BarChart2, Megaphone, Briefcase,
  CheckCircle2, Loader2, Sparkles, Copy, Check, ArrowRight,
} from "lucide-react";
import { StrategyDoc, ChatMessage, DocType, TYPE_STYLES } from "./types";

/* ─────────────────────────────────────────────
   Mock document templates (replaced by API later)
───────────────────────────────────────────── */

const MOCK_GTM = `<h1>Go-To-Market Strategy</h1>

<h2>Executive Summary</h2>
<p>This comprehensive go-to-market strategy provides a detailed roadmap for capturing significant market share and achieving sustainable revenue growth. Drawing from rigorous market analysis, competitive intelligence, and customer discovery, this document equips your team with actionable strategies for launch and beyond.</p>

<h2>Market Opportunity</h2>
<p>The total addressable market (TAM) stands at <strong>$4.2 billion</strong> globally, with a serviceable addressable market (SAM) of <strong>$820 million</strong> in primary geographies. Current market penetration sits at approximately 12%, leaving substantial whitespace for expansion.</p>

<h3>Target Segments</h3>
<ul>
  <li><strong>Primary:</strong> Mid-market SaaS companies (50–500 employees) seeking operational efficiency</li>
  <li><strong>Secondary:</strong> Enterprise organizations undergoing digital transformation initiatives</li>
  <li><strong>Tertiary:</strong> High-growth startups with Series B+ funding and aggressive scaling goals</li>
</ul>

<h2>Value Proposition</h2>
<p>Our competitive differentiation rests on three core pillars:</p>
<ol>
  <li><strong>Speed to Value:</strong> Customers achieve measurable ROI within 30 days of deployment</li>
  <li><strong>Frictionless Integration:</strong> Zero-disruption implementation with existing technology infrastructure</li>
  <li><strong>AI-Powered Intelligence:</strong> Continuous performance optimization through advanced machine learning</li>
</ol>

<h2>Distribution Channels</h2>
<h3>Direct Sales</h3>
<p>A dedicated enterprise sales team will pursue high-value accounts with a structured 6-month ramp. Each Account Executive carries a quota of <strong>$1.2M ARR</strong>.</p>

<h3>Product-Led Growth</h3>
<p>A freemium tier drives organic, bottom-up adoption. Target conversion rate of <strong>8%</strong> from free to paid within 90 days.</p>

<h3>Partner Ecosystem</h3>
<p>Strategic partnerships with Tier-1 System Integrators. A 20% revenue-sharing model applies to all partner-sourced opportunities.</p>

<h2>Pricing Strategy</h2>
<ul>
  <li><strong>Starter — $299/month:</strong> Up to 10 users · Core feature set · Email support</li>
  <li><strong>Growth — $799/month:</strong> Up to 50 users · Advanced analytics · Priority support</li>
  <li><strong>Enterprise — Custom:</strong> Unlimited users · Dedicated CSM · SLA guarantees</li>
</ul>

<h2>Launch Roadmap</h2>
<p><strong>Month 1:</strong> Closed beta with 25 design-partner customers; onboarding refinement</p>
<p><strong>Month 2:</strong> General availability launch; partner channel activation; content marketing push</p>
<p><strong>Month 3:</strong> International expansion; enterprise tier rollout; Series B fundraise initiation</p>

<h2>Success Metrics</h2>
<ul>
  <li>ARR Target: <strong>$3.2M</strong> by end of Year 1</li>
  <li>Customer Acquisition Cost: <strong>&lt; $8,500</strong></li>
  <li>LTV : CAC Ratio: <strong>≥ 4 : 1</strong></li>
  <li>Net Revenue Retention: <strong>≥ 115%</strong></li>
  <li>Average Time-to-Value: <strong>≤ 30 days</strong></li>
</ul>

<h2>Risk Assessment & Mitigation</h2>
<p>Primary risks include intensified competitive pressure from incumbents and potential feature commoditization. Mitigation focuses on differentiated AI capabilities, rapid iteration cycles, and an expanding ecosystem of integrations that deepen customer value over time.</p>`;

const MOCK_ROADMAP = `<h1>Product Roadmap — H2 2025</h1>

<h2>Vision & Strategic Direction</h2>
<p>Our product vision for H2 2025 centers on becoming the definitive platform for enterprise workflow automation, with AI-first capabilities and deep integrations that deliver measurable business outcomes.</p>

<h2>Q3 2025 Priorities</h2>
<h3>Core Platform</h3>
<ul>
  <li><strong>AI Workflow Engine v2.0</strong> — Natural language automation configuration · <em>ETA: July 2025</em></li>
  <li><strong>Real-time Collaboration</strong> — Live editing across all modules · <em>ETA: August 2025</em></li>
  <li><strong>Advanced Analytics Dashboard</strong> — Custom KPI tracking and predictive insights · <em>ETA: August 2025</em></li>
</ul>

<h3>Integration Ecosystem</h3>
<ul>
  <li><strong>Salesforce Bi-directional Sync</strong> — Native CRM data flow · <em>ETA: August 2025</em></li>
  <li><strong>Slack + Teams Unified Inbox</strong> — Consolidated messaging hub · <em>ETA: September 2025</em></li>
</ul>

<h2>Q4 2025 Priorities</h2>
<h3>Enterprise Features</h3>
<ul>
  <li><strong>SSO / SAML 2.0</strong> — Enterprise identity provider support · <em>ETA: October 2025</em></li>
  <li><strong>Role-Based Access Control v2</strong> — Granular permission management · <em>ETA: October 2025</em></li>
  <li><strong>Audit Log & Compliance Reporting</strong> — SOC 2 Type II readiness · <em>ETA: November 2025</em></li>
  <li><strong>Multi-region Data Residency</strong> — EU and APAC sovereignty · <em>ETA: December 2025</em></li>
</ul>

<h3>Mobile</h3>
<ul>
  <li><strong>iOS App v2.0</strong> — Full feature parity with web · <em>ETA: November 2025</em></li>
  <li><strong>Android App Launch</strong> · <em>ETA: December 2025</em></li>
</ul>

<h2>Success Criteria</h2>
<ul>
  <li>Feature adoption: <strong>≥ 60%</strong> of active users within 30 days of launch</li>
  <li>NPS uplift: <strong>+8 points</strong> from current baseline</li>
  <li>Enterprise upgrades: <strong>35 new accounts</strong> driven by Q4 features</li>
</ul>`;

const MOCK_OKR = `<h1>OKR Framework — Q3 2025</h1>

<h2>Company-Level Objectives</h2>

<h3>Objective 1: Accelerate Revenue Growth</h3>
<p><em>Drive the business to a position of clear market leadership and financial sustainability.</em></p>
<ul>
  <li><strong>KR 1.1:</strong> Grow MRR from $420K to <strong>$680K</strong> (+62%)</li>
  <li><strong>KR 1.2:</strong> Achieve Net Revenue Retention of <strong>≥ 115%</strong></li>
  <li><strong>KR 1.3:</strong> Close <strong>18 new enterprise deals</strong> at an average ACV of $85K</li>
  <li><strong>KR 1.4:</strong> Reduce CAC from $11,200 to <strong>&lt; $8,500</strong></li>
</ul>

<h3>Objective 2: Deliver Exceptional Product Experience</h3>
<p><em>Build a product customers love and cannot imagine working without.</em></p>
<ul>
  <li><strong>KR 2.1:</strong> Achieve NPS of <strong>≥ 52</strong> (up from 41)</li>
  <li><strong>KR 2.2:</strong> Reduce time-to-first-value from 14 days to <strong>≤ 7 days</strong></li>
  <li><strong>KR 2.3:</strong> Ship <strong>4 major product milestones</strong> with ≥ 60% adoption in 30 days</li>
  <li><strong>KR 2.4:</strong> Maintain platform uptime of <strong>≥ 99.95%</strong></li>
</ul>

<h3>Objective 3: Scale the Team & Culture</h3>
<p><em>Build a high-performance organization that can sustain hypergrowth.</em></p>
<ul>
  <li><strong>KR 3.1:</strong> Hire <strong>12 net new employees</strong> across Engineering, Sales, and Customer Success</li>
  <li><strong>KR 3.2:</strong> Achieve an Employee Engagement Score of <strong>≥ 78%</strong></li>
  <li><strong>KR 3.3:</strong> Achieve <strong>90-day ramp completion</strong> for all new hires</li>
  <li><strong>KR 3.4:</strong> OKR adoption across <strong>100% of teams</strong> with weekly check-ins</li>
</ul>

<h2>Grading & Review Cadence</h2>
<p>OKRs are reviewed weekly at team level, monthly at executive level. Final grading at quarter-end uses a 0.0–1.0 scale, where <strong>0.7</strong> is a strong outcome for ambitious objectives.</p>`;

const MOCK_COMPETITIVE = `<h1>Competitive Analysis — B2B SaaS Market</h1>

<h2>Executive Summary</h2>
<p>This analysis benchmarks our platform against the four primary competitors in the B2B workflow automation space. We hold a defensible position in mid-market AI capabilities but face increasing pressure from well-funded incumbents and agile new entrants.</p>

<h2>Competitive Profiles</h2>

<h3>Competitor A — Enterprise Incumbent</h3>
<p><strong>Market Position:</strong> Category leader · 32% market share · Public company</p>
<ul>
  <li><strong>Strengths:</strong> Deep enterprise integrations, strong brand recognition, extensive partner network</li>
  <li><strong>Weaknesses:</strong> Legacy architecture, slow 18-month release cadence, high implementation costs</li>
  <li><strong>Our Advantage:</strong> 3× faster deployment, AI-native architecture, 40% lower TCO</li>
</ul>

<h3>Competitor B — Mid-Market Player</h3>
<p><strong>Market Position:</strong> #2 in mid-market · Series D, $180M raised</p>
<ul>
  <li><strong>Strengths:</strong> Strong UX, active community, extensive template library</li>
  <li><strong>Weaknesses:</strong> Limited AI capabilities, weak enterprise security</li>
  <li><strong>Our Advantage:</strong> Superior AI automation, enterprise compliance, better customer success</li>
</ul>

<h3>Competitor C — AI-First Challenger</h3>
<p><strong>Market Position:</strong> Fastest-growing entrant · Series B, $65M raised</p>
<ul>
  <li><strong>Strengths:</strong> Modern AI, strong developer community, rapid iteration</li>
  <li><strong>Weaknesses:</strong> Limited integrations (85 vs our 320+), immature enterprise features</li>
  <li><strong>Our Advantage:</strong> Broader integration library, enterprise compliance, proven scalability</li>
</ul>

<h2>Win/Loss Analysis</h2>
<ul>
  <li>vs. Competitor A: <strong>34% win rate</strong> (up from 22% in Q1)</li>
  <li>vs. Competitor B: <strong>61% win rate</strong> (stable)</li>
  <li>vs. Competitor C: <strong>58% win rate</strong> (declining from 67% — requires attention)</li>
</ul>

<h2>Strategic Recommendations</h2>
<ol>
  <li>Accelerate AI roadmap to close perception gap with Competitor C</li>
  <li>Develop Competitor A displacement playbook with ROI calculator</li>
  <li>Expand integration library — prioritize 12 most-requested integrations</li>
  <li>Invest in Gartner and Forrester analyst relations before next evaluation cycle</li>
</ol>`;

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

function countWords(html: string): number {
  return html.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function getMockResult(prompt: string): { title: string; type: DocType; content: string; reply: string } {
  const lower = prompt.toLowerCase();
  if (lower.includes("roadmap") || (lower.includes("product") && lower.includes("plan"))) {
    return { title: "Product Roadmap H2 2025", type: "Product Roadmap", content: MOCK_ROADMAP, reply: "I've drafted a comprehensive product roadmap for H2 2025, organized by quarter with core platform, enterprise features, and mobile experience. It includes clear ETAs and success criteria for each milestone. Feel free to ask me to expand any section, adjust timelines, or add specific features you have in mind." };
  }
  if (lower.includes("okr") || lower.includes("objective") || lower.includes("key result")) {
    return { title: "Q3 2025 OKR Framework", type: "OKR Framework", content: MOCK_OKR, reply: "Your OKR framework is ready with three company-level objectives covering revenue growth, product experience, and team scaling. Each objective has 4 measurable key results with specific targets. Let me know if you'd like to adjust any KR targets, add team-level OKRs, or change the grading structure." };
  }
  if (lower.includes("competitor") || lower.includes("competitive") || lower.includes("analysis")) {
    return { title: "Competitive Analysis — B2B SaaS", type: "Competitive Analysis", content: MOCK_COMPETITIVE, reply: "I've completed the competitive analysis covering your top three competitors with detailed profiles, win/loss data, and four strategic recommendations. I can add more competitors, drill deeper into any competitor's strategy, or reframe the positioning narrative to highlight different differentiators." };
  }
  if (lower.includes("marketing")) {
    return { title: "Marketing Strategy Document", type: "Marketing Strategy", content: MOCK_GTM, reply: "I've generated a marketing strategy document covering market opportunity, value proposition, distribution channels, pricing, and success metrics. I can refine the channel mix, adjust pricing tiers, or focus the narrative on a specific customer segment." };
  }
  return { title: "Go-To-Market Strategy", type: "Go-To-Market Plan", content: MOCK_GTM, reply: "I've created a comprehensive go-to-market strategy covering your market opportunity, value proposition, distribution channels, pricing architecture, and a 3-month launch roadmap with success metrics. Ask me to adjust target segments, refine pricing, add more detail to any section, or tailor it to a specific industry vertical." };
}

/* ─────────────────────────────────────────────
   Suggested prompts
───────────────────────────────────────────── */

const SUGGESTIONS = [
  { icon: TrendingUp, label: "Go-To-Market Plan",   prompt: "Create a comprehensive go-to-market strategy for a B2B SaaS product. Include market analysis, target segments, pricing strategy, distribution channels, and a 90-day launch plan." },
  { icon: Map,        label: "Product Roadmap",      prompt: "Generate a detailed product roadmap for H2 2025. Include quarterly themes, feature prioritization, success metrics, and dependency mapping." },
  { icon: Target,     label: "OKR Framework",        prompt: "Draft an OKR framework for Q3 2025 covering company-level objectives and key results across revenue growth, product experience, and team scaling." },
  { icon: BarChart2,  label: "Competitor Analysis",  prompt: "Create a competitive analysis for a B2B SaaS company, benchmarking the top 4 competitors with strengths, weaknesses, pricing, and strategic recommendations." },
  { icon: Megaphone,  label: "Marketing Strategy",   prompt: "Develop a comprehensive marketing strategy including brand positioning, content marketing, demand generation, and campaign planning for the next quarter." },
  { icon: Briefcase,  label: "Business Case",        prompt: "Write a business case document for a new product investment covering market opportunity, financial projections, risks, and recommended next steps." },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function DocumentCard({ doc, onOpen }: { doc: StrategyDoc; onOpen: () => void }) {
  const style = TYPE_STYLES[doc.type];
  return (
    <div
      onClick={onOpen}
      className="mt-3.5 rounded-xl bg-[#0a0a0a] border border-white/[0.08] hover:border-[var(--gold-primary)]/40 overflow-hidden cursor-pointer transition-all duration-200 group/card"
    >
      <div className={`h-0.5 w-full bg-gradient-to-r ${style.bar}`} />
      <div className="px-4 py-3.5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center flex-shrink-0 group-hover/card:bg-[var(--gold-primary)]/15 transition-colors">
          <FileText size={15} className="text-[var(--gold-primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{doc.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${style.badge}`}>{doc.type}</span>
            <span className="text-[10px] text-gray-600">{doc.wordCount.toLocaleString()} words</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--gold-primary)]/[0.07] border border-[var(--gold-primary)]/15 text-[var(--gold-primary)]/70 group-hover/card:bg-[var(--gold-primary)]/15 group-hover/card:border-[var(--gold-primary)]/30 group-hover/card:text-[var(--gold-primary)] transition-all text-[11px] font-medium flex-shrink-0">
          <span>Open</span>
          <ArrowRight size={11} />
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[var(--gold-primary)]/15 border border-[var(--gold-primary)]/25 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-[var(--gold-primary)]" />
      </div>
      <div className="bg-[#171717] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3.5">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 150, 300].map(delay => (
            <span
              key={delay}
              className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]/60 animate-bounce"
              style={{ animationDelay: `${delay}ms`, animationDuration: "1s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface BubbleProps {
  msg: ChatMessage;
  currentDoc: StrategyDoc | null;
  isLatestDocMsg: boolean;
  onOpenDocument: (doc: StrategyDoc) => void;
}

function MessageBubble({ msg, currentDoc, isLatestDocMsg, onOpenDocument }: BubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%]">
          <div className="bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 rounded-2xl rounded-tr-sm px-4 py-3">
            <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          </div>
          <p className="text-[10px] text-gray-600 text-right mt-1.5 pr-1">{formatTime(msg.timestamp)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 group/msg">
      <div className="w-8 h-8 rounded-full bg-[var(--gold-primary)]/15 border border-[var(--gold-primary)]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot size={14} className="text-[var(--gold-primary)]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-[#171717] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3.5">
          <p className="text-sm text-gray-200 leading-relaxed">{msg.content}</p>
          {msg.docRef && isLatestDocMsg && currentDoc && (
            <DocumentCard doc={currentDoc} onOpen={() => onOpenDocument(currentDoc)} />
          )}
        </div>
        <div className="flex items-center gap-2 mt-1.5 pl-1">
          <p className="text-[10px] text-gray-600">{formatTime(msg.timestamp)}</p>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover/msg:opacity-100 transition-opacity text-gray-600 hover:text-gray-400"
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */

interface Props {
  doc: StrategyDoc | null;
  onSave: (doc: StrategyDoc) => void;
  onBack: () => void;
  onOpenDocument: (doc: StrategyDoc) => void;
}

export default function ChatEditorView({ doc: initialDoc, onSave, onBack, onOpenDocument }: Props) {
  const [messages, setMessages]         = useState<ChatMessage[]>(initialDoc?.chatHistory ?? []);
  const [inputValue, setInputValue]     = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDoc, setCurrentDoc]     = useState<StrategyDoc | null>(initialDoc ?? null);
  const [sessionTitle, setSessionTitle] = useState(initialDoc?.title ?? "New Strategy Document");
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [saveStatus, setSaveStatus]     = useState<"saved" | "saving">("saved");
  const [sessionDocId]                  = useState(initialDoc?.id ?? generateId());

  const chatEndRef    = useRef<HTMLDivElement>(null);
  const inputRef      = useRef<HTMLTextAreaElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  useEffect(() => {
    if (isTitleEditing) titleInputRef.current?.focus();
  }, [isTitleEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  };

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isGenerating) return;

    const userMsg: ChatMessage = { id: generateId(), role: "user", content: text, timestamp: new Date() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputValue("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setIsGenerating(true);

    await new Promise(r => setTimeout(r, 2200));

    const { title, type, content, reply } = getMockResult(text);
    const words = countWords(content);
    const isFirstMessage = messages.length === 0;
    const resolvedTitle = isFirstMessage ? title : sessionTitle;

    const newDoc: StrategyDoc = {
      id: sessionDocId,
      title: resolvedTitle,
      type,
      content,
      chatHistory: [], // filled below
      createdAt: initialDoc?.createdAt ?? new Date(),
      updatedAt: new Date(),
      wordCount: words,
    };

    const aiMsg: ChatMessage = {
      id: generateId(),
      role: "assistant",
      content: reply,
      timestamp: new Date(),
      docRef: sessionDocId,
    };

    const finalMessages = [...nextMessages, aiMsg];
    const savedDoc = { ...newDoc, chatHistory: finalMessages };

    setMessages(finalMessages);
    setCurrentDoc(savedDoc);
    if (isFirstMessage) setSessionTitle(resolvedTitle);
    setIsGenerating(false);
    setSaveStatus("saving");
    onSave(savedDoc);
    setTimeout(() => setSaveStatus("saved"), 600);
  }, [inputValue, isGenerating, messages, sessionTitle, sessionDocId, initialDoc, onSave]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSelectSuggestion = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Only the last assistant message with a docRef shows the document card
  const latestDocMsgId = [...messages].reverse().find(m => m.docRef)?.id;

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">

      {/* ── Top bar ── */}
      <div className="flex items-center gap-3 px-5 h-[52px] border-b border-white/[0.06] bg-[#111111] flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs px-2 py-1.5 rounded-lg hover:bg-white/[0.05]"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="w-px h-5 bg-white/[0.08]" />

        {isTitleEditing ? (
          <input
            ref={titleInputRef}
            value={sessionTitle}
            onChange={e => setSessionTitle(e.target.value)}
            onBlur={() => setIsTitleEditing(false)}
            onKeyDown={e => { if (e.key === "Enter" || e.key === "Escape") setIsTitleEditing(false); }}
            className="flex-1 min-w-0 text-sm font-semibold text-white bg-white/[0.07] border border-[var(--gold-primary)]/40 rounded-lg px-3 py-1 focus:outline-none"
          />
        ) : (
          <button
            onClick={() => setIsTitleEditing(true)}
            className="flex-1 min-w-0 text-left text-sm font-semibold text-white hover:text-gray-300 truncate transition-colors"
            title="Click to rename"
          >
            {sessionTitle}
          </button>
        )}

        {/* Save status */}
        <div className="flex items-center gap-1.5 text-xs flex-shrink-0">
          {saveStatus === "saving" ? (
            <><Loader2 size={12} className="text-gray-500 animate-spin" /><span className="text-gray-500 hidden sm:inline">Saving…</span></>
          ) : (
            <><CheckCircle2 size={12} className="text-emerald-500/80" /><span className="text-gray-500 hidden sm:inline">Saved</span></>
          )}
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[700px] mx-auto px-5 py-8">

          {messages.length === 0 && !isGenerating ? (

            /* ── Welcome / empty state ── */
            <div className="flex flex-col items-center text-center pt-8">
              <div className="w-14 h-14 rounded-2xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center mb-4">
                <Sparkles size={22} className="text-[var(--gold-primary)]" />
              </div>
              <p className="text-base font-semibold text-white mb-2">Strategy Document Assistant</p>
              <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
                Describe the strategy document you need, or select a template below to get started instantly.
              </p>

              {/* Suggestion cards */}
              <div className="grid grid-cols-2 gap-2.5 w-full">
                {SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
                  <button
                    key={label}
                    onClick={() => handleSelectSuggestion(prompt)}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#111111] border border-white/[0.06] hover:border-[var(--gold-primary)]/30 hover:bg-[var(--gold-primary)]/[0.04] text-left transition-all group/sug"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center flex-shrink-0 group-hover/sug:bg-[var(--gold-primary)]/20 transition-colors">
                      <Icon size={14} className="text-[var(--gold-primary)]" />
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover/sug:text-white transition-colors leading-snug">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          ) : (

            /* ── Chat messages ── */
            <div className="space-y-5">
              {messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  currentDoc={currentDoc}
                  isLatestDocMsg={msg.id === latestDocMsgId}
                  onOpenDocument={onOpenDocument}
                />
              ))}
              {isGenerating && <TypingIndicator />}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* ── Input area ── */}
      <div className="border-t border-white/[0.06] bg-[#0d0d0d] flex-shrink-0">
        <div className="max-w-[700px] mx-auto px-5 py-3">
          <div className="relative bg-[#111111] border border-white/[0.08] rounded-2xl focus-within:border-[var(--gold-primary)]/40 transition-colors">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
              placeholder={isGenerating ? "Generating your document…" : "Describe the strategy document you need…"}
              rows={1}
              className="w-full px-4 py-3.5 pr-14 text-sm text-white bg-transparent placeholder:text-gray-600 focus:outline-none resize-none min-h-[52px] max-h-[160px] disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isGenerating}
              className="absolute right-2.5 bottom-2.5 w-9 h-9 rounded-xl bg-[var(--gold-primary)]/15 border border-[var(--gold-primary)]/25 flex items-center justify-center text-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/25 hover:border-[var(--gold-primary)]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <SendHorizontal size={14} />
            </button>
          </div>
          <p className="text-[10px] text-gray-700 mt-2 px-1">
            Enter to send &nbsp;·&nbsp; Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
