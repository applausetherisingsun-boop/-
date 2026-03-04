'use client';

import dynamic from 'next/dynamic';
import type { ShortVideo } from '@/lib/videos';

const RemotionPlayer = dynamic(() => import('@/components/videos/RemotionPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[9/16] rounded-2xl bg-[#1a1a18] flex items-center justify-center">
      <div className="text-white/30 text-sm font-sans">Loading player...</div>
    </div>
  ),
});

export default function VideoPlayerClient({ video }: { video: ShortVideo }) {
  return <RemotionPlayer video={video} />;
}
