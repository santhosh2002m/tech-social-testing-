import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev.techsocial.ai";
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
    headers["Content-Type"] = "application/json"; // Remove charset=UTF-8
  }

  const options: AxiosRequestConfig = {
    method: METHOD,
    url: `${API_URL}/api/web/index.php/${VERSION}/${ENDPOINT}`, // Correct URL structure
    data: PAYLOAD,
    headers,
  };

  const token = secureLocalStorage.getItem("token") as string | null;
  if (token && ENDPOINT !== "users/register" && ENDPOINT !== "users/login") {
    // Only include token for non-auth endpoints
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    return await axios.request<T>(options);
  } catch (error: any) {
    // Enhance error logging for debugging
    console.error("API Error:", {
      url: options.url,
      method: METHOD,
      payload: PAYLOAD,
      error: error.response?.data || error.message,
    });
    throw error.response?.data || error;
  }
}
