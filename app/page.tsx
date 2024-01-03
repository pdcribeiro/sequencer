import { cookies } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: elements } = await supabase
    .from('elements')
    .select()
    .eq('owner', user.id);

  return <pre>{JSON.stringify(elements, null, 2)}</pre>;
}
