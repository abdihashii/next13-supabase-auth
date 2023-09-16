import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignOut from '@/components/auth/SignOut';
import Image from 'next/image';

export default async function Bookmarks() {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
                src={bookmark?.imgsrc || undefined}
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
