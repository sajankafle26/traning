"use client";
import React, { useEffect, useState } from "react";
import {
  FaImage, FaVideo, FaPlay, FaTimes, FaExpand, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import axios from "axios";

interface GalleryItem {
  _id: string;
  type: "image" | "video";
  src: string;
  thumb: string;
  title: string;
  category: string;
}

const Gallery = () => {
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/gallery").then(res => {
      const data = res.data;
      if (data && data.length > 0) {
        setItems(data.map((item: any) => ({
          _id: item._id,
          type: item.type,
          src: item.type === "video" ? convertToEmbed(item.src) : item.src,
          thumb: item.thumb || (item.type === "video" ? getYouTubeThumb(item.src) : item.src),
          title: item.title,
          category: item.category,
        })));
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const convertToEmbed = (url: string): string => {
    if (url.includes("/embed/")) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?#]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const getYouTubeThumb = (url: string): string => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?#]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : url;
  };

  const filtered = filter === "all" ? items : items.filter(i => i.type === filter);

  const openLightbox = (item: GalleryItem) => {
    setLightbox(item);
    setLightboxIndex(filtered.findIndex(i => i._id === item._id));
  };

  const navigate = (dir: number) => {
    const next = lightboxIndex + dir;
    if (next >= 0 && next < filtered.length) {
      setLightboxIndex(next);
      setLightbox(filtered[next]);
    }
  };

  if (!loading && items.length === 0) return null;

  return (
    <>
      <section className="py-16 px-6 bg-gradient-to-b from-[#f8fbff] via-white to-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00548B]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
              <FaImage className="text-xs" /> Gallery
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[0.95]">
              Our <span className="text-[#00548B]">Gallery</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Highlights from our training sessions, events, and student achievements
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-3 mb-12">
            {[
              { key: "all" as const, label: "All", icon: FaExpand },
              { key: "image" as const, label: "Photos", icon: FaImage },
              { key: "video" as const, label: "Videos", icon: FaVideo },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  filter === key
                    ? "bg-[#00548B] text-white shadow-lg shadow-[#00548B]/20"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-[#00548B]/20 hover:text-[#00548B]"
                }`}
              >
                <Icon className="text-xs" />
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] bg-slate-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((item) => (
              <div
                key={item._id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-[#00548B]/10 transition-all duration-500 hover:-translate-y-1"
                onClick={() => openLightbox(item)}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Video Play Button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className="text-[#00548B] text-lg ml-1" />
                    </div>
                  </div>
                )}

                {/* Image Expand Icon */}
                {item.type === "image" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <FaExpand className="text-[#00548B] text-sm" />
                    </div>
                  </div>
                )}

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-sm">{item.title}</h3>
                      <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                    </div>
                    {item.type === "video" && (
                      <span className="px-2.5 py-1 bg-red-500 text-white text-[9px] font-black rounded-full">VIDEO</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-50"
          >
            <FaTimes className="text-lg" />
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-50"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Next */}
          {lightboxIndex < filtered.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-50"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Content */}
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "video" ? (
              <div className="aspect-video w-full rounded-2xl overflow-hidden">
                <iframe
                  src={lightbox.src}
                  className="w-full h-full"
                  allowFullScreen
                  title={lightbox.title}
                />
              </div>
            ) : (
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
            )}
            <div className="text-center mt-4">
              <h3 className="text-white font-bold text-lg">{lightbox.title}</h3>
              <span className="text-white/50 text-xs font-bold uppercase tracking-widest">{lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
