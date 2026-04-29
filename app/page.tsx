import Link from "next/link";
import NavBar from "@/components/NavBar";

const features = [
  {
    title: "Skills Showcase",
    description:
      "Highlight your technical strengths with categorized skill badges and clear proficiency levels."
  },
  {
    title: "Project Gallery",
    description:
      "Present your best builds in responsive project cards with GitHub and live demo links."
  },
  {
    title: "Shareable Link",
    description:
      "Get a personalized portfolio URL you can add to your resume, LinkedIn, and applications."
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand">
            Student Portfolio Builder
          </p>
          <h1 className="font-sora text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Build Your Developer Portfolio in Minutes
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Create a polished, shareable portfolio that showcases your projects,
            skills, and story as a student developer.
          </p>
          <Link
            href="/dashboard/edit"
            className="mt-8 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Create My Portfolio
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="font-sora text-xl font-semibold text-slate-900">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
