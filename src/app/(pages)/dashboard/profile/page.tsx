"use client";

import {
  useState, useEffect, useRef, type ChangeEvent, type FormEvent,
} from "react";
import {
  Phone, MapPin, Globe, Calendar, User,
  YoutubeIcon, TwitterIcon, GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon,
  ExternalLink, UserCircle, Save, Camera, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import type { ComponentType } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
  type SocialLinks,
  type UpdateProfilePayload,
} from "@/redux/services/auth/profileInfo";

/* ─── Social platform config ─── */
const socialPlatforms: {
  key: keyof SocialLinks;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
}[] = [
  { key: "linkedin",  label: "LinkedIn",    icon: LinkedinIcon,  color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20"     },
  { key: "twitter",   label: "Twitter / X", icon: TwitterIcon,   color: "text-sky-400",    bg: "bg-sky-500/10 border-sky-500/20"       },
  { key: "github",    label: "GitHub",      icon: GithubIcon,    color: "text-gray-300",   bg: "bg-gray-500/10 border-gray-500/20"     },
  { key: "instagram", label: "Instagram",   icon: InstagramIcon, color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/20"     },
  { key: "youtube",   label: "YouTube",     icon: YoutubeIcon,   color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20"       },
  { key: "facebook",  label: "Facebook",    icon: FacebookIcon,  color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
];

/* ─── Shared input style ─── */
const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[var(--gold-primary)]/50 focus:ring-1 focus:ring-[var(--gold-primary)]/30 transition-all duration-200";

/* ─── Labelled input field ─── */
function Field({
  label, name, value, onChange, type = "text", placeholder, icon: Icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-600">
        {label}
      </label>
      <div className="relative">
        <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
          className={`${inputCls} pl-9`}
        />
      </div>
    </div>
  );
}

/* ─── Section card ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#111111]/80 backdrop-blur-sm border border-white/[0.07]">
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ─── Empty form state ─── */
const emptyForm: UpdateProfilePayload = {
  first_name: "", last_name: "", email: "",
  phone_number: "", gender: "", country: "", address: "",
  age: undefined, image: "",
  social_links: { linkedin: "", twitter: "", github: "", instagram: "", youtube: "", facebook: "" },
};

/* ─── Page ─── */
export default function ProfilePage() {
  const authUser = useAppSelector((s) => s.auth.user);
  const { data: profile, isLoading } = useGetProfileInfoQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileInfoMutation();

  const [form, setForm]             = useState<UpdateProfilePayload>(emptyForm);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [toast, setToast]           = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* Pre-fill form once profile data arrives */
  useEffect(() => {
    if (!profile) return;
    setForm({
      first_name:   profile.first_name   ?? "",
      last_name:    profile.last_name    ?? "",
      email:        profile.email        ?? authUser?.email ?? "",
      phone_number: profile.phone_number ?? "",
      gender:       profile.gender       ?? "",
      country:      profile.country      ?? "",
      address:      profile.address      ?? "",
      age:          profile.age,
      image:        profile.image        ?? "",
      social_links: {
        linkedin:  profile.social_links?.linkedin  ?? "",
        twitter:   profile.social_links?.twitter   ?? "",
        github:    profile.social_links?.github    ?? "",
        instagram: profile.social_links?.instagram ?? "",
        youtube:   profile.social_links?.youtube   ?? "",
        facebook:  profile.social_links?.facebook  ?? "",
      },
    });
    setImagePreview(profile.image ?? "");
  }, [profile, authUser?.email]);

  /* Auto-dismiss toast */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  /* Generic field change */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "age" ? (value === "" ? undefined : Number(value)) : value }));
  };

  /* Social link change */
  const handleSocial = (key: keyof SocialLinks, value: string) => {
    setForm((f) => ({ ...f, social_links: { ...f.social_links, [key]: value } }));
  };

  /* Image file → base64 */
  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setForm((f) => ({ ...f, image: base64 }));
    };
    reader.readAsDataURL(file);
  };

  /* Submit */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(form).unwrap();
      setToast({ type: "success", msg: "Profile updated successfully!" });
    } catch {
      setToast({ type: "error", msg: "Failed to update profile. Please try again." });
    }
  };

  /* Derived display values */
  const displayName = form.first_name && form.last_name
    ? `${form.first_name} ${form.last_name}`
    : authUser?.email ?? "User";
  const initials = displayName.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const email = profile?.email ?? authUser?.email ?? "";

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8">
      {/* Page title */}
      <div className="flex items-center gap-2.5 mb-7">
        <UserCircle size={18} className="text-[var(--gold-primary)]" />
        <h1 className="text-xl font-semibold text-white">My Profile</h1>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--gold-primary)]/30 border-t-[var(--gold-primary)] animate-spin" />
          <p className="text-sm text-gray-500">Loading profile…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 max-w-4xl">

          {/* ── Profile card ── */}
          <div className="rounded-2xl bg-[#111111]/80 backdrop-blur-sm border border-white/[0.07] p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Avatar */}
              <div className="relative flex-shrink-0 w-20 h-20 group">
                <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border-2 border-[var(--gold-primary)]/40 flex items-center justify-center overflow-hidden shadow-xl">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreview} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-[var(--gold-primary)]">{initials || "?"}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <Camera size={18} className="text-white" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
              </div>

              {/* Name / email / badge */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-white truncate">{displayName}</h2>
                <p className="text-sm text-gray-500 mt-0.5 truncate">{email}</p>
                {authUser?.userType && (
                  <span className="inline-block mt-2 text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/25 text-[var(--gold-primary)] capitalize">
                    {authUser.userType}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── Personal Information (includes location) ── */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="First Name"   name="first_name"   value={form.first_name}             onChange={handleChange} icon={User}     />
              <Field label="Last Name"    name="last_name"    value={form.last_name}              onChange={handleChange} icon={User}     />
              <Field label="Phone Number" name="phone_number" value={form.phone_number ?? ""}     onChange={handleChange} icon={Phone}    />
              <Field label="Gender"       name="gender"       value={form.gender ?? ""}           onChange={handleChange} icon={User}     placeholder="e.g. Male, Female" />
              <Field label="Age"          name="age"          value={form.age?.toString() ?? ""}  onChange={handleChange} icon={Calendar} type="number" placeholder="e.g. 25" />
              <Field label="Country"      name="country"      value={form.country ?? ""}          onChange={handleChange} icon={Globe}    />
              <Field label="Address"      name="address"      value={form.address ?? ""}          onChange={handleChange} icon={MapPin}   placeholder="Street, City" />
            </div>
          </Section>

          {/* ── Social Links ── */}
          <Section title="Social Links">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {socialPlatforms.map(({ key, label, icon: Icon, color, bg }) => {
                const url = form.social_links?.[key] ?? "";
                return (
                  <div key={key} className={`rounded-xl border ${bg} p-3 space-y-1.5`}>
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={`${color} flex-shrink-0`} />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">{label}</span>
                      {url && (
                        <a href={url.startsWith("http") ? url : `https://${url}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-gray-600 hover:text-gray-400 transition-colors">
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleSocial(key, e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/[0.06] text-xs text-white placeholder-gray-700 focus:outline-none focus:border-[var(--gold-primary)]/40 focus:ring-1 focus:ring-[var(--gold-primary)]/20 transition-all duration-200"
                    />
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Save button ── */}
          <div className="flex items-center gap-4 pt-1 pb-8">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2.5 px-7 py-3 rounded-xl animate-button-gradient text-white text-sm font-medium hover:scale-[1.02] hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSaving ? (
                <><Loader2 size={15} className="animate-spin" /> Saving…</>
              ) : (
                <><Save size={15} /> Save Changes</>
              )}
            </button>

            {toast && (
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border animate-fadeIn ${
                toast.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}>
                {toast.type === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                {toast.msg}
              </div>
            )}
          </div>

        </form>
      )}
    </div>
  );
}
