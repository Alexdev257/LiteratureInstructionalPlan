
import type { BodyRefreshToken, ResponseData, ResponseLogin } from "@/utils/type";
import { tokenSession, userSession } from "../session";
import { normalizePath } from "../utils";
import envconfig from "../config";
import { AUTH_ENDPOINT} from "./endpoint";
import Cookies from "js-cookie";
import { setCookies } from "@/utils/setCookies";
import { toast } from "sonner";
import { router } from "@/routes";
import { isPublicEndpoint } from "@/utils/helper";


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
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const token = tokenSession.value;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * requestData: Hàm tổng quát cho mọi HTTP method
   * @param url URL endpoint
   * @param method GET | POST | PUT | PATCH | DELETE
   * @param body Optional body cho POST, PUT, PATCH
   */
  protected async requestData<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: Record<string, any>
  ): Promise<ResponseData<T>> {
    // check refresh token
    await this.refreshToken(url);
    const res = await fetch(url, {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
      // credentials: "include", // gửi cookie HttpOnly nếu có
    });

    if (!res.ok) {
      const error = await res.json();
      throw error;
    }

    return res.json() as Promise<ResponseData<T>>;
  }

  // refresh Token 
  protected async refreshToken(endpoint:string): Promise<void> {
    const token: string | null = tokenSession.value;
    if(isPublicEndpoint(endpoint))  return
    if (!token) {
      router.navigate({ to: '/auth/login' });
      return;
    }

    const exp = userSession.value?.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    // Nếu token còn hạn → không refresh
    if (exp && exp > currentTime) return;

    const url = this.createUrl(AUTH_ENDPOINT.REFRESH_TOKEN);
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      router.navigate({ to: '/auth/login' });
      return;
    }
    
    try {
      const data:BodyRefreshToken={
        id: Number(userSession.value?.UserId) || 0,
        accessToken: token,
        refreshToken: refreshToken
      }
      const res = await this.postData<ResponseLogin>(url, data);
      if (res.isSuccess) {
        setCookies(res);
      }
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(errorMessage);
      router.navigate({ to: '/auth/login' });
    }
  }




  protected getData<T>(url: string): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "GET");
  }

  protected postData<T>(url: string, body: Record<string, any>): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "POST", body);
  }

  protected putData<T>(url: string, body: Record<string, any>): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "PUT", body);
  }

  protected patchData<T>(url: string, body: Record<string, any>): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "PATCH", body);
  }

  protected deleteData<T>(url: string): Promise<ResponseData<T>> {
    return this.requestData<T>(url, "DELETE");
  }
}
