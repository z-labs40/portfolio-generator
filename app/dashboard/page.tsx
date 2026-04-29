import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="font-sora text-3xl font-bold text-slate-900">
            Student Dashboard
          </h1>
          <p className="mt-3 text-slate-600">
            Manage your profile and keep your portfolio fresh with your latest work.
          </p>
          <Link
            href="/dashboard/edit"
            className="mt-6 inline-flex rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Edit Portfolio
          </Link>
        </div>
      </section>
    </main>
  );
}
