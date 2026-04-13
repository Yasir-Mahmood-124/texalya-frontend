"use client";

import { useState, type ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <DashboardSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main
        className={`transition-all duration-300 ease-in-out min-h-screen overflow-y-auto relative z-10 ${
          collapsed ? "ml-[78px]" : "ml-[248px]"
        }`}
      >
        {children}
      </main>
    </>
  );
}
