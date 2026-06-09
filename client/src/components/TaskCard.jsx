const statusStyles = {
  pending: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200',
  completed: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
};

const statusAccent = {
  pending: 'from-rose-500 to-red-500',
  completed: 'from-emerald-400 to-teal-400',
};

const TaskCard = ({ task, onDelete, onStatusChange, onEdit }) => {
  const createdAt = task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Recently';

  return (
    <article className="group flex h-full flex-col rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_16px_36px_-18px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_18px_40px_-16px_rgba(99,102,241,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">{createdAt}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-semibold text-slate-900">{task.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] ${statusStyles[task.status] || statusStyles.pending}`}>
          {task.status}
        </span>
      </div>

      <div className={`mt-4 h-1.5 w-20 rounded-full bg-linear-to-r ${statusAccent[task.status] || 'from-indigo-400 to-violet-400'}`} />
      <p className="mt-4 min-h-18 flex-1 text-sm leading-6 text-slate-600">{task.description}</p>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl p-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-[0.2em]">Status</span>
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task._id, e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onEdit(task)}
                className="rounded-xl border border-indigo-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm shadow-indigo-100 transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-md"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="rounded-xl border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-rose-600 shadow-sm shadow-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-50 hover:shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
