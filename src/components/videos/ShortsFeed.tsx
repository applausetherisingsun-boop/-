'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Heart, Share2, ChevronUp, ChevronDown, Play, Pause, Volume2, VolumeX, Info, Check } from 'lucide-react';
import { ShortVideo, axisConfig, formatViews } from '@/lib/videos';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ShortsCardProps = {
  video: ShortVideo;
  isActive: boolean;
  onLike: (id: string) => void;
  liked: boolean;
};

function ShortsCard({ video, isActive, onLike, liked }: ShortsCardProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shared, setShared] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const axis = axisConfig[video.axis];

  // Parse duration string like "0:58" → seconds
  const durationSeconds = (() => {
    const [m, s] = video.duration.split(':').map(Number);
    return (m || 0) * 60 + (s || 58);
  })();

  useEffect(() => {
    if (!isActive) {
      setPlaying(false);
      setProgress(0);
    }
  }, [isActive]);

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    if (playing) {
      const tick = 200; // ms
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { clearInterval(progressRef.current!); setPlaying(false); return 0; }
          return p + (tick / (durationSeconds * 1000)) * 100;
        });
      }, tick);
    }
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [playing, durationSeconds]);

  const togglePlay = () => setPlaying((p) => !p);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/videos/${video.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {}
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black select-none">
      {/* Video area */}
      <div
        className="relative w-full max-w-[420px] h-full overflow-hidden"
        onClick={togglePlay}
        style={{ cursor: 'pointer' }}
      >
        {/* Background gradient thumbnail */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${video.gradient} transition-opacity duration-500`}
          style={{ backgroundColor: '#1a1a18' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Main thumbnail emoji */}
          <div
            className="text-[120px] mb-6 transition-transform duration-300"
            style={{
              filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))',
              transform: playing ? 'scale(0.85)' : 'scale(1)',
            }}
          >
            {video.thumbnail}
          </div>
          {/* Animated bars (fake waveform when playing) */}
          {playing && (
            <div className="flex items-end gap-1 h-8">
              {[4, 7, 5, 9, 6, 8, 4, 7, 5, 6].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-[#c9a96e]/80"
                  style={{
                    height: `${h * 3}px`,
                    animation: `barPulse ${0.4 + i * 0.07}s ease-in-out infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
          <div
            className="h-full bg-[#c9a96e] transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Play/Pause indicator */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
          {/* Axis badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold mb-3"
            style={{ backgroundColor: `${axis.color}25`, color: axis.color, border: `1px solid ${axis.color}40` }}
          >
            <span>{axis.icon}</span>
            <span>{axis.label}</span>
            <span className="opacity-60">/ {axis.ja}</span>
          </div>

          {/* Title */}
          <h2 className="text-white font-bold text-base leading-snug mb-1 drop-shadow-lg">
            {video.title}
          </h2>
          <p className="text-white/60 text-[10px] font-sans tracking-widest mb-2">
            {video.titleJa}
          </p>

          {/* Description */}
          <div className="pointer-events-auto">
            <p
              className={`text-white/80 text-xs font-sans leading-relaxed transition-all duration-300 ${
                expanded ? '' : 'line-clamp-2'
              }`}
            >
              {video.description}
            </p>
            <button
              className="text-[#c9a96e] text-xs font-sans mt-1"
              onClick={(e) => { e.stopPropagation(); setExpanded((x) => !x); }}
            >
              {expanded ? 'Show less' : 'more'}
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {video.tags.map((tag) => (
              <span key={tag} className="text-white/50 text-[10px] font-sans">
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-3">
            <span className="text-white/40 text-xs font-sans">{video.duration}</span>
            <span className="text-white/40 text-xs font-sans">{formatViews(video.views)} views</span>
          </div>
        </div>
      </div>

      {/* Right action buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-10">
        {/* Like */}
        <button
          className="flex flex-col items-center gap-1"
          onClick={(e) => { e.stopPropagation(); onLike(video.id); }}
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
              liked ? 'bg-red-500/80 scale-110' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Heart
              size={20}
              className={liked ? 'text-white' : 'text-white'}
              fill={liked ? 'white' : 'none'}
            />
          </div>
          <span className="text-white/70 text-[10px] font-sans">
            {formatViews(video.likes + (liked ? 1 : 0))}
          </span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1" onClick={handleShare}>
          <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            {shared
              ? <Check size={18} className="text-[#c9a96e]" />
              : <Share2 size={18} className="text-white" />
            }
          </div>
          <span className="text-white/70 text-[10px] font-sans">{shared ? 'Copied!' : 'Share'}</span>
        </button>

        {/* Detail link */}
        <Link
          href={`/videos/${video.id}`}
          className="flex flex-col items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <Info size={18} className="text-white" />
          </div>
          <span className="text-white/70 text-[10px] font-sans">詳細</span>
        </Link>

        {/* Sound toggle */}
        <button
          className="flex flex-col items-center gap-1"
          onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
        >
          <div className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            {muted
              ? <VolumeX size={18} className="text-white/50" />
              : <Volume2 size={18} className="text-white" />
            }
          </div>
        </button>

        {/* SHIROKUMA logo */}
        <Link href="/" className="mt-2" onClick={(e) => e.stopPropagation()}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#7a9e7e] flex items-center justify-center shadow-lg ring-2 ring-white/20">
            <span className="text-white font-bold text-sm">白</span>
          </div>
        </Link>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <Link href="/videos" onClick={(e) => e.stopPropagation()}>
          <span className="text-white/80 text-sm font-bold font-sans tracking-widest">SHIROKUMA</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            {playing
              ? <Pause size={14} className="text-white" />
              : <Play size={14} className="text-white ml-0.5" fill="white" />
            }
          </button>
        </div>
      </div>
    </div>
  );
}

type ShortsFeedProps = {
  videos: ShortVideo[];
};

export default function ShortsFeed({ videos }: ShortsFeedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const scrollToIndex = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, videos.length - 1));
    setActiveIndex(clamped);
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: clamped * window.innerHeight, behavior: 'smooth' });
  }, [videos.length]);

  // Snap on scroll end
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const idx = Math.round(container.scrollTop / window.innerHeight);
        setActiveIndex(idx);
        isScrollingRef.current = false;
      }, 100);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => { container.removeEventListener('scroll', handleScroll); clearTimeout(timeout); };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') scrollToIndex(activeIndex + 1);
      if (e.key === 'ArrowUp' || e.key === 'k') scrollToIndex(activeIndex - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, scrollToIndex]);

  const handleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Scrollable feed */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video, i) => (
          <div
            key={video.id}
            className="w-full snap-start snap-always"
            style={{ height: '100dvh' }}
          >
            <ShortsCard
              video={video}
              isActive={i === activeIndex}
              onLike={handleLike}
              liked={likedIds.has(video.id)}
            />
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20">
        {videos.map((_, i) => (
          <button
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-1.5 h-5 bg-[#c9a96e]'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-16 bottom-8 flex gap-3 z-20">
        <button
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-30"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          <ChevronUp size={20} className="text-white" />
        </button>
        <button
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-30"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === videos.length - 1}
        >
          <ChevronDown size={20} className="text-white" />
        </button>
      </div>

      {/* Video counter */}
      <div className="absolute top-4 right-4 z-20">
        <span className="text-white/40 text-xs font-sans">
          {activeIndex + 1} / {videos.length}
        </span>
      </div>

      <style jsx global>{`
        @keyframes barPulse {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.0); }
        }
      `}</style>
    </div>
  );
}
