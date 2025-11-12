import type { BodyRefreshToken, ResponseData, ResponseLogin } from "@/utils/type";
import { normalizePath } from "../utils";
import envconfig from "../../config/envConfig";
import { AUTH_ENDPOINT } from "./endpoint";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { router } from "@/routes";
import { isPublicEndpoint } from "@/utils/helper";
import { useSessionStore } from "@/stores/sessionStore";

export class BaseApi {
  protected createUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    const normalizedEndpoint = normalizePath(endpoint);
    const url = new URL(`${envconfig.VITE_BASE_URL}/${normalizedEndpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private getHeaders(isFormData: boolean = false): Record<string, string> {
    const { token } = useSessionStore.getState(); 
    const headers: Record<string, string> = {};

    // Không set Content-Type nếu là FormData (browser tự động set)
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (token?.accessToken) {
      headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    return headers;
  }

  protected async requestData<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: Record<string, any> | FormData
  ): Promise<ResponseData<T>> {
    // Check if body is FormData
    const isFormData = body instanceof FormData;
      
    const res = await fetch(url, {
      method,
      headers: this.getHeaders(isFormData),
      body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return res.json() as Promise<ResponseData<T>>;
  }

  protected async refreshToken(endpoint: string): Promise<void> {
    const { token, user, setToken, logout } = useSessionStore.getState();

    if (isPublicEndpoint(endpoint)) return;

    if (!token?.accessToken) {
      router.navigate({ to: "/auth/login" });
      return;
    }

    const exp = user?.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    if (exp && exp > currentTime) return;

    const url = this.createUrl(AUTH_ENDPOINT.REFRESH_TOKEN);
    const refreshToken = Cookies.get("refreshtoken");

    if (!refreshToken) {
      logout();
      router.navigate({ to: "/auth/login" });
      return;
    }

    try {
      const data: BodyRefreshToken = {
        id: Number(user?.UserId) || 0,
        accessToken: token.accessToken,
        refreshToken: refreshToken,
      };

      const res = await this.postData<ResponseLogin>(url, data);
      if (res.isSuccess && res.data) {
        const newTokens = {
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        };
        setToken(newTokens);
      }
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(errorMessage);
      logout();
      router.navigate({ to: "/auth/login" });
    }
  }

  protected getData<T>(url: string): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "GET");
  }

  protected postData<T>(
    url: string,
    body: Record<string, any> | FormData
  ): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "POST", body);
  }

  protected putData<T>(
    url: string,
    body: Record<string, any> | FormData
  ): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "PUT", body);
  }

  protected patchData<T>(
    url: string,
    body: Record<string, any> | FormData
  ): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "PATCH", body);
  }

  protected deleteData<T>(url: string): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "DELETE");
  }
}
