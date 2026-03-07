'use client';

import { Player } from '@remotion/player';
import { ShortsVideo, ShortsVideoProps, SHORTS_TOTAL_FRAMES } from '../../../remotion/compositions/ShortsVideo';
import type { ShortVideo } from '@/lib/videos';

type Props = {
  video: ShortVideo;
  audioFile?: string;
};

function buildPoints(video: ShortVideo): ShortsVideoProps['points'] {
  return [
    { icon: '🔬', text: video.tags[0] ?? '' },
    { icon: '📖', text: video.tags[1] ?? '' },
    { icon: '✅', text: video.tags[2] ?? '' },
  ];
}

export default function RemotionPlayer({ video, audioFile }: Props) {
  const inputProps: ShortsVideoProps = {
    title: video.title,
    titleJa: video.titleJa,
    description: video.description,
    axis: video.axis,
    thumbnail: video.thumbnail,
    tags: video.tags.map((t) => t.replace(/\s+/g, '')),
    points: buildPoints(video),
    ...(audioFile ? { audioFile } : {}),
  };

  return (
    <div style={{ width: '100%', aspectRatio: '9/16', borderRadius: 16, overflow: 'hidden' }}>
      <Player
        component={ShortsVideo}
        inputProps={inputProps}
        durationInFrames={SHORTS_TOTAL_FRAMES}
        fps={30}
        compositionWidth={1080}
        compositionHeight={1920}
        style={{ width: '100%', height: '100%' }}
        controls
        loop
        autoPlay
      />
    </div>
  );
}
