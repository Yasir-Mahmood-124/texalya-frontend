"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Bot, AppWindow, ArrowRight, Brain, TrendingUp, CalendarCheck, FileText, Calculator, FileEdit } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useGetWelcomeMessageQuery } from "@/redux/services/onboarding/WelcomeMessage";

const agents = [
  {
    id: "medimind",
    name: "MediMind Agent",
    description: "AI-powered medical assistant for diagnosis support, clinical decision-making, and patient note generation.",
    icon: Brain,
    tags: ["Medical", "Healthcare", "AI"],
    color: "from-rose-500/20 to-pink-500/10",
    iconColor: "text-rose-400",
    borderColor: "border-rose-500/20",
  },
  {
    id: "seo-agent",
    name: "SEO / AEO / GEO + Competitor Analysis",
    description: "Comprehensive search optimization and competitive intelligence across SEO, AEO, and GEO dimensions.",
    icon: TrendingUp,
    tags: ["SEO", "Marketing", "Analytics"],
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    id: "meeting-prep",
    name: "Meeting Prep Agent",
    description: "Prepare for meetings with AI-generated research, talking points, agendas, and follow-up summaries.",
    icon: CalendarCheck,
    tags: ["Productivity", "Meetings", "Planning"],
    color: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/20",
  },
  {
    id: "strategy-doc",
    name: "Strategy Document Generator",
    description: "Generate comprehensive business strategy documents, reports, and plans tailored to your goals.",
    icon: FileText,
    tags: ["Strategy", "Business", "Docs"],
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
];

const apps = [
  {
    id: "lead-calculator",
    name: "Lead Calculator",
    description: "Score and qualify leads automatically using customizable criteria and weighted scoring models.",
    icon: Calculator,
    tags: ["Sales", "CRM", "Analytics"],
    color: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    id: "word-editor",
    name: "Online Word File Editor",
    description: "Edit, format, and collaborate on Word documents directly in your browser — no installs needed.",
    icon: FileEdit,
    tags: ["Editor", "Documents", "Collaboration"],
    color: "from-sky-500/20 to-blue-500/10",
    iconColor: "text-sky-400",
    borderColor: "border-sky-500/20",
  },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const greeting = useMemo(() => getGreeting(), []);

  const firstName = user?.firstName ?? user?.email?.split("@")[0] ?? "there";

  const { data: welcomeData, isLoading: welcomeLoading } = useGetWelcomeMessageQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  const rawMessage = welcomeData?.message ?? `${greeting}, ${firstName}`;

  // Split on the first comma — everything before it is the name, rest is the tail
  const commaIndex = rawMessage.indexOf(",");
  const namePart = commaIndex !== -1 ? rawMessage.slice(0, commaIndex) : null;
  const tailPart = commaIndex !== -1 ? rawMessage.slice(commaIndex) : rawMessage;

  return (
    <div className="min-h-screen px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        {welcomeLoading ? (
          <div className="flex flex-col gap-2">
            <div className="h-8 w-72 rounded-lg bg-white/[0.06] animate-pulse" />
            <div className="h-4 w-96 rounded-md bg-white/[0.04] animate-pulse" />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-white">
              {namePart && (
                <span className="text-[var(--gold-primary)]">{namePart}</span>
              )}
              {tailPart}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome to your Xlya workspace. Here&apos;s what&apos;s available for you today.
            </p>
          </>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "AI Agents", value: "4", icon: Bot, desc: "Available agents" },
          { label: "Apps", value: "2", icon: AppWindow, desc: "Available apps" },
          { label: "Agents Active", value: "0", icon: Bot, desc: "Currently running" },
          { label: "Sessions Today", value: "0", icon: CalendarCheck, desc: "Completed today" },
        ].map(({ label, value, icon: Icon, desc }) => (
          <div
            key={label}
            className="rounded-2xl bg-[#111111] border border-white/[0.07] p-5 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/20 flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-[var(--gold-primary)]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none">{value}</p>
              <p className="text-sm font-medium text-gray-300 mt-1">{label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Agents Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">AI Agents</h2>
            <p className="text-xs text-gray-500 mt-0.5">Intelligent agents ready to assist you</p>
          </div>
          <Link
            href="/dashboard/agents"
            className="flex items-center gap-1.5 text-xs text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors group"
          >
            View all
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {agents.map(({ id, name, description, icon: Icon, tags, color, iconColor, borderColor }) => (
            <Link
              key={id}
              href={`/dashboard/agents#${id}`}
              className={`group rounded-2xl bg-gradient-to-br ${color} border ${borderColor} p-5 flex flex-col gap-3 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 transition-all duration-200`}
            >
              <div className="w-10 h-10 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
                <Icon size={19} className={iconColor} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white leading-snug">{name}</p>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.07] text-gray-400 border border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Apps Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">Apps</h2>
            <p className="text-xs text-gray-500 mt-0.5">Powerful tools to supercharge your workflow</p>
          </div>
          <Link
            href="/dashboard/apps"
            className="flex items-center gap-1.5 text-xs text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors group"
          >
            View all
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apps.map(({ id, name, description, icon: Icon, tags, color, iconColor, borderColor }) => (
            <Link
              key={id}
              href={`/dashboard/apps#${id}`}
              className={`group rounded-2xl bg-gradient-to-br ${color} border ${borderColor} p-6 flex gap-5 hover:scale-[1.015] hover:shadow-lg hover:shadow-black/30 transition-all duration-200`}
            >
              <div className="w-12 h-12 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon size={22} className={iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.07] text-gray-400 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
