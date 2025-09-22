
import type { User } from "../utils/type";
import { decodeJWT } from "./utils";
export class TokenSession {
  private token?: string|null = null;

  get value(): string| null {
    return this.token || null;
  }
  set value(token: string) {
    this.token = token;
  }
  clear() {
    this.token = null;
  }
}

export const tokenSession = new TokenSession();

export class UserSession {
  private _user: User | null = null;

  get value(): User | null {
    return this._user;
  }

  setFromToken(token: string) {
    try {
      const decoded = decodeJWT<User>(token);
      this._user = decoded;
    } catch (error) {
      console.error("Invalid token", error);
      this._user = null;
    }
  }
  clear() {
    this._user = null;
  }
}
export const userSession = new UserSession();

