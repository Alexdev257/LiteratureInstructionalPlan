import { PUBLIC_ENDPOINT } from "@/lib/api/endpoint";


export function isPublicEndpoint(endpoint: string): boolean {
  return Object.values(PUBLIC_ENDPOINT).some(v => endpoint.includes(v));
}

export function toVietnamTime(utcDate: string | Date): Date {
  const date = new Date(utcDate);
  // Việt Nam là UTC+7 → +7 giờ = +7 * 60 * 60 * 1000 ms
  return new Date(date.getTime() + 7 * 60 * 60 * 1000);
}

/**
 * Lấy thời gian hiện tại theo giờ Việt Nam
 */
export function nowVietnam(): Date {
  return toVietnamTime(new Date());
}

/**
 * Tính số giây còn lại từ endTime (UTC) đến hiện tại (VN)
 */
export function getRemainingSeconds(endTimeUTC: string): number {
  const endVN = toVietnamTime(endTimeUTC);
  const nowVN = nowVietnam();
  const diffMs = endVN.getTime() - nowVN.getTime();
  return Math.max(0, Math.floor(diffMs / 1000));
}