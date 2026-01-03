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
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isAuthenticated = true;
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
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, setUser, clearCredentials, setLoading } = authSlice.actions;
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

            const userSession: UserSession = {
              user: {
                email: idTokenPayload?.email as string,
                userId: user.userId,
                firstName: idTokenPayload?.given_name as string,
                lastName: idTokenPayload?.family_name as string,
              },
              tokens: {
                accessToken,
                idToken,
              },
            };

            // Dispatch to Redux store
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
          const user = await getCurrentUser();
          const session = await fetchAuthSession();

          if (session.tokens) {
            const accessToken = session.tokens.accessToken?.toString() || "";
            const idToken = session.tokens.idToken?.toString() || "";
            const idTokenPayload = session.tokens.idToken?.payload;

            const userSession: UserSession = {
              user: {
                email: idTokenPayload?.email as string,
                userId: user.userId,
                firstName: idTokenPayload?.given_name as string,
                lastName: idTokenPayload?.family_name as string,
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
} = authApi;