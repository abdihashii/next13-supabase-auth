import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold text-blue-500">
        Hello World
      </h1>
      <Link
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        href="/bookmarks"
      >
        Bookmarks
      </Link>
    </main>
  );
}
