const Loader = () => {
  return (
    <div className="flex min-h-70 items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 shadow-lg shadow-slate-200/70">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
        <span className="text-sm font-semibold text-slate-600">Loading your tasks...</span>
      </div>
    </div>
  );
};

export default Loader;
