export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[500px] bg-slate-200" />
      {/* Content skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 py-16 space-y-8">
        <div className="h-8 bg-slate-200 rounded-lg w-48" />
        <div className="h-5 bg-slate-200 rounded-lg w-96" />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[16/10] bg-slate-200 rounded-xl" />
              <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
              <div className="h-4 bg-slate-200 rounded-lg w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
