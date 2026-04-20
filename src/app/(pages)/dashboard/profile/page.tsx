"use client";

import {
  useState, useEffect, useRef, type ChangeEvent, type FormEvent,
} from "react";
import {
  Mail, Phone, MapPin, Globe, Calendar, User, Pencil, Save, Loader2,
  CheckCircle2, AlertCircle,
} from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaGithub, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa6";
import type { ComponentType } from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  useGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
  type SocialLinks,
  type UpdateProfilePayload,
} from "@/redux/services/auth/profileInfo";

/* ─── Social platforms ─── */
const socialPlatforms: {
  key: keyof SocialLinks;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}[] = [
  { key: "linkedin",  label: "LinkedIn",    icon: FaLinkedinIn  },
  { key: "twitter",   label: "Twitter / X", icon: FaXTwitter    },
  { key: "github",    label: "GitHub",      icon: FaGithub      },
  { key: "instagram", label: "Instagram",   icon: FaInstagram   },
  { key: "youtube",   label: "YouTube",     icon: FaYoutube     },
  { key: "facebook",  label: "Facebook",    icon: FaFacebookF   },
];

/* ─── Extract @handle from URL ─── */
function extractHandle(url: string): string {
  if (!url) return "";
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    const parts = u.pathname.replace(/\/$/, "").split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    return last || url;
  } catch {
    return url;
  }
}

/* ─── Empty form ─── */
const emptyForm: UpdateProfilePayload = {
  first_name: "", last_name: "", email: "",
  phone_number: "", gender: "", country: "", address: "",
  age: undefined, image: "",
  social_links: { linkedin: "", twitter: "", github: "", instagram: "", youtube: "", facebook: "" },
};

/* ─── Read-only display row ─── */
function DisplayField({
  label, value, icon: Icon,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-600">{label}</p>
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <Icon size={13} className="text-gray-600 flex-shrink-0" />
        <span className="text-sm text-white truncate">{value || <span className="text-gray-700">—</span>}</span>
      </div>
    </div>
  );
}

/* ─── Editable input field ─── */
function EditField({
  label, name, value, onChange, type = "text", placeholder, icon: Icon, readOnly = false,
}: {
  label: string; name: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string; placeholder?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-600">{label}</p>
      <div className="relative">
        <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        <input
          type={type} name={name} value={value} onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder ?? `Enter ${label.toLowerCase()}`}
          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-gray-700 focus:outline-none transition-all duration-200 ${
            readOnly
              ? "border-white/[0.04] opacity-40 cursor-not-allowed"
              : "border-white/[0.08] focus:border-[var(--gold-primary)]/40 focus:ring-1 focus:ring-[var(--gold-primary)]/20"
          }`}
        />
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function ProfilePage() {
  const authUser = useAppSelector((s) => s.auth.user);
  const { data: profile, isLoading } = useGetProfileInfoQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileInfoMutation();

  const [form, setForm]                 = useState<UpdateProfilePayload>(emptyForm);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isEditing, setIsEditing]       = useState(false);
  const [toast, setToast]               = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [lastUpdated] = useState(() =>
    new Date().toLocaleString("en-US", {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
    })
  );

  /* Pre-fill form */
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "age" ? (value === "" ? undefined : Number(value)) : value,
    }));
  };

  const handleSocial = (key: keyof SocialLinks, value: string) =>
    setForm((f) => ({ ...f, social_links: { ...f.social_links, [key]: value } }));

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

  const handleCancel = () => {
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
    setIsEditing(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(form).unwrap();
      setToast({ type: "success", msg: "Profile updated successfully!" });
      setIsEditing(false);
    } catch {
      setToast({ type: "error", msg: "Failed to update profile. Please try again." });
    }
  };

  const displayName = form.first_name && form.last_name
    ? `${form.first_name} ${form.last_name}`
    : authUser?.email ?? "User";
  const initials = displayName.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
  const email    = profile?.email ?? authUser?.email ?? "";

  return (
    <div className="min-h-screen px-4 sm:px-8 py-8">

      {/* ── Page title ── */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Profile Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account information and preferences</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--gold-primary)]/30 border-t-[var(--gold-primary)] animate-spin" />
          <p className="text-sm text-gray-500">Loading profile…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">

          {/* ── Profile header card ── */}
          <div className="rounded-2xl bg-[#111111] border border-[var(--gold-primary)]/30 px-6 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* Avatar with glowing gold ring */}
              <div className="relative flex-shrink-0 self-start sm:self-center">
                <div
                  className="w-[90px] h-[90px] rounded-full p-[2.5px]"
                  style={{
                    background: "var(--gold-primary)",
                    boxShadow: "0 0 20px rgba(212,169,65,0.5), 0 0 8px rgba(212,169,65,0.35)",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePreview} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-[var(--gold-primary)]">{initials || "?"}</span>
                    )}
                  </div>
                </div>
                {/* Pencil — bottom RIGHT */}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "var(--gold-primary)" }}
                >
                  <Pencil size={10} className="text-black" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
              </div>

              {/* Name / Active badge / email / phone / bio */}
              <div className="flex-1 min-w-0">

                {/* Name + Active badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--gold-primary)] leading-tight">
                    {displayName}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-gray-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] flex-shrink-0" />
                    Active
                  </span>
                </div>

                {/* Email • Phone — icons in gold */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <Mail size={13} className="text-[var(--gold-primary)] flex-shrink-0" />
                  <span className="text-sm text-gray-400">{email}</span>
                  {form.phone_number && (
                    <>
                      <span className="text-gray-600 mx-1">•</span>
                      <Phone size={13} className="text-[var(--gold-primary)] flex-shrink-0" />
                      <span className="text-sm text-gray-400">{form.phone_number}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-lg">
                  {authUser?.userType
                    ? `${authUser.userType.charAt(0).toUpperCase() + authUser.userType.slice(1)} account with personal and social information management.`
                    : "Manage your personal profile and social information from here."}
                </p>
              </div>

              {/* Edit button — far right, only when not editing */}
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="self-start sm:self-center flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--gold-primary)]/50 text-[var(--gold-primary)] text-sm font-medium hover:bg-[var(--gold-primary)]/5 transition-all duration-200"
                >
                  <Pencil size={13} /> Edit
                </button>
              )}
            </div>
          </div>

          {/* ── Two-column ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">

            {/* Personal Information */}
            <div className={`rounded-2xl bg-[#111111] border transition-all duration-300 ${isEditing ? "border-[var(--gold-primary)]/60 animate-border-breathe" : "border-[var(--gold-primary)]/30"}`}>
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Personal Information</h2>
                <span className="text-[var(--gold-primary)]">—</span>
              </div>
              <div className="p-5 space-y-3">

                {/* Row: First + Last name */}
                <div className="grid grid-cols-2 gap-3">
                  {isEditing ? (
                    <>
                      <EditField label="First Name" name="first_name" value={form.first_name} onChange={handleChange} icon={User} />
                      <EditField label="Last Name"  name="last_name"  value={form.last_name}  onChange={handleChange} icon={User} />
                    </>
                  ) : (
                    <>
                      <DisplayField label="First Name" value={form.first_name} icon={User} />
                      <DisplayField label="Last Name"  value={form.last_name}  icon={User} />
                    </>
                  )}
                </div>

                {/* Row: Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  {isEditing ? (
                    <>
                      <EditField label="Email Address" name="email"        value={email}                    onChange={handleChange} icon={Mail}  readOnly />
                      <EditField label="Phone Number"  name="phone_number" value={form.phone_number ?? ""} onChange={handleChange} icon={Phone} />
                    </>
                  ) : (
                    <>
                      <DisplayField label="Email Address" value={email}                    icon={Mail}  />
                      <DisplayField label="Phone Number"  value={form.phone_number ?? ""} icon={Phone} />
                    </>
                  )}
                </div>

                {/* Row: Gender + Age */}
                <div className="grid grid-cols-2 gap-3">
                  {isEditing ? (
                    <>
                      <EditField label="Gender" name="gender" value={form.gender ?? ""}          onChange={handleChange} icon={User}     placeholder="e.g. Male" />
                      <EditField label="Age"    name="age"    value={form.age?.toString() ?? ""} onChange={handleChange} icon={Calendar} type="number" placeholder="e.g. 25" />
                    </>
                  ) : (
                    <>
                      <DisplayField label="Gender" value={form.gender ?? ""}          icon={User}     />
                      <DisplayField label="Age"    value={form.age?.toString() ?? ""} icon={Calendar} />
                    </>
                  )}
                </div>

                {/* Row: Country + Address side by side */}
                <div className="grid grid-cols-2 gap-3">
                  {isEditing ? (
                    <>
                      <EditField label="Country" name="country" value={form.country ?? ""} onChange={handleChange} icon={Globe} />
                      <EditField label="Address" name="address" value={form.address ?? ""} onChange={handleChange} icon={MapPin} placeholder="Street, City" />
                    </>
                  ) : (
                    <>
                      <DisplayField label="Country" value={form.country ?? ""} icon={Globe} />
                      <DisplayField label="Address" value={form.address ?? ""} icon={MapPin} />
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* Social Media */}
            <div className={`rounded-2xl bg-[#111111] border transition-all duration-300 ${isEditing ? "border-[var(--gold-primary)]/60 animate-border-breathe" : "border-[var(--gold-primary)]/30"}`}>
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Social Media</h2>
                <span className="text-[var(--gold-primary)]">—</span>
              </div>
              <div className="p-4 space-y-2">
                {socialPlatforms.map(({ key, label, icon: Icon }) => {
                  const url    = form.social_links?.[key] ?? "";
                  const handle = extractHandle(url);
                  return (
                    <div key={key} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/15 flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-[var(--gold-primary)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-gray-600 uppercase tracking-wide font-medium leading-none mb-0.5">{label}</p>
                          {isEditing ? (
                            <input
                              type="url"
                              value={url}
                              onChange={(e) => handleSocial(key, e.target.value)}
                              placeholder="Paste link here..."
                              className="w-full bg-transparent border-none outline-none text-xs text-white font-medium placeholder-gray-700 truncate"
                            />
                          ) : (
                            <p className="text-xs text-white font-medium truncate">
                              {handle || <span className="text-gray-700 font-normal">Not connected</span>}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Footer — only visible when editing ── */}
          {isEditing && (
            <div className="flex items-center justify-end pt-2 pb-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/[0.1] text-gray-400 text-sm hover:border-white/20 hover:text-white transition-all duration-200"
                >
                  × Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl animate-button-gradient text-white text-sm font-medium hover:scale-[1.02] hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSaving
                    ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
                    : <><Save size={14} /> Save Changes</>}
                </button>
              </div>
            </div>
          )}

        </form>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl text-sm border shadow-xl z-50 ${
          toast.type === "success"
            ? "bg-[#111111] border-[var(--gold-primary)]/30 text-[var(--gold-primary)]"
            : "bg-[#111111] border-white/10 text-gray-300"
        }`}>
          {toast.type === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
