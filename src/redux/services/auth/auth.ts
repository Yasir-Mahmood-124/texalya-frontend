// src/redux/services/auth/auth.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  deleteUser,
  getCurrentUser,
  fetchAuthSession,
  resetPassword,
  confirmResetPassword,
  SignUpOutput,
  SignInOutput,
} from "aws-amplify/auth";

/* ---------- Types ---------- */

interface AuthState {
  user: {
    email: string;
    userId: string;
    firstName?: string;
    lastName?: string;
    onboardingStatus?: boolean;
    userType?: string;
  } | null;
  isAuthenticated: boolean;
  tokens: {
    accessToken: string | null;
    idToken: string | null;
    refreshToken: string | null;
  };
  isLoading: boolean;
}

interface SignUpPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface UserSession {
  user: {
    email: string;
    userId: string;
    firstName?: string;
    lastName?: string;
    onboardingStatus?: boolean;
    userType?: string;
  };
  tokens: {
    accessToken: string;
    idToken: string;
    refreshToken?: string;
  };
}

/* ---------- Slice ---------- */

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  tokens: {
    accessToken: null,
    idToken: null,
    refreshToken: null,
  },
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<UserSession>) {
      state.user = action.payload.user;
      state.tokens = {
        accessToken: action.payload.tokens.accessToken,
        idToken: action.payload.tokens.idToken,
        refreshToken: action.payload.tokens.refreshToken || null,
      };
      state.isAuthenticated = true;
      state.isLoading = false;

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("xlya_user_data", JSON.stringify({
          user: action.payload.user,
          tokens: action.payload.tokens,
        }));
      }
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Update localStorage
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("xlya_user_data");
        if (stored) {
          const data = JSON.parse(stored);
          localStorage.setItem("xlya_user_data", JSON.stringify({
            ...data,
            user: action.payload,
          }));
        }
      }
    },
    clearCredentials(state) {
      state.user = null;
      state.tokens = {
        accessToken: null,
        idToken: null,
        refreshToken: null,
      };
      state.isAuthenticated = false;
      state.isLoading = false;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("xlya_user_data");
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    loadFromStorage(state) {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("xlya_user_data");
        if (stored) {
          try {
            const data = JSON.parse(stored);
            state.user = data.user;
            state.tokens = data.tokens;
            state.isAuthenticated = true;
          } catch (error) {
            console.error("Error loading user data from localStorage:", error);
          }
        }
      }
    },
  },
});

export const { setCredentials, setUser, clearCredentials, setLoading, loadFromStorage } = authSlice.actions;
export const authReducer = authSlice.reducer;

/* ---------- RTK Query (Cognito) ---------- */

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpOutput, SignUpPayload>({
      async queryFn({ firstname, lastname, email, password }) {
        try {
          const result = await signUp({
            username: email,
            password,
            options: {
              userAttributes: {
                email,
                given_name: firstname,
                family_name: lastname,
              },
            },
          });
          return { data: result };
        } catch (error: any) {
          console.error("SignUp error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Signup failed",
              data: error,
            },
          };
        }
      },
    }),

    confirmSignUp: builder.mutation<boolean, { email: string; code: string }>({
      async queryFn({ email, code }) {
        try {
          await confirmSignUp({
            username: email,
            confirmationCode: code,
          });
          return { data: true };
        } catch (error: any) {
          console.error("ConfirmSignUp error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Verification failed",
              data: error,
            },
          };
        }
      },
    }),

    signIn: builder.mutation<UserSession, SignInPayload>({
      async queryFn({ email, password }, { dispatch }) {
        try {
          // Check if we're on the client side
          if (typeof window === "undefined") {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: "Sign in must be performed on the client side",
                data: null,
              },
            };
          }

          // Sign in the user
          const signInResult = await signIn({
            username: email,
            password,
          });

          // Check if sign-in was successful
          if (signInResult.isSignedIn) {
            // Get the current authenticated user
            const user = await getCurrentUser();

            // Fetch the auth session to get tokens
            const session = await fetchAuthSession();

            // Extract tokens
            const accessToken = session.tokens?.accessToken?.toString() || "";
            const idToken = session.tokens?.idToken?.toString() || "";

            // Get user attributes from ID token
            const idTokenPayload = session.tokens?.idToken?.payload;

            // Fetch user profile from backend to get onboarding_status and user_type
            let onboardingStatus: boolean | undefined;
            let userType: string | undefined;

            try {
              const profileResponse = await fetch(
                "https://7i953oipvl.execute-api.us-east-1.amazonaws.com/dev/user/profile",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: user.userId,
                  },
                }
              );

              if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                onboardingStatus = profileData.onboarding_status;
                userType = profileData.user_type;
              }
            } catch (profileError) {
              console.warn("Failed to fetch user profile:", profileError);
              // Continue without profile data
            }

            const userSession: UserSession = {
              user: {
                email: idTokenPayload?.email as string,
                userId: user.userId,
                firstName: idTokenPayload?.given_name as string,
                lastName: idTokenPayload?.family_name as string,
                onboardingStatus,
                userType,
              },
              tokens: {
                accessToken,
                idToken,
              },
            };

            // Dispatch to Redux store (this also saves to localStorage)
            dispatch(setCredentials(userSession));

            return { data: userSession };
          } else {
            return {
              error: {
                status: "CUSTOM_ERROR",
                error: "Sign in incomplete",
                data: signInResult,
              },
            };
          }
        } catch (error: any) {
          console.error("SignIn error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Sign in failed",
              data: error,
            },
          };
        }
      },
    }),

    signOut: builder.mutation<boolean, void>({
      async queryFn(_, { dispatch }) {
        try {
          await signOut();
          dispatch(clearCredentials());
          return { data: true };
        } catch (error: any) {
          console.error("SignOut error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Sign out failed",
              data: error,
            },
          };
        }
      },
    }),

    getCurrentSession: builder.query<UserSession | null, void>({
      async queryFn(_, { dispatch }) {
        try {
          // Check if we're on the client side
          if (typeof window === "undefined") {
            return { data: null };
          }

          const user = await getCurrentUser();
          const session = await fetchAuthSession();

          if (session.tokens) {
            const accessToken = session.tokens.accessToken?.toString() || "";
            const idToken = session.tokens.idToken?.toString() || "";
            const idTokenPayload = session.tokens.idToken?.payload;

            // Fetch user profile from backend to get onboarding_status and user_type
            let onboardingStatus: boolean | undefined;
            let userType: string | undefined;

            try {
              const profileResponse = await fetch(
                "https://7i953oipvl.execute-api.us-east-1.amazonaws.com/dev/user/profile",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: user.userId,
                  },
                }
              );

              if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                onboardingStatus = profileData.onboarding_status;
                userType = profileData.user_type;
              }
            } catch (profileError) {
              console.warn("Failed to fetch user profile:", profileError);
              // Continue without profile data
            }

            const userSession: UserSession = {
              user: {
                email: idTokenPayload?.email as string,
                userId: user.userId,
                firstName: idTokenPayload?.given_name as string,
                lastName: idTokenPayload?.family_name as string,
                onboardingStatus,
                userType,
              },
              tokens: {
                accessToken,
                idToken,
              },
            };

            dispatch(setCredentials(userSession));
            return { data: userSession };
          }

          return { data: null };
        } catch (error: any) {
          console.error("GetCurrentSession error:", error);
          dispatch(clearCredentials());
          return { data: null };
        }
      },
    }),

    resendSignUpCode: builder.mutation<boolean, { email: string }>({
      async queryFn({ email }) {
        try {
          await resendSignUpCode({
            username: email,
          });
          return { data: true };
        } catch (error: any) {
          console.error("ResendSignUpCode error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Failed to resend code",
              data: error,
            },
          };
        }
      },
    }),

    deleteAccount: builder.mutation<boolean, void>({
      async queryFn(_, { dispatch }) {
        try {
          await deleteUser();
          dispatch(clearCredentials());
          return { data: true };
        } catch (error: any) {
          console.error("DeleteUser error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Failed to delete account",
              data: error,
            },
          };
        }
      },
    }),

    resetPassword: builder.mutation<boolean, { email: string }>({
      async queryFn({ email }) {
        try {
          await resetPassword({ username: email });
          return { data: true };
        } catch (error: any) {
          console.error("ResetPassword error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Failed to send reset code",
              data: error,
            },
          };
        }
      },
    }),

    confirmResetPassword: builder.mutation<boolean, { email: string; code: string; newPassword: string }>({
      async queryFn({ email, code, newPassword }) {
        try {
          await confirmResetPassword({
            username: email,
            confirmationCode: code,
            newPassword,
          });
          return { data: true };
        } catch (error: any) {
          console.error("ConfirmResetPassword error details:", error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error.message || "Failed to reset password",
              data: error,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useConfirmSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetCurrentSessionQuery,
  useResendSignUpCodeMutation,
  useDeleteAccountMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
} = authApi;