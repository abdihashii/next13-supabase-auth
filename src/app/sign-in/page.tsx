import SignIn from '@/components/auth/SignIn';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  // Check if there is a session, if there is redirect to /bookmarks
  if (data?.session) {
    redirect('/bookmarks');
  }

  // If there is no session, render the SignIn component
  return <SignIn />;
}
