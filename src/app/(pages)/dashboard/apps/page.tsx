"use client";

import Link from "next/link";
import { Calculator, FileEdit, ExternalLink, AppWindow } from "lucide-react";

const apps = [
  {
    id: "lead-calculator",
    name: "Lead Calculator",
    description:
      "Score and qualify your leads automatically using customizable, weighted scoring models. Define your own criteria — demographics, firmographics, behaviour signals — and let the calculator rank your pipeline so your sales team focuses on the highest-value prospects first.",
    icon: Calculator,
    tags: ["Sales", "CRM", "Lead Scoring", "Analytics"],
    gradient: "from-emerald-500/15 via-green-500/8 to-transparent",
    iconBg: "bg-emerald-500/15 border-emerald-500/25",
    iconColor: "text-emerald-400",
    tagBg: "bg-emerald-500/10 text-emerald-400/80 border-emerald-500/15",
    accentColor: "border-emerald-500/20",
    features: [
      "Custom scoring criteria & weights",
      "Real-time pipeline ranking",
      "Export to CSV / CRM",
      "Visual scoring breakdown",
    ],
    status: "Available",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    id: "word-editor",
    href: "/dashboard/apps/word-editor",
    name: "Online Word File Editor",
    description:
      "A full-featured online document editor compatible with .docx files. Open, edit, format, and save Word documents directly in your browser — no Microsoft Office installation required. Collaborate in real time, export back to .docx, or save as PDF instantly.",
    icon: FileEdit,
    tags: ["Editor", "Documents", ".docx", "Collaboration", "PDF Export"],
    gradient: "from-sky-500/15 via-blue-500/8 to-transparent",
    iconBg: "bg-sky-500/15 border-sky-500/25",
    iconColor: "text-sky-400",
    tagBg: "bg-sky-500/10 text-sky-400/80 border-sky-500/15",
    accentColor: "border-sky-500/20",
    features: [
      "Full .docx read & write support",
      "Real-time collaboration",
      "Export to PDF or .docx",
      "Rich text formatting toolbar",
    ],
    status: "Available",
    statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
];

export default function AppsPage() {
  return (
    <div className="min-h-screen px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-1">
          <AppWindow size={18} className="text-[var(--gold-primary)]" />
          <h1 className="text-2xl font-semibold text-white">Apps</h1>
        </div>
        <p className="text-sm text-gray-500">
          Powerful standalone tools designed to streamline your day-to-day work.
        </p>
      </div>

      {/* Apps — full-width cards */}
      <div className="flex flex-col gap-5">
        {apps.map(
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
            features,
            status,
            statusColor,
          }) => (
            <div
              id={id}
              key={id}
              className={`rounded-2xl bg-[#111111] border ${accentColor} overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-black/40`}
            >
              <div className={`p-7 bg-gradient-to-br ${gradient}`}>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: icon + info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl border ${iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={26} className={iconColor} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-white leading-snug">
                            {name}
                          </h3>
                          <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                            {status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full border ${tagBg}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: features + launch */}
                  <div className="md:w-64 flex-shrink-0 flex flex-col gap-4">
                    <div className="rounded-xl bg-black/20 border border-white/[0.06] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-3">
                        Key Features
                      </p>
                      <ul className="space-y-2">
                        {features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                            <span className="w-1 h-1 rounded-full bg-[var(--gold-primary)] mt-1.5 flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {href ? (
                      <Link
                        href={href}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all duration-200 group/btn"
                      >
                        <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        Open App
                      </Link>
                    ) : (
                      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/20 hover:border-[var(--gold-primary)]/40 transition-all duration-200 group/btn">
                        <ExternalLink size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        Open App
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
