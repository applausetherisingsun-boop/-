import { useCurrentFrame, interpolate, Easing } from 'remotion';

type TitleSceneProps = {
  title: string;
  titleJa: string;
  axisColor: string;
};

export function TitleScene({ title, titleJa, axisColor }: TitleSceneProps) {
  const frame = useCurrentFrame();

  const lineY = interpolate(frame, [0, 25], [60, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const lineOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  const jaY = interpolate(frame, [15, 40], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const jaOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });

  const dividerScale = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });

  // Split title into words for word-by-word animation
  const words = title.split(' ');

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: lineOpacity,
          transform: `translateY(${lineY}px)`,
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 58,
            fontWeight: 900,
            lineHeight: 1.15,
            fontFamily: 'serif',
          }}
        >
          {words.map((word, i) => {
            const wordOpacity = interpolate(frame, [i * 3, i * 3 + 15], [0, 1], {
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={i}
                style={{ opacity: wordOpacity, display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: `${dividerScale * 120}px`,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${axisColor}, transparent)`,
          marginBottom: 20,
        }}
      />

      {/* Japanese title */}
      <div
        style={{
          opacity: jaOpacity,
          transform: `translateY(${jaY}px)`,
          color: '#c9a96e',
          fontSize: 22,
          fontFamily: 'sans-serif',
          letterSpacing: 4,
          textAlign: 'center',
        }}
      >
        {titleJa}
      </div>
    </div>
  );
}
