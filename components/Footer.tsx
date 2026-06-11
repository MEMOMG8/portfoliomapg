export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-[#1E1E2E]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-slate-700 tracking-wide">
          © 2026 Manuel Perez Gil
        </span>
        <span className="font-mono text-[11px] text-slate-700 tracking-wide">
          Built with Next.js · Deployed on Vercel
        </span>
      </div>
    </footer>
  );
}
