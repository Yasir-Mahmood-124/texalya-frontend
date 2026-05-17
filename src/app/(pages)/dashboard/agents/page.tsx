"use client";

import Link from "next/link";
import { Brain, TrendingUp, CalendarCheck, FileText, ExternalLink, Sparkles } from "lucide-react";

const agents = [
  {
    id: "medimind",
    href: "/dashboard/medimind",
    name: "MediMind Agent",
    description:
      "An AI-powered medical assistant designed to support clinical workflows. Generate structured patient notes, get evidence-based diagnosis suggestions, and make faster clinical decisions — all powered by the latest medical knowledge.",
    icon: Brain,
    tags: ["Medical", "Healthcare", "Diagnosis", "AI"],
    gradient: "from-rose-500/15 via-pink-500/8 to-transparent",
    iconBg: "bg-rose-500/15 border-rose-500/25",
    iconColor: "text-rose-400",
    tagBg: "bg-rose-500/10 text-rose-400/80 border-rose-500/15",
    accentColor: "border-rose-500/20",
    status: "Available",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "seo-agent",
    name: "SEO / AEO / GEO + Competitor Analysis Agent",
    description:
      "A comprehensive search-intelligence agent covering SEO (Search Engine Optimization), AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization). Includes deep competitor analysis, keyword gap detection, and actionable growth strategies.",
    icon: TrendingUp,
    tags: ["SEO", "AEO", "GEO", "Competitor Analysis", "Marketing"],
    gradient: "from-blue-500/15 via-cyan-500/8 to-transparent",
    iconBg: "bg-blue-500/15 border-blue-500/25",
    iconColor: "text-blue-400",
    tagBg: "bg-blue-500/10 text-blue-400/80 border-blue-500/15",
    accentColor: "border-blue-500/20",
    status: "Available",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "meeting-prep",
    name: "Meeting Prep Agent",
    description:
      "Walk into every meeting fully prepared. This agent researches attendees, summarizes relevant context, generates tailored talking points and agendas, and produces structured follow-up action items — so no meeting time is ever wasted.",
    icon: CalendarCheck,
    tags: ["Productivity", "Meetings", "Agenda", "Follow-ups"],
    gradient: "from-violet-500/15 via-purple-500/8 to-transparent",
    iconBg: "bg-violet-500/15 border-violet-500/25",
    iconColor: "text-violet-400",
    tagBg: "bg-violet-500/10 text-violet-400/80 border-violet-500/15",
    accentColor: "border-violet-500/20",
    status: "Available",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "strategy-doc",
    href: "/dashboard/agents/marketing-documents",
    name: "Strategy Document Generator Agent",
    description:
      "Turn your ideas into polished, professional strategy documents. From go-to-market plans and OKRs to competitive analyses and product roadmaps — this agent drafts comprehensive strategy documents aligned with your goals and business context.",
    icon: FileText,
    tags: ["Strategy", "Business", "Documents", "Planning"],
    gradient: "from-amber-500/15 via-yellow-500/8 to-transparent",
    iconBg: "bg-amber-500/15 border-amber-500/25",
    iconColor: "text-amber-400",
    tagBg: "bg-amber-500/10 text-amber-400/80 border-amber-500/15",
    accentColor: "border-amber-500/20",
    status: "Available",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <Sparkles size={18} className="text-[var(--gold-primary)]" />
          <h1 className="text-2xl font-semibold text-white">AI Agents</h1>
        </div>
        <p className="text-sm text-gray-500">
          Intelligent AI agents purpose-built for specific tasks. Launch any agent to get started.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {agents.map(
          ({
            id,
            href,
            name,
            description,
            icon: Icon,
            tags,
            gradient,
            iconBg,
            iconColor,
            tagBg,
            accentColor,
            status,
            statusColor,
          }) => (
            <div
              id={id}
              key={id}
              className={`rounded-2xl bg-[#111111] border ${accentColor} overflow-hidden group transition-all duration-300 hover:border-opacity-60 hover:shadow-xl hover:shadow-black/40`}
            >
              {/* Gradient bar top */}
              <div className={`h-1 w-full bg-gradient-to-r ${gradient.replace("via-", "to-").replace("/15", "").replace("/8", "")}`} />

              <div className={`p-6 bg-gradient-to-br ${gradient}`}>
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl border ${iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${statusColor} flex-shrink-0`}>
                    {status}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-white leading-snug mb-2">
                  {name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] px-2.5 py-0.5 rounded-full border ${tagBg}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Launch button */}
                {href ? (
                  <Link
                    href={href}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all duration-200 group/btn"
                  >
                    <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    Launch Agent
                  </Link>
                ) : (
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all duration-200 group/btn">
                    <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    Launch Agent
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
