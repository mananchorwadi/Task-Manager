import { useEffect, useMemo, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const ITEMS_PER_PAGE = 6;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', status: 'pending' });
  const [editing, setEditing] = useState(false);

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, tasks]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / ITEMS_PER_PAGE));
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredTasks]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'completed').length;
    const pending = tasks.length - completed;

    return { total: tasks.length, completed, pending };
  }, [tasks]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    setCreating(true);

    try {
      const { data } = await API.post('/tasks', taskData);
      setTasks((prev) => [data, ...prev]);
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setEditForm({ title: task.title, description: task.description, status: task.status });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!editingTask) return;

    setEditing(true);

    try {
      const { data } = await API.put(`/tasks/${editingTask._id}`, editForm);
      setTasks((prev) => prev.map((task) => (task._id === editingTask._id ? data : task)));
      setEditingTask(null);
    } catch (error) {
      console.log(error);
    } finally {
      setEditing(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await API.patch(`/tasks/${id}/status`, { status });
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef2ff_45%,#f8fafc_100%)] text-slate-900">
      <Navbar user={user} onLogout={logout} />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
            <p className="text-xs uppercase tracking-[0.35em] text-indigo-500">Overview</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Your task board</h2>
            <p className="mt-3 max-w-xl text-slate-600">Track what is pending, celebrate completed work, and add new tasks in seconds.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Total tasks', value: stats.total, accent: 'from-indigo-500 to-violet-500' },
                { label: 'Pending', value: stats.pending, accent: 'from-rose-500 to-red-500' },
                { label: 'Completed', value: stats.completed, accent: 'from-emerald-400 to-teal-400' },
              ].map((item) => (
                <article key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className={`h-2 w-16 rounded-full bg-linear-to-r ${item.accent}`} />
                  <p className="mt-4 text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-3xl font-semibold text-slate-900">{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <TaskForm onCreate={createTask} loading={creating} />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-indigo-500">Tasks</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-900">Recent tasks</h3>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-64"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">{filteredTasks.length} shown</span>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : filteredTasks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              No matching tasks found. Try a different keyword or status filter.
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {paginatedTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onDelete={deleteTask} onStatusChange={updateStatus} onEdit={openEditTask} />
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p>
                  Showing {paginatedTasks.length} of {filteredTasks.length} tasks
                  {filteredTasks.length !== tasks.length ? ' (filtered)' : ''}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="rounded-xl bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-[30px] border border-white/80 bg-white p-6 shadow-2xl shadow-slate-900/20">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-indigo-500">Edit task</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">Update your task</h3>
              </div>
              <button
                onClick={() => setEditingTask(null)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <form onSubmit={updateTask} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  rows="4"
                  value={editForm.description}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editing}
                  className="rounded-2xl bg-linear-to-r from-indigo-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-500 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editing ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;