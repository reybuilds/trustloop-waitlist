import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

function getLocalClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error('Missing Supabase URL or publishable key in server env');
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const emailSchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().max(64).optional(),
});

export const joinWaitlist = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => emailSchema.parse(input))
  .handler(async ({ data }) => {
    const source = data.source ?? 'landing';

    // 1. Insert into local Lovable Cloud (RLS allows anon insert)
    const { error: localError } = await getLocalClient()
      .from('waitlist_signups')
      .insert({ email: data.email, source });

    let alreadyJoined = false;
    if (localError) {
      if (localError.code === '23505') {
        alreadyJoined = true;
      } else {
        console.error('Local waitlist insert failed:', localError);
        return { success: false, alreadyJoined: false, error: 'Failed to save signup' };
      }
    }

    // 2. Forward to external Supabase (best-effort)
    const externalUrl = process.env.EXTERNAL_SUPABASE_URL;
    const externalKey = process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY;

    if (externalUrl && externalKey) {
      try {
        const externalClient = createClient(externalUrl, externalKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { error: extError } = await externalClient
          .from('waitlist_signups')
          .insert({ email: data.email, source });

        if (extError && extError.code !== '23505') {
          console.error('External waitlist forward failed:', extError);
        }
      } catch (e) {
        console.error('External waitlist forward threw:', e);
      }
    }

    return { success: true, alreadyJoined, error: null };
  });

export const getWaitlistCount = createServerFn({ method: 'GET' }).handler(async () => {
  const { data, error } = await getLocalClient().rpc('get_waitlist_count');

  if (error) {
    console.error('Failed to count waitlist:', error);
    return { count: 0 };
  }
  return { count: Number(data) || 0 };
});
