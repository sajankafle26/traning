"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUserGraduate, FaPlus, FaEdit, FaTrash, FaSearch, FaTimes,
  FaVideo, FaSave, FaKey, FaEye, FaEyeSlash
} from "react-icons/fa6";

interface Student {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  enrolledCourses: { _id: string; title: string; thumbnail?: string }[];
  createdAt: string;
}

interface VideoCourse {
  _id: string;
  title: string;
  thumbnail?: string;
}

const StudentsManager = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<VideoCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    enrolledCourses: [] as string[],
  });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/students", { params: { search } });
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchStudents(), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const resetForm = () => {
    setForm({ name: "", email: "", password: "", phone: "", enrolledCourses: [] });
    setEditId(null);
    setShowForm(false);
    setShowPassword(false);
  };

  const handleEdit = (student: Student) => {
    setForm({
      name: student.name,
      email: student.email,
      password: "",
      phone: student.phone || "",
      enrolledCourses: student.enrolledCourses.map((c) => c._id),
    });
    setEditId(student._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        const payload: any = { _id: editId, ...form };
        if (!form.password) delete payload.password;
        await axios.put("/api/admin/students", payload);
      } else {
        await axios.post("/api/admin/students", form);
      }
      resetForm();
      fetchStudents();
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to save student");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this student?")) return;
    try {
      await axios.delete("/api/admin/students", { params: { id } });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCourse = (courseId: string) => {
    setForm((prev) => ({
      ...prev,
      enrolledCourses: prev.enrolledCourses.includes(courseId)
        ? prev.enrolledCourses.filter((id) => id !== courseId)
        : [...prev.enrolledCourses, courseId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Manage Students</h1>
          <p className="text-sm text-slate-500 mt-1">Add students and assign video course access</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-[#00548B] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#004381] transition-all"
        >
          <FaPlus /> Add Student
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={resetForm}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">
                {editId ? "Edit Student" : "Add New Student"}
              </h2>
              <button onClick={resetForm} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Name *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
                    placeholder="Student name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
                    placeholder="student@email.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">
                    {editId ? "New Password (leave blank to keep)" : "Password *"}
                  </label>
                  <div className="relative">
                    <input
                      required={!editId}
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
                    placeholder="98XXXXXXXX"
                  />
                </div>
              </div>

              {/* Course Assignment */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block flex items-center gap-2">
                  <FaVideo /> Assign Video Courses
                </label>
                <p className="text-xs text-slate-400 mb-3">Select which video courses this student can access</p>
                <div className="grid sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto border border-slate-100 rounded-xl p-3 bg-slate-50">
                  {courses.length === 0 ? (
                    <p className="text-sm text-slate-400 col-span-2 text-center py-4">No video courses found</p>
                  ) : (
                    courses.map((course) => (
                      <label
                        key={course._id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          form.enrolledCourses.includes(course._id)
                            ? "border-[#00548B] bg-[#00548B]/5"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.enrolledCourses.includes(course._id)}
                          onChange={() => toggleCourse(course._id)}
                          className="w-4 h-4 rounded border-slate-300 text-[#00548B] focus:ring-[#00548B]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{course.title}</p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
                {form.enrolledCourses.length > 0 && (
                  <p className="text-xs text-[#00548B] font-bold mt-2">
                    {form.enrolledCourses.length} course(s) selected
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#00548B] text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#004381] transition-all disabled:opacity-50"
                >
                  <FaSave /> {saving ? "Saving..." : editId ? "Update" : "Create Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#00548B] rounded-full animate-spin mx-auto mb-3" />
            Loading students...
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center">
            <FaUserGraduate className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No students found</p>
            <p className="text-sm text-slate-400 mt-1">Click "Add Student" to create one</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Student</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Assigned Courses</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Joined</th>
                  <th className="text-right px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#00548B]/10 flex items-center justify-center text-[#00548B] font-bold text-sm">
                          {student.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{student.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {student.enrolledCourses.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">No courses assigned</span>
                        ) : (
                          student.enrolledCourses.map((course) => (
                            <span
                              key={course._id}
                              className="inline-flex items-center gap-1 bg-[#00548B]/10 text-[#00548B] px-2 py-0.5 rounded-md text-[10px] font-bold"
                            >
                              <FaVideo className="text-[8px]" />
                              {course.title}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 rounded-lg text-slate-400 hover:text-[#00548B] hover:bg-[#00548B]/10 transition-all"
                          title="Edit & Assign Courses"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Delete"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsManager;
