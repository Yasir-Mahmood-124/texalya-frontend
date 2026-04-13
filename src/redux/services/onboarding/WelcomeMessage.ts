// src/redux/services/onboarding/WelcomeMessage.ts
import { baseApi } from "../baseApi";
import { RootState } from "../../store";

export interface WelcomeMessageResponse {
  message: string;
}

export const welcomeMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWelcomeMessage: builder.query<WelcomeMessageResponse, void>({
      queryFn: async (_arg, api) => {
        try {
          const state = api.getState() as RootState;
          const userId = state.auth.user?.userId;

          const res = await fetch("/api/welcome-message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(userId && { Authorization: userId }),
            },
          });

          if (!res.ok) {
            const errData = await res.text();
            console.error("[WelcomeMessage] API error:", res.status, errData);
            return { error: { status: res.status, data: errData } as const };
          }

          const data: WelcomeMessageResponse = await res.json();
          console.log("[WelcomeMessage] API response:", data);
          return { data };
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unknown error";
          console.error("[WelcomeMessage] Fetch failed:", message);
          return { error: { status: "FETCH_ERROR", error: message } as const };
        }
      },
    }),
  }),
});

export const { useGetWelcomeMessageQuery } = welcomeMessageApi;
