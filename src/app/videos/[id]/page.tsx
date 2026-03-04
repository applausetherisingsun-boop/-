import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, ChevronRight, Download } from 'lucide-react';
import { getVideoById, getRelatedVideos, axisConfig, formatViews, videos } from '@/lib/videos';
import VideoPlayerClient from '@/components/videos/VideoPlayerClient';

export async function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = getVideoById(id);
  if (!video) return {};
  return {
    title: `${video.title} — SHIROKUMA Shorts`,
    description: video.description,
  };
}

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = getVideoById(id);
  if (!video) notFound();

  const axis = axisConfig[video.axis];
  const related = getRelatedVideos(id, 4);

  return (
    <div className="min-h-screen bg-[#0f0f0d] text-white">
      {/* Back nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0d]/90 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <Link href="/videos" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-sans">
          <ArrowLeft size={16} />
          <span>Shorts</span>
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white/80 text-sm font-sans truncate">{video.title}</span>
      </div>

      <div className="pt-14 max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Player */}
          <div className="lg:col-span-2">
            {/* Remotion Player */}
            <div className="w-full max-w-sm mx-auto lg:mx-0">
              <VideoPlayerClient video={video} />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-4 max-w-sm mx-auto lg:mx-0 flex-wrap">
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-full text-sm font-sans transition-colors">
                <Heart size={16} className="text-white" />
                <span>{formatViews(video.likes)}</span>
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-full text-sm font-sans transition-colors">
                <Share2 size={16} className="text-white" />
                <span>Share</span>
              </button>
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold"
                style={{ backgroundColor: `${axis.color}25`, color: axis.color, border: `1px solid ${axis.color}40` }}
              >
                {axis.icon} {axis.label}
              </div>
              <div className="ml-auto flex items-center gap-2 text-white/30 text-xs font-sans">
                <Download size={12} />
                <span>npx remotion render shorts-{video.id}</span>
              </div>
            </div>

            {/* Title & description */}
            <div className="mt-6">
              <h1 className="text-xl font-bold leading-tight mb-1">{video.title}</h1>
              <p className="text-white/40 text-sm font-sans tracking-widest mb-4">{video.titleJa}</p>

              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold mb-4"
                style={{ backgroundColor: `${axis.color}20`, color: axis.color }}
              >
                {axis.icon} {axis.label} / {axis.ja}
              </div>

              <p className="text-white/70 text-sm font-sans leading-relaxed mb-4">{video.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-sans px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Transcript */}
            <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[#c9a96e] text-xs font-sans tracking-widest uppercase mb-3 font-semibold">
                Script / 台本
              </p>
              <p className="text-white/60 text-sm font-sans leading-relaxed">{video.transcript}</p>
            </div>
          </div>

          {/* Right: Related */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Related Shorts</h3>
              <Link href="/videos" className="text-[#c9a96e] text-xs font-sans flex items-center gap-1">
                See all <ChevronRight size={12} />
              </Link>
            </div>

            <div className="space-y-4">
              {related.map((v) => {
                const relAxis = axisConfig[v.axis];
                return (
                  <Link
                    key={v.id}
                    href={`/videos/${v.id}`}
                    className="flex gap-3 group"
                  >
                    {/* Mini thumbnail */}
                    <div
                      className={`flex-shrink-0 w-20 h-[112px] rounded-xl overflow-hidden relative bg-gradient-to-br ${v.gradient} flex items-center justify-center`}
                    >
                      <span className="text-3xl">{v.thumbnail}</span>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <span className="absolute bottom-1.5 right-1.5 text-white/80 text-[9px] font-sans bg-black/50 px-1 rounded">
                        {v.duration}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold leading-tight mb-1 group-hover:text-[#c9a96e] transition-colors line-clamp-2">
                        {v.title}
                      </p>
                      <p
                        className="text-xs font-sans mb-1"
                        style={{ color: relAxis.color }}
                      >
                        {relAxis.icon} {relAxis.label}
                      </p>
                      <p className="text-white/40 text-xs font-sans">{formatViews(v.views)} views</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* All videos CTA */}
            <Link
              href="/videos"
              className="mt-6 block w-full text-center py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-[#c9a96e]/40 text-sm font-sans transition-all"
            >
              Open Shorts Feed →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
