"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/Logo4.png";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      router.push("/login");
    }, 1500);
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
    setError("");
    alert("Verification code resent!");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated X-Shapes Background */}
      <div className="x-bg-container-fixed">
        <div className="absolute top-20 left-1/4 x-lg x-gold-primary x-shape animate-float-slow"></div>
        <div className="absolute bottom-32 right-1/4 x-lg-xl x-white-medium x-shape animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/3 x-lg x-gold-secondary x-shape animate-float-fast"></div>
        <div className="absolute bottom-1/4 left-1/3 x-lg x-gold-light x-shape animate-float-slow"></div>
        
        <div className="absolute top-1/4 right-20 x-md x-white-medium x-shape animate-bounce-slow"></div>
        <div className="absolute bottom-1/4 left-24 x-md-lg x-gold-dark x-shape animate-pulse-slow"></div>
        <div className="absolute top-2/3 left-1/3 x-md x-gold-accent x-shape animate-bounce-medium"></div>
        <div className="absolute top-1/3 right-1/4 x-md x-white-strong x-shape animate-float-medium"></div>
        
        <div className="absolute top-40 right-1/2 x-sm-md x-gold-primary x-shape animate-float-fast"></div>
        <div className="absolute bottom-40 left-1/2 x-sm x-white-strong x-shape animate-bounce-fast"></div>
        <div className="absolute top-1/3 left-20 x-sm-md x-gold-secondary x-shape animate-float-medium"></div>
        <div className="absolute bottom-1/2 right-1/3 x-sm x-gold-light x-shape animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-md bg-[#1a1a1a] rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="mb-8 text-center">
          <Link href="/">
            <Image
              src={Logo}
              alt="Texalya Logo"
              width={120}
              height={40}
              className="h-auto w-auto mx-auto"
            />
          </Link>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--gold-primary)] to-[var(--gold-secondary)] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-gray-400 text-sm">
            We've sent a 6-digit code to
            <br />
            <span className="text-[var(--gold-primary)] font-semibold">{email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-2xl font-bold bg-[#2a2a2a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-black font-semibold py-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] font-semibold transition-colors"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}