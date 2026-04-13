// src/redux/services/auth/profileInfo.ts
import { baseApi } from "../baseApi";

/* ---------- Types ---------- */

export interface SocialLinks {
  youtube?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

export interface ProfileInfo {
  first_name: string;
  last_name: string;
  email: string;
  image?: string;
  gender?: string;
  country?: string;
  address?: string;
  phone_number?: string;
  age?: number;
  social_links?: SocialLinks;
  onboarding_status: boolean;
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  age?: number;
  phone_number?: string;
  gender?: string;
  country?: string;
  address?: string;
  image?: string;
  social_links?: SocialLinks;
}

/* ---------- API ---------- */

export const profileInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileInfo: builder.query<ProfileInfo, void>({
      query: () => ({
        url: "/profile/profile-info",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateProfileInfo: builder.mutation<
      { message: string; updated_fields: Record<string, unknown> },
      UpdateProfilePayload
    >({
      query: (body) => ({
        url: "/profile/personal-info",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileInfoQuery,
  useLazyGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
} = profileInfoApi;
