'use client';
import { useState } from 'react';

interface Props {
  videoId: string;
  title?: string;
}

export default function YouTubeLazy({ videoId, title = 'YouTube video' }: Props) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className="relative w-full h-full bg-black flex items-center justify-center group cursor-pointer border-0 p-0"
        aria-label={title}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-[#4a68a9] ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
    );
  }

  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    />
  );
}
