import SignIn from '@/components/auth/SignIn';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/supabase';

export default async function SignInPage() {
  const session = await getSession();

  // Check if there is a session, if there is redirect to /bookmarks
  if (session) {
    redirect('/bookmarks');
  }

  // If there is no session, render the SignIn component
  return <SignIn />;
}
