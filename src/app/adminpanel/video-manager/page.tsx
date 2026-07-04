"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaVideo, FaUpload, FaTrash, FaPlus, FaSpinner, FaCheck,
  FaLock, FaEye, FaMagnifyingGlass, FaEdit, FaCloudArrowUp, FaFileVideo
} from "react-icons/fa6";

interface Course {
  _id: string;
  title: string;
  slug?: string;
  lessons: { _id: string; title: string; videoUrl: string; duration: string; isPreview: boolean }[];
}

const VideoManager = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCourseId, setUploadCourseId] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadCourseId || !lessonTitle) {
      showMessage("Please fill all required fields", "error");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // 1. Upload file to our API (which uploads to Supabase)
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("courseId", uploadCourseId);
      formData.append("lessonTitle", lessonTitle);

      const uploadRes = await axios.post("/api/video/upload-lesson", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) setUploadProgress(Math.round((e.loaded / e.total) * 100));
        },
      });

      const { filePath, lessonId } = uploadRes.data;

      showMessage("Video uploaded! Adding lesson to course...", "success");

      // 2. Add lesson to course
      const course = courses.find((c) => c._id === uploadCourseId);
      const updatedLessons = [
        ...(course?.lessons || []),
        {
          title: lessonTitle,
          videoUrl: filePath, // Supabase storage path
          duration: lessonDuration || "0:00",
          isPreview,
          description: "",
        },
      ];

      await axios.put(`/api/courses/${uploadCourseId}`, {
        lessons: updatedLessons,
      });

      showMessage("Lesson added successfully!", "success");
      resetUploadForm();
      fetchCourses();
    } catch (err: any) {
      console.error(err);
      showMessage(err.response?.data?.error || "Upload failed", "error");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const resetUploadForm = () => {
    setUploadFile(null);
    setLessonTitle("");
    setLessonDuration("");
    setIsPreview(false);
    setUploadCourseId("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteLesson = async (courseId: string, lessonIndex: number) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      const course = courses.find((c) => c._id === courseId);
      if (!course) return;
      const updatedLessons = course.lessons.filter((_, i) => i !== lessonIndex);
      await axios.put(`/api/courses/${courseId}`, { lessons: updatedLessons });
      showMessage("Lesson deleted", "success");
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCourses = courses.filter(
    (c) => c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900">Video Manager</h1>
        <p className="text-sm text-slate-500 mt-1">Upload videos to Supabase and assign to courses</p>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-xl text-sm font-bold ${
          message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      {/* Setup Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h3 className="font-bold text-amber-800 mb-2">Supabase Setup Required</h3>
        <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
          <li>Go to <a href="https://supabase.com" target="_blank" className="underline font-bold">supabase.com</a> → Create project</li>
          <li>Go to Storage → Create bucket named <code className="bg-amber-100 px-1 rounded">course-videos</code> → Set to <strong>Private</strong></li>
          <li>Go to Settings → API → Copy keys to <code className="bg-amber-100 px-1 rounded">.env.local</code></li>
        </ol>
        <div className="mt-3 p-3 bg-white rounded-lg border border-amber-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">.env.local</p>
          <code className="text-xs text-slate-600 block">
            NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co<br/>
            NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key<br/>
            SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
          </code>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
          <FaCloudArrowUp className="text-[#00548B]" /> Upload New Lesson
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* Select Course */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Course *</label>
            <select
              value={uploadCourseId}
              onChange={(e) => setUploadCourseId(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
            >
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* Lesson Title */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Lesson Title *</label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
              placeholder="e.g. Introduction to React"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Duration</label>
            <input
              type="text"
              value={lessonDuration}
              onChange={(e) => setLessonDuration(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
              placeholder="e.g. 12:30"
            />
          </div>

          {/* Preview Toggle */}
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer p-2.5 bg-slate-50 border border-slate-200 rounded-xl w-full">
              <input
                type="checkbox"
                checked={isPreview}
                onChange={(e) => setIsPreview(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#00548B] focus:ring-[#00548B]"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">Free Preview</p>
                <p className="text-[10px] text-slate-400">Anyone can watch without paying</p>
              </div>
            </label>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Video File *</label>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`w-full p-6 border-2 border-dashed rounded-xl text-center transition-all ${
                uploadFile
                  ? "border-green-300 bg-green-50"
                  : "border-slate-200 bg-slate-50 hover:border-[#00548B]/30 hover:bg-[#00548B]/5"
              }`}
            >
              {uploadFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FaFileVideo className="text-green-600 text-xl" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-green-700">{uploadFile.name}</p>
                    <p className="text-xs text-green-500">{(uploadFile.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </div>
              ) : (
                <div>
                  <FaUpload className="text-slate-400 text-2xl mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-600">Click to select video</p>
                  <p className="text-xs text-slate-400 mt-1">MP4, WebM, OGG • Max 500MB</p>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
              <span>Uploading to Supabase...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00548B] rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !uploadFile || !uploadCourseId || !lessonTitle}
          className="bg-[#00548B] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#004381] transition-all disabled:opacity-50"
        >
          {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
          {uploading ? "Uploading..." : "Upload & Add Lesson"}
        </button>
      </div>

      {/* Course List with Lessons */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-slate-900">Courses & Lessons</h2>
          <div className="relative max-w-xs">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading courses...</div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <FaVideo className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No courses found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div key={course._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setSelectedCourse(selectedCourse?._id === course._id ? null : course)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{course.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{course.lessons?.length || 0} lessons</p>
                  </div>
                  <FaEye className={`text-slate-400 transition-transform ${selectedCourse?._id === course._id ? "rotate-90" : ""}`} />
                </button>

                {selectedCourse?._id === course._id && (
                  <div className="border-t border-slate-100 p-5">
                    {course.lessons?.length === 0 ? (
                      <p className="text-sm text-slate-400 text-center py-4">No lessons yet. Upload above!</p>
                    ) : (
                      <div className="space-y-2">
                        {course.lessons?.map((lesson, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-[#00548B]/10 flex items-center justify-center text-[#00548B] font-bold text-xs">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate">{lesson.title}</p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span>{lesson.duration || "N/A"}</span>
                                {lesson.isPreview && (
                                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">FREE PREVIEW</span>
                                )}
                                {!lesson.isPreview && (
                                  <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                                    <FaLock className="text-[8px]" /> PAID
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteLesson(course._id, i)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManager;
