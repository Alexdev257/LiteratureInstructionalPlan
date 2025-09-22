
import type { ResponseData } from "@/utils/type";
import { tokenSession } from "../session";
import { normalizePath } from "../utils";
import envconfig from "./config";

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
    const res = await fetch(url, {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include", // gửi cookie HttpOnly nếu có
    });

    if (!res.ok) {
      const error = await res.json();
      throw error
    }

    return res.json() as Promise<ResponseData<T>>;
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
