// utils/axiosCall.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://hpl56ugq69.execute-api.ca-central-1.amazonaws.com/dev";
const VERSION = "v1";

interface AxiosCallConfig {
  ENDPOINT: string;
  METHOD: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  PAYLOAD?: any;
  CONFIG?: boolean;
}

export default async function axiosCall<T>({
  ENDPOINT,
  METHOD,
  PAYLOAD,
  CONFIG = false,
}: AxiosCallConfig): Promise<AxiosResponse<T>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (CONFIG) {
    headers["Content-Type"] = "multipart/form-data";
  } else {
    headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  const options: AxiosRequestConfig = {
    method: METHOD,
    url: `${API_URL}/${VERSION}/${ENDPOINT}`,
    data: PAYLOAD,
    headers,
  };

  const token = secureLocalStorage.getItem("token") as string | null;
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    return await axios.request<T>(options);
  } catch (error: any) {
    throw error;
  }
}
