import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-white px-6 text-center text-[#171717]">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#dc101d]">
          404
        </div>
        <h1 className="mt-4 text-4xl font-bold">This role is no longer open</h1>
        <p className="mt-3 text-[#666]">
          It may have been filled or the link is incorrect.
        </p>
        <Link
          href="/careers"
          className="mt-8 inline-flex rounded-full bg-[#dc101d] px-7 py-3 font-semibold text-white transition hover:bg-[#b90012]"
        >
          View open roles
        </Link>
      </div>
    </main>
  );
}
