"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/images/Logo4.png";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1500);
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

      <div className="w-full max-w-6xl bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-6">
              <Link href="/">
                <Image src={Logo} alt="Texalya Logo" width={100} height={35} className="h-auto w-auto" />
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Welcome back!</h1>
              <p className="text-gray-400">Please login to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-700 bg-[#2a2a2a] text-[var(--gold-primary)] focus:ring-[var(--gold-primary)] focus:ring-offset-0"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[var(--gold-primary)] hover:text-[var(--gold-light)] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-black font-semibold py-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login to Texalya"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] font-semibold transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[var(--gold-dark)] via-[var(--gold-primary)] to-[var(--gold-light)] p-12">
            <div className="text-center">
              <div className="mb-8">
                <svg
                  className="w-64 h-64 mx-auto text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Secure Access</h2>
              <p className="text-white/90 text-lg">
                Your data is protected with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}