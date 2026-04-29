"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import { api } from "../../lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg("");
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.post("/auth/register", { email, password });
      
      if (res.data.success) {
        // Log them in immediately after register
        login(res.data.data.token, res.data.data.user);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#312e81_0%,_#1e1b4b_30%,_#0f172a_60%,_#020617_100%)] text-slate-100">
      <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border border-slate-600/80 bg-slate-900/50 p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
            Studentfolio Access
          </p>
          <h1 className="font-sora text-3xl font-bold text-white">Register</h1>
          <p className="mt-2 text-sm text-slate-300">
            Create an account to build and share your portfolio.
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-4">
            <label className="block space-y-1">
              <span className="text-sm text-slate-300">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-500 bg-slate-800/70 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/30"
                placeholder="you@example.com"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm text-slate-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-500 bg-slate-800/70 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand/30"
                placeholder="Choose a secure password"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {errorMsg ? (
            <p className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {errorMsg}
            </p>
          ) : null}

          <p className="mt-6 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
