import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

export async function getCurrentUser() {
  const supabase: SupabaseClient = await createClient(); // awaitを使ってPromiseを解決

  // ユーザーの取得
  const { data, error } = await supabase.auth.getUser();

  // ユーザーが取得できない場合、nullを返す
  if (error || !data?.user) {
    return null;
  }

  return data.user;
}