// src/app/verify-email/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useConfirmSignUpMutation } from "@/redux/services/auth/auth";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/Logo4.png";
import AnimatedXBackground from "@/components/common/AnimatedXBackground";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [confirmSignUp, { isLoading }] = useConfirmSignUpMutation();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      setError("Email address is required. Please sign up again.");
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email address is missing. Please sign up again.");
      return;
    }

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    try {
      await confirmSignUp({ email, code }).unwrap();
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth/login?verified=true");
      }, 2000);
    } catch (err: any) {
      console.error("Verification error:", err);
      const errorMessage = err?.error || err?.message || "Invalid verification code";
      setError(errorMessage);
    }
  };

  const handleResendCode = async () => {
    // TODO: Implement resend code functionality
    console.log("Resend code for:", email);
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
        <AnimatedXBackground />
        <div className="w-full max-w-md bg-[#1a1a1a]/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative z-10">
          <div className="text-center mb-6">
            <Image src={Logo} alt="Xlya Logo" width={120} height={40} className="h-auto w-auto mx-auto mb-4" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Email Required</h2>
            <p className="text-gray-400 mb-6">
              No email address provided. Please sign up again.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-black font-semibold px-6 py-3 rounded-lg hover:shadow-xl hover:shadow-[var(--gold-primary)]/20 transition-all duration-300"
            >
              Back to Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
        <AnimatedXBackground />
        <div className="w-full max-w-md bg-[#1a1a1a]/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative z-10">
          <div className="text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Email Verified!</h2>
            <p className="text-gray-400 mb-6">
              Your email has been successfully verified. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      <AnimatedXBackground />
      
      <div className="w-full max-w-md bg-[#1a1a1a]/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 relative z-10">
        <div className="text-center mb-6">
          <Image src={Logo} alt="Xlya Logo" width={120} height={40} className="h-auto w-auto mx-auto mb-4" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
        <p className="text-gray-400 text-sm mb-6">
          We've sent a verification code to{" "}
          <span className="text-[var(--gold-primary)] font-medium">{email}</span>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                if (value.length <= 6) {
                  setCode(value);
                }
              }}
              className="w-full px-4 py-3 text-center text-2xl tracking-widest bg-[#2a2a2a]/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold-primary)] focus:ring-2 focus:ring-[var(--gold-primary)]/50 transition-all"
              placeholder="000000"
              maxLength={6}
              autoComplete="one-time-code"
              autoFocus
            />
            <p className="text-gray-500 text-xs mt-2">Enter the 6-digit code sent to your email</p>
          </div>

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-black font-semibold py-3 rounded-lg hover:shadow-xl hover:shadow-[var(--gold-primary)]/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResendCode}
            className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] text-sm font-medium transition-colors"
          >
            Resend Code
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-gray-400 text-sm hover:text-[var(--gold-primary)] transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}