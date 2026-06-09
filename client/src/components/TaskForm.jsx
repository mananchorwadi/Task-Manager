import { useState } from 'react';
import { validateTask, isValid } from '../utils/validators';

const TaskForm = ({ onCreate, loading }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateTask(formData);
    setErrors(validationErrors);

    if (!isValid(validationErrors)) return;

    onCreate({
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: 'pending',
    });

    setFormData({ title: '', description: '' });
    setErrors({});
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-500">Quick add</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">Create a new task</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task title"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title}</p>}
        </div>

        <div>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
          {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-linear-to-r from-indigo-600 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-500 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Adding task...' : 'Add task'}
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
