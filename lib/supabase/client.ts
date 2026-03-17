import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/env'

export const createSupabaseBrowserClient = () =>
  createBrowserClient(
    env.supabase.url,
    env.supabase.anonKey
  )
