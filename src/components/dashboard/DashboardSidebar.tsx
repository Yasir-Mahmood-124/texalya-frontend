"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  AppWindow,
  UserCircle,
  LogOut,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronUp,
  Brain,
} from "lucide-react";
import Logo from "@/assets/images/Logo4.png";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { clearCredentials, useSignOutMutation } from "@/redux/services/auth/auth";

const navItems = [
  { label: "Dashboard",  href: "/dashboard",           icon: LayoutDashboard },
  { label: "Agents",     href: "/dashboard/agents",    icon: Bot             },
  { label: "Apps",       href: "/dashboard/apps",      icon: AppWindow       },
  { label: "MediMind",   href: "/dashboard/medimind",  icon: Brain           },
  { label: "My Profile", href: "/dashboard/profile",   icon: UserCircle      },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function DashboardSidebar({ collapsed, onToggle }: Props) {
  const pathname  = usePathname();
  const router    = useRouter();
  const dispatch  = useAppDispatch();
  const user      = useAppSelector((state) => state.auth.user);
  const [signOut] = useSignOutMutation();

  const [menuOpen,    setMenuOpen]    = useState(false);
  const [dropUpPos,   setDropUpPos]   = useState({ bottom: 0, left: 0, width: 0 });
  const [isMounted,   setIsMounted]   = useState(false);

  const userBtnRef  = useRef<HTMLButtonElement>(null);
  const dropMenuRef = useRef<HTMLDivElement>(null);

  /* Ensure portal only runs client-side */
  useEffect(() => { setIsMounted(true); }, []);

  /* Close drop-up when clicking outside both the button and the menu */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!userBtnRef.current?.contains(t) && !dropMenuRef.current?.contains(t)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggleMenu = () => {
    if (!menuOpen && userBtnRef.current) {
      const rect = userBtnRef.current.getBoundingClientRect();
      setDropUpPos({
        bottom: window.innerHeight - rect.top + 8,
        left:   rect.left,
        width:  Math.max(rect.width, 172),
      });
    }
    setMenuOpen((o) => !o);
  };

  const handleSignOut = async () => {
    setMenuOpen(false);
    try { await signOut().unwrap(); } catch { /* ignore */ }
    finally { dispatch(clearCredentials()); }
  };

  const handleSettings = () => {
    setMenuOpen(false);
    router.push("/dashboard/profile");
  };

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email ?? "My Account";
  const initial = displayName.charAt(0).toUpperCase();

  /* ── Portal drop-up ── rendered at document.body so overflow-hidden never clips it */
  const dropUp =
    isMounted && menuOpen
      ? createPortal(
          <div
            ref={dropMenuRef}
            style={{
              position: "fixed",
              bottom:   dropUpPos.bottom,
              left:     dropUpPos.left,
              minWidth: dropUpPos.width,
              zIndex:   9999,
            }}
            className="rounded-xl bg-[#1a1a1a] border border-white/[0.10] py-1 shadow-2xl shadow-black/80 animate-slideUp"
          >
            <button
              onClick={handleSettings}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Settings size={14} className="text-gray-500 flex-shrink-0" />
              Settings
            </button>

            <div className="mx-3 my-1 border-t border-white/[0.07]" />

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:text-red-400 hover:bg-red-500/[0.07] transition-colors"
            >
              <LogOut size={14} className="text-gray-500 flex-shrink-0" />
              Sign out
            </button>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {dropUp}

      <aside
        className={`fixed left-0 top-0 h-screen z-30 flex items-stretch transition-all duration-300 ease-in-out ${
          collapsed ? "w-[78px] p-2.5" : "w-[248px] p-3"
        }`}
      >
        {/* Floating card — overflow-hidden preserved for polished rounded corners */}
        <div className="flex-1 rounded-2xl bg-[#111111]/85 backdrop-blur-2xl border border-white/[0.08] flex flex-col overflow-hidden shadow-2xl shadow-black/60">

          {/* ── Logo / Toggle ── */}
          <div
            className={`flex items-center border-b border-white/[0.06] flex-shrink-0 ${
              collapsed ? "justify-center px-3 py-4" : "gap-2 px-3 pt-4 pb-3.5"
            }`}
          >
            {!collapsed && (
              <Link href="/dashboard" className="flex-1 min-w-0">
                <Image src={Logo} alt="Xlya" width={150} height={50} className="h-10 w-auto" priority />
              </Link>
            )}
            <button
              onClick={onToggle}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200 flex-shrink-0"
            >
              {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
            </button>
          </div>

          {/* ── Navigation ── */}
          <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600 px-3 mb-2.5">
                Menu
              </p>
            )}
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive =
                href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? label : undefined}
                  className={`flex items-center rounded-xl text-sm font-medium transition-all duration-200 group border
                    ${collapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"}
                    ${isActive
                      ? "bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] border-[var(--gold-primary)]/20"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05] border-transparent"
                    }`}
                >
                  <Icon
                    size={17}
                    className={`flex-shrink-0 transition-colors ${
                      isActive ? "text-[var(--gold-primary)]" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  />
                  {!collapsed && label}
                </Link>
              );
            })}
          </nav>

          {/* ── User section ── */}
          <div className={`flex-shrink-0 border-t border-white/[0.06] py-3 ${collapsed ? "px-2" : "px-2"}`}>
            <button
              ref={userBtnRef}
              onClick={handleToggleMenu}
              className={`w-full flex items-center rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.10] transition-all duration-200 ${
                collapsed ? "justify-center p-2" : "gap-3 px-2.5 py-2"
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-[var(--gold-primary)]/15 border border-[var(--gold-primary)]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[var(--gold-primary)] text-xs font-semibold">{initial}</span>
              </div>

              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm text-white font-medium truncate leading-tight">{displayName}</p>
                    <p className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">{user?.email ?? ""}</p>
                  </div>
                  <ChevronUp
                    size={13}
                    className={`text-gray-600 flex-shrink-0 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                  />
                </>
              )}
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}
