import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import { axisConfig, type AxisId } from '../../src/lib/videos';

export type Caption = { word: string; start: number; end: number };

export type ShortsVideoProps = {
  title: string;
  titleJa: string;
  description: string;
  axis: AxisId;
  thumbnail: string;
  tags: string[];
  points: Array<{ icon: string; text: string }>;
  transcript?: string;
  audioFile?: string;   // e.g. "audio/natto-nattokinase.mp3" (relative to public/)
  captions?: Caption[]; // Whisper word timestamps → カラオケ同期
};

const FPS = 30;
const HOOK_FRAMES    = FPS * 3;   //  0– 3s  stat hook
const TITLE_FRAMES   = FPS * 5;   //  3– 8s  title
const FACTS_FRAMES   = FPS * 38;  //  8–46s  key points
const CAPTION_FRAMES = FPS * 10;  // 46–56s  caption summary
const OUTRO_FRAMES   = FPS * 4;   // 56–60s  CTA

export const SHORTS_TOTAL_FRAMES =
  HOOK_FRAMES + TITLE_FRAMES + FACTS_FRAMES + CAPTION_FRAMES + OUTRO_FRAMES;

// ── Background ──────────────────────────────────────────────────────────────
function Background({ axisColor, thumbnail }: { axisColor: string; thumbnail: string }) {
  const frame = useCurrentFrame();
  const slow = frame * 0.003;
  return (
    <AbsoluteFill style={{ background: '#0a0a08' }}>
      {/* Animated radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at ${50 + Math.sin(slow) * 15}% ${40 + Math.cos(slow) * 10}%,
          ${axisColor}22 0%, transparent 55%),
          radial-gradient(ellipse at ${50 - Math.sin(slow) * 15}% ${70 + Math.cos(slow) * 10}%,
          ${axisColor}12 0%, transparent 50%)`,
      }} />
      {/* Big emoji watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) rotate(${slow * 20}deg) scale(${1 + Math.sin(slow * 2) * 0.03})`,
        fontSize: 700, opacity: 0.04, pointerEvents: 'none',
      }}>
        {thumbnail}
      </div>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg,${axisColor}07 0,${axisColor}07 1px,transparent 1px,transparent 72px),
          repeating-linear-gradient(90deg,${axisColor}07 0,${axisColor}07 1px,transparent 1px,transparent 72px)`,
      }} />
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 6,
        background: `linear-gradient(90deg, ${axisColor}, #7a9e7e, ${axisColor})`,
      }} />
    </AbsoluteFill>
  );
}

// ── Hook Scene (0–3s): Big shocking stat ────────────────────────────────────
function HookScene({ description, axisColor, thumbnail }:
  { description: string; axisColor: string; thumbnail: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const emojiScale = spring({ frame, fps, config: { damping: 12, stiffness: 200 } });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [15, 30], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Extract first sentence as the hook
  const hook = description.split('.')[0] + '.';

  return (
    <AbsoluteFill style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 72px', gap: 48,
    }}>
      <div style={{ transform: `scale(${emojiScale})`, fontSize: 160,
        filter: 'drop-shadow(0 12px 40px rgba(0,0,0,0.6))' }}>
        {thumbnail}
      </div>
      <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, textAlign: 'center' }}>
        <p style={{
          color: 'white', fontSize: 48, fontWeight: 900, lineHeight: 1.3,
          fontFamily: 'sans-serif', textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}>
          {hook}
        </p>
      </div>
      {/* Axis chip */}
      <div style={{ opacity: textOpacity, display: 'flex', alignItems: 'center', gap: 8,
        background: `${axisColor}25`, border: `2px solid ${axisColor}50`,
        borderRadius: 40, padding: '10px 28px' }}>
        <span style={{ color: axisColor, fontSize: 20, fontWeight: 700, fontFamily: 'sans-serif',
          letterSpacing: 3 }}>SHIROKUMA SCIENCE</span>
      </div>
    </AbsoluteFill>
  );
}

// ── Title Scene (3–8s) ───────────────────────────────────────────────────────
function TitleScene({ title, titleJa, axisColor }:
  { title: string; titleJa: string; axisColor: string }) {
  const frame = useCurrentFrame();
  const words = title.split(' ');

  return (
    <AbsoluteFill style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 64px', gap: 28,
    }}>
      {/* Title words animate in one by one */}
      <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
        {words.map((word, i) => {
          const wordOpacity = interpolate(frame, [i * 4, i * 4 + 16], [0, 1], { extrapolateRight: 'clamp' });
          const wordY = interpolate(frame, [i * 4, i * 4 + 16], [24, 0], {
            extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
          });
          return (
            <span key={i} style={{
              opacity: wordOpacity, transform: `translateY(${wordY}px)`,
              display: 'inline-block', marginRight: '0.25em',
              color: 'white', fontSize: 66, fontWeight: 900,
              fontFamily: 'sans-serif', textShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}>
              {word}
            </span>
          );
        })}
      </div>
      {/* Animated divider */}
      <div style={{
        width: `${interpolate(frame, [20, 45], [0, 160], { extrapolateRight: 'clamp' })}px`,
        height: 4, borderRadius: 2,
        background: `linear-gradient(90deg, transparent, ${axisColor}, transparent)`,
      }} />
      {/* Japanese */}
      <p style={{
        opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' }),
        color: '#c9a96e', fontSize: 26, fontFamily: 'sans-serif',
        letterSpacing: 5, textAlign: 'center',
      }}>
        {titleJa}
      </p>
    </AbsoluteFill>
  );
}

// ── Facts Scene (8–46s): 3 key points ───────────────────────────────────────
function FactsScene({ points, description, axisColor }:
  { points: Array<{ icon: string; text: string }>; description: string; axisColor: string }) {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '60px 64px', gap: 40,
    }}>
      {/* Description */}
      <div style={{
        opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        transform: `translateY(${interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' })}px)`,
        borderLeft: `5px solid ${axisColor}`,
        paddingLeft: 28, marginBottom: 8,
      }}>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 32, lineHeight: 1.55,
          fontFamily: 'sans-serif', fontWeight: 500 }}>
          {description}
        </p>
      </div>

      {/* 3 key points */}
      {points.map((pt, i) => {
        const startF = 25 + i * 22;
        const opacity = interpolate(frame, [startF, startF + 18], [0, 1], { extrapolateRight: 'clamp' });
        const x = interpolate(frame, [startF, startF + 18], [-50, 0], {
          extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
        });
        return (
          <div key={i} style={{
            opacity, transform: `translateX(${x}px)`,
            display: 'flex', alignItems: 'center', gap: 24,
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${axisColor}35`, borderRadius: 24, padding: '22px 28px',
          }}>
            <span style={{ fontSize: 52, flexShrink: 0 }}>{pt.icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 30,
              lineHeight: 1.4, fontFamily: 'sans-serif', fontWeight: 600 }}>
              {pt.text}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

// ── Caption Scene (46–56s): scrolling transcript ─────────────────────────────
function CaptionScene({ transcript, axisColor }:
  { transcript: string; axisColor: string }) {
  const frame = useCurrentFrame();

  // Split into 3-word chunks for karaoke feel
  const words = (transcript || '').split(' ');
  const chunkSize = 4;
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }
  const fps = 30;
  const chunkDuration = Math.max(3, Math.floor((CAPTION_FRAMES * 0.9) / chunks.length));
  const activeChunk = Math.min(Math.floor(frame / chunkDuration), chunks.length - 1);

  const containerOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 72px', gap: 40, opacity: containerOpacity,
    }}>
      {/* Active caption word */}
      <div style={{
        textAlign: 'center', minHeight: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{
          color: 'white', fontSize: 64, fontWeight: 900, lineHeight: 1.3,
          fontFamily: 'sans-serif', textAlign: 'center',
          textShadow: `0 0 40px ${axisColor}60`,
        }}>
          {chunks[activeChunk] ?? ''}
        </p>
      </div>
      {/* Progress bar */}
      <div style={{
        width: '100%', height: 4, background: 'rgba(255,255,255,0.1)',
        borderRadius: 2, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', background: axisColor, borderRadius: 2,
          width: `${(frame / CAPTION_FRAMES) * 100}%`,
        }} />
      </div>
    </AbsoluteFill>
  );
}

// ── Outro Scene (56–60s) ─────────────────────────────────────────────────────
function OutroScene({ axisColor, tags }: { axisColor: string; tags: string[] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 180 } });
  const ctaOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 40,
    }}>
      {/* Logo */}
      <div style={{ transform: `scale(${scale})`, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(135deg, #c9a96e, #7a9e7e)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 52, fontWeight: 900, color: 'white',
          boxShadow: `0 0 60px ${axisColor}40`,
        }}>白</div>
        <p style={{ color: 'white', fontSize: 30, fontWeight: 900, letterSpacing: 12,
          fontFamily: 'sans-serif' }}>SHIROKUMA</p>
        <p style={{ color: '#9a9a7a', fontSize: 16, letterSpacing: 4,
          fontFamily: 'sans-serif' }}>drshirokuma.online</p>
      </div>

      {/* CTA button */}
      <div style={{ opacity: ctaOpacity, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 16 }}>
        <div style={{
          background: axisColor, color: '#0a0a08', borderRadius: 60,
          padding: '20px 56px', fontSize: 28, fontWeight: 900,
          fontFamily: 'sans-serif', letterSpacing: 1,
        }}>
          無料診断 → drshirokuma.online
        </div>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 18,
          fontFamily: 'sans-serif' }}>
          {tags.slice(0, 3).map((t) => `#${t}`).join('  ')}
        </p>
      </div>
    </AbsoluteFill>
  );
}

// ── Karaoke Overlay (全シーンに重なる字幕、Whisperタイムスタンプが必要) ────────
function KaraokeOverlay({ captions, axisColor }: { captions: Caption[]; axisColor: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioTime = frame / fps;

  // 現在再生中の単語インデックスを検索
  const activeIdx = (() => {
    for (let i = captions.length - 1; i >= 0; i--) {
      if (audioTime >= captions[i].start) return i;
    }
    return -1;
  })();

  // 音声が始まっていないか終了後は非表示
  if (activeIdx === -1 || audioTime > (captions[captions.length - 1]?.end ?? 0) + 0.5) {
    return null;
  }

  // 4単語1ラインで区切り、現在のラインを表示
  const LINE_SIZE = 4;
  const lineStart = Math.floor(activeIdx / LINE_SIZE) * LINE_SIZE;
  const lineWords = captions.slice(lineStart, lineStart + LINE_SIZE);

  // ライン切り替わり時のフェード
  const firstWordStart = captions[lineStart]?.start ?? 0;
  const fadeIn = interpolate(audioTime, [firstWordStart, firstWordStart + 0.15], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      paddingBottom: 260, pointerEvents: 'none', opacity: fadeIn,
    }}>
      {/* 背景ブラー帯 */}
      <div style={{
        position: 'absolute', bottom: 220, left: 40, right: 40,
        height: 100, borderRadius: 20,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
      }} />
      {/* 単語テキスト */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '0 56px', zIndex: 1 }}>
        {lineWords.map((c, i) => {
          const isActive = lineStart + i === activeIdx;
          // 発音中の単語は少し拡大
          const wordScale = isActive
            ? interpolate(audioTime, [c.start, c.start + 0.08], [0.95, 1.05], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              })
            : 1;
          return (
            <span
              key={`${lineStart}-${i}`}
              style={{
                display: 'inline-block',
                fontSize: 52,
                fontWeight: 900,
                fontFamily: 'sans-serif',
                marginRight: '0.22em',
                color: isActive ? axisColor : 'rgba(255,255,255,0.75)',
                textShadow: isActive
                  ? `0 0 24px ${axisColor}80, 0 2px 8px rgba(0,0,0,0.9)`
                  : '0 2px 8px rgba(0,0,0,0.9)',
                transform: `scale(${wordScale})`,
                transformOrigin: 'center bottom',
                transition: 'color 0.08s ease, text-shadow 0.08s ease',
              }}
            >
              {c.word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// ── Main composition ─────────────────────────────────────────────────────────
export function ShortsVideo({
  title, titleJa, description, axis, thumbnail, tags, points, transcript, audioFile, captions,
}: ShortsVideoProps) {
  const cfg = axisConfig[axis];

  return (
    <AbsoluteFill>
      <Background axisColor={cfg.color} thumbnail={thumbnail} />

      {/* Optional TTS audio */}
      {audioFile && (
        <Audio src={staticFile(audioFile)} startFrom={0} />
      )}

      <Sequence from={0} durationInFrames={HOOK_FRAMES}>
        <HookScene description={description} axisColor={cfg.color} thumbnail={thumbnail} />
      </Sequence>

      <Sequence from={HOOK_FRAMES} durationInFrames={TITLE_FRAMES}>
        <TitleScene title={title} titleJa={titleJa} axisColor={cfg.color} />
      </Sequence>

      <Sequence from={HOOK_FRAMES + TITLE_FRAMES} durationInFrames={FACTS_FRAMES}>
        <FactsScene points={points} description={description} axisColor={cfg.color} />
      </Sequence>

      <Sequence from={HOOK_FRAMES + TITLE_FRAMES + FACTS_FRAMES} durationInFrames={CAPTION_FRAMES}>
        <CaptionScene transcript={transcript ?? description} axisColor={cfg.color} />
      </Sequence>

      <Sequence from={HOOK_FRAMES + TITLE_FRAMES + FACTS_FRAMES + CAPTION_FRAMES}
        durationInFrames={OUTRO_FRAMES}>
        <OutroScene axisColor={cfg.color} tags={tags} />
      </Sequence>

      {/* Whisperタイムスタンプがある場合のみ全画面カラオケ字幕を表示 */}
      {captions && captions.length > 0 && (
        <KaraokeOverlay captions={captions} axisColor={cfg.color} />
      )}
    </AbsoluteFill>
  );
}
