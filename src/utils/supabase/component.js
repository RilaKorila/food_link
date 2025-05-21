import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase URL または ANON KEY が設定されていません。環境変数を確認してください。');
  }
  
  const supabase = createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  )

  return supabase
}
