import { userSession, tokenSession } from "@/lib/session";
import Cookies from "js-cookie";
import type { ResponseData, ResponseLogin } from "./type";

export function setCookies(res: ResponseData<ResponseLogin>): void {
  const { accessToken, refreshToken } = res.data;

  // Cập nhật session và token
  userSession.setFromToken(accessToken);
  tokenSession.value = accessToken;

  // Lưu cookie
  Cookies.set("token", accessToken, { expires: 7 });
  Cookies.set("refreshToken", refreshToken, { expires: 7 });
}