/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INTEGRAM_URL: string
  readonly VITE_INTEGRAM_DB: string
  readonly VITE_INTEGRAM_TOKEN: string
  readonly VITE_CLAUDE_API_KEY: string
  readonly VITE_CLAUDE_MODEL: string
  readonly VITE_HH_API_URL: string
  readonly VITE_HH_CLIENT_ID: string
  readonly VITE_HH_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
