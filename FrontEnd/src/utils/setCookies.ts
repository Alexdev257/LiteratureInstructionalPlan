import { userSession, tokenSession } from "@/lib/session";
import Cookies from "js-cookie";
import type { ResponseData, ResponseLogin } from "./type";

export function setCookies(res: ResponseData<ResponseLogin>): void {
  const { accessToken, refreshToken } = res.data;

  // Cập nhật session và token
  userSession.setFromToken(accessToken);
  tokenSession.value = accessToken;


  // lưu token vào cookie
  const oneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
  Cookies.set("accesstoken", accessToken, { expires: oneHour });
  Cookies.set("refreshtoken", refreshToken, { expires: oneHour });

}