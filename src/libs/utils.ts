export function createQueryString(params: Record<string, string | number | boolean>): string {
  return new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();
}