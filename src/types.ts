export enum Envs {
  prod = "prod",
  preprod = "preprod",
  local = "local",
}

export interface DotEnv {
  VITE_ENV: string
  VITE_DEV_URL: string
  VITE_DEV_MOBILE_BACKEND_URL: string
  VITE_URL: string
}
