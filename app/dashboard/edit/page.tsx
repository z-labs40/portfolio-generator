import NavBar from "@/components/NavBar";
import PortfolioForm from "@/components/PortfolioForm";

export default function EditPortfolioPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h1 className="font-sora text-3xl font-bold text-slate-900">
            Edit Your Portfolio
          </h1>
          <p className="mt-2 text-slate-600">
            Complete each step to build a public profile that is ready to share.
          </p>
        </div>
        <PortfolioForm />
      </section>
    </main>
  );
}
