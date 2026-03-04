import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  interpolate,
  useCurrentFrame,
} from 'remotion';
import { Intro } from './scenes/Intro';
import { TitleScene } from './scenes/TitleScene';
import { FactScene } from './scenes/FactScene';
import { OutroScene } from './scenes/OutroScene';
import { axisConfig, type AxisId } from '../../src/lib/videos';

export type ShortsVideoProps = {
  title: string;
  titleJa: string;
  description: string;
  axis: AxisId;
  thumbnail: string;
  tags: string[];
  points: Array<{ icon: string; text: string }>;
};

const FPS = 30;
const INTRO_DURATION   = FPS * 3;   // 0–3s
const TITLE_DURATION   = FPS * 5;   // 3–8s
const FACTS_DURATION   = FPS * 40;  // 8–48s
const OUTRO_DURATION   = FPS * 12;  // 48–60s

export const SHORTS_TOTAL_FRAMES = INTRO_DURATION + TITLE_DURATION + FACTS_DURATION + OUTRO_DURATION;

function Background({ axisColor, thumbnail }: { axisColor: string; thumbnail: string }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const hue = interpolate(frame, [0, durationInFrames], [0, 20]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${axisColor}18 0%, transparent 60%),
                     radial-gradient(ellipse at 70% 80%, ${axisColor}10 0%, transparent 60%),
                     #0f0f0d`,
      }}
    >
      {/* Watermark emoji */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${hue * 0.5}deg)`,
          fontSize: 600,
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {thumbnail}
      </div>
      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${axisColor}06 0px, ${axisColor}06 1px, transparent 1px, transparent 80px),
                            repeating-linear-gradient(90deg, ${axisColor}06 0px, ${axisColor}06 1px, transparent 1px, transparent 80px)`,
        }}
      />
    </AbsoluteFill>
  );
}

export function ShortsVideo({
  title,
  titleJa,
  description,
  axis,
  thumbnail,
  tags,
  points,
}: ShortsVideoProps) {
  const cfg = axisConfig[axis];

  return (
    <AbsoluteFill style={{ fontFamily: 'sans-serif' }}>
      {/* Background (always visible) */}
      <Background axisColor={cfg.color} thumbnail={thumbnail} />

      {/* Safe area padding indicator */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `3px solid ${cfg.color}15`,
          borderRadius: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Intro: 0 → INTRO_DURATION */}
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <AbsoluteFill>
          <Intro axisIcon={cfg.icon} axisLabel={cfg.label} axisColor={cfg.color} />
        </AbsoluteFill>
      </Sequence>

      {/* Title: INTRO_DURATION → +TITLE_DURATION */}
      <Sequence from={INTRO_DURATION} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill>
          <TitleScene title={title} titleJa={titleJa} axisColor={cfg.color} />
        </AbsoluteFill>
      </Sequence>

      {/* Facts: INTRO+TITLE → +FACTS_DURATION */}
      <Sequence from={INTRO_DURATION + TITLE_DURATION} durationInFrames={FACTS_DURATION}>
        <AbsoluteFill>
          <FactScene points={points} axisColor={cfg.color} description={description} />
        </AbsoluteFill>
      </Sequence>

      {/* Outro */}
      <Sequence from={INTRO_DURATION + TITLE_DURATION + FACTS_DURATION} durationInFrames={OUTRO_DURATION}>
        <AbsoluteFill>
          <OutroScene axisColor={cfg.color} tags={tags} />
        </AbsoluteFill>
      </Sequence>

      {/* Persistent top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${cfg.color}, #7a9e7e)`,
        }}
      />

      {/* Persistent bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `${cfg.color}40`,
        }}
      />
    </AbsoluteFill>
  );
}
