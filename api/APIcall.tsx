import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL = "https://dev.techsocial.ai/api/web/index.php";
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
    headers["Accept"] = "*/*";
  } else {
    headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  const options: AxiosRequestConfig = {
    method: METHOD,
    url: `${API_URL}/${VERSION}/${ENDPOINT}`,
    data: PAYLOAD,
    headers,
  };

  const token = secureLocalStorage.getItem("loginToken") || null;
  if (token !== null) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.request<T>(options);
    return response;
  } catch (error: any) {
    if (error.response?.status === 401) {
      secureLocalStorage.removeItem("loginToken");
      throw new Error("Session expired. Please log in again.");
    }
    throw error;
  }
}
