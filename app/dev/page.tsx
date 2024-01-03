import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: elements } = await supabase.from('elements').select();

  return <pre>{JSON.stringify(elements, null, 2)}</pre>;
}
