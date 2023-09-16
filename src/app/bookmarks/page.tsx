import { redirect } from 'next/navigation';
import SignOut from '@/components/auth/SignOut';
import Image from 'next/image';
import { createServerSupabaseClient, getUser } from '@/lib/supabase';

export default async function Bookmarks() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const { data: bookmarks, error } = await supabase.from('bookmarks').select();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="mx-auto flex flex-col items-center gap-4 p-4 sm:px-6 lg:p-8">
        <h1 className="text-center text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10">
          Bookmarks
        </h1>
        <SignOut />
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.uuid}>
              <Image
                src={
                  bookmark?.imgsrc ||
                  'https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1467&q=80'
                }
                alt={bookmark?.title || undefined}
                width="1920"
                height="1080"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
