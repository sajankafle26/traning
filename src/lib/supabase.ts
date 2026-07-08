import { createClient, SupabaseClient } from '@supabase/supabase-js';

type ClientState = SupabaseClient | null | undefined;
let _admin: ClientState = undefined;
let _public: ClientState = undefined;

function initAdmin(): SupabaseClient | null {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  } catch {
    return null;
  }
}

function initPublic(): SupabaseClient | null {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  } catch {
    return null;
  }
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (_admin === undefined) _admin = initAdmin();
  return _admin;
}

export function getSupabase(): SupabaseClient | null {
  if (_public === undefined) _public = initPublic();
  return _public;
}
