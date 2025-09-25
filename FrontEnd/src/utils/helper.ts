import { PUBLIC_ENDPOINT } from "@/lib/api/endpoint";

export function isPublicEndpoint(endpoint: string): boolean {
  return Object.values(PUBLIC_ENDPOINT).some(v => endpoint.includes(v));
}
