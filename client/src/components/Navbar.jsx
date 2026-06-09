const Navbar = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 shadow-[0_12px_32px_-22px_rgba(15,23,42,0.45)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.35em] text-indigo-500">TaskManager</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">Manage all your tasks</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-[28px] border border-slate-200 bg-white/95 px-2.5 py-2 shadow-[0_14px_30px_-18px_rgba(15,23,42,0.45)] ring-1 ring-white/90 sm:px-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-sm font-bold text-white shadow-lg shadow-indigo-200/70 ring-1 ring-white/30" aria-label="User avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className=" min-w-[160px] rounded-2xl bg-slate-50/85 px-3 py-2 text-right sm:block">
              <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm">{user?.name || 'Welcome'}</p>
              <p className="truncate text-[11px] text-slate-500 sm:text-xs">{user?.email || 'Ready to organise your day'}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="rounded-2xl border border-rose-200 bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-100 transition hover:-translate-y-0.5 hover:bg-indigo-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
