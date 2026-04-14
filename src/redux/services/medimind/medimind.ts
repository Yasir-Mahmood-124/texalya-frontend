// src/redux/services/medimind/medimind.ts
import { baseApi } from "../baseApi";

/* ---------- Types ---------- */

export interface UploadReportResponse {
  report_id: string;
  uploaded_at: string;
  presigned_url: string;
  s3_key: string;
  status: string;
  message: string;
}

export interface Diagnosis {
  primary_disease: Record<string, unknown>;
  secondary_disease: Record<string, unknown>;
  reasons: string[];
  details: Record<string, unknown>;
  safety_measures: string[];
  disclaimer: string;
}

export interface GetReportResponse {
  report_id?: string;
  cognito_sub?: string;
  status: "pending" | "processing" | "completed";
  uploaded_at?: string;
  diagnosed_at?: string;
  s3_key?: string;
  diagnosis?: Diagnosis;
  message?: string;
}

/* ---------- API ---------- */

export const medimindApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadReport: builder.mutation<UploadReportResponse, void>({
      query: () => ({
        url: "/report-upload",
        method: "POST",
        body: {},
      }),
    }),

    getReport: builder.query<GetReportResponse, string>({
      query: (report_id) => ({
        url: `/get-report?report_id=${report_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadReportMutation,
  useLazyGetReportQuery,
} = medimindApi;
