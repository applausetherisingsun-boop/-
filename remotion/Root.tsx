import { Composition } from 'remotion';
import { ShortsVideo, ShortsVideoProps, SHORTS_TOTAL_FRAMES } from './compositions/ShortsVideo';
import { videos } from '../src/lib/videos';

// Default props for Remotion Studio preview
const defaultProps: ShortsVideoProps = {
  title: 'Why Natto Is the #1 Longevity Food',
  titleJa: '納豆が最強の長寿食である理由',
  description: 'Natto contains nattokinase — an enzyme that dissolves blood clots 4× more effectively than pharmaceuticals.',
  axis: 'inflammation',
  thumbnail: '🫘',
  tags: ['Natto', 'Nattokinase', 'Cardiovascular', 'VitaminK2'],
  points: [
    { icon: '🔬', text: 'Nattokinase dissolves clots 4× faster than pharmaceuticals' },
    { icon: '💊', text: 'Richest dietary source of Vitamin K2' },
    { icon: '📊', text: '60% lower cardiovascular mortality with daily natto' },
  ],
};

export function RemotionRoot() {
  return (
    <>
      {/* Default preview composition */}
      <Composition
        id="ShortsVideo"
        component={ShortsVideo}
        durationInFrames={SHORTS_TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* One composition per video for batch rendering */}
      {videos.map((video) => (
        <Composition
          key={video.id}
          id={`shorts-${video.id}`}
          component={ShortsVideo}
          durationInFrames={SHORTS_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            title: video.title,
            titleJa: video.titleJa,
            description: video.description,
            axis: video.axis,
            thumbnail: video.thumbnail,
            tags: video.tags.map((t) => t.replace(/\s+/g, '')),
            points: [
              { icon: '🔬', text: video.tags[0] ?? '' },
              { icon: '📖', text: video.tags[1] ?? '' },
              { icon: '✅', text: video.tags[2] ?? '' },
            ],
          } satisfies ShortsVideoProps}
        />
      ))}
    </>
  );
}
