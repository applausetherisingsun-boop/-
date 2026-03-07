import ShortsFeed from '@/components/videos/ShortsFeed';
import { videos } from '@/lib/videos';

export const metadata = {
  title: 'SHIROKUMA Shorts — Longevity Science in 60 Seconds',
  description: 'Short-form videos on Japanese longevity science. Inflammation, gut microbiome, neural health, metabolism, hormones, and ikigai — explained in under 90 seconds.',
};

export default function VideosPage() {
  return (
    <div className="fixed inset-0 bg-black z-40">
      <ShortsFeed videos={videos} />
    </div>
  );
}
