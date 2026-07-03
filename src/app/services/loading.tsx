export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      <div className="h-[400px] bg-slate-200" />
      <div className="max-w-[1200px] mx-auto px-6 py-16 space-y-8">
        <div className="h-8 bg-slate-200 rounded-lg w-64" />
        <div className="h-5 bg-slate-200 rounded-lg w-80" />
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-5 p-6 bg-white rounded-xl border border-slate-100">
              <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-slate-200 rounded-lg w-2/3" />
                <div className="h-4 bg-slate-200 rounded-lg w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
