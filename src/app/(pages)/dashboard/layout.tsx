// src/app/(pages)/dashboard/layout.tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardShell from "@/components/dashboard/DashboardShell";
import AnimatedXBackground from "@/components/common/AnimatedXBackground";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[var(--background)] relative">
        {/* Animated background — sits behind everything */}
        <AnimatedXBackground />

        {/* Shell manages sidebar collapse state + main margin together */}
        <DashboardShell>{children}</DashboardShell>
      </div>
    </ProtectedRoute>
  );
}
