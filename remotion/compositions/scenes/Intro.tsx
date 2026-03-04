import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

type IntroProps = {
  axisIcon: string;
  axisLabel: string;
  axisColor: string;
};

export function Intro({ axisIcon, axisLabel, axisColor }: IntroProps) {
  const frame = useCurrentFrame();

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const logoScale = interpolate(frame, [0, 20], [0.7, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const badgeOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' });
  const badgeY = interpolate(frame, [15, 35], [12, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

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
        gap: 24,
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a96e, #7a9e7e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          白
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 12,
            fontFamily: 'sans-serif',
          }}
        >
          SHIROKUMA
        </div>
        <div
          style={{
            color: '#c9a96e',
            fontSize: 14,
            letterSpacing: 6,
            fontFamily: 'sans-serif',
          }}
        >
          LONGEVITY SCIENCE
        </div>
      </div>

      {/* Axis badge */}
      <div
        style={{
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
          background: `${axisColor}25`,
          border: `2px solid ${axisColor}60`,
          borderRadius: 40,
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontFamily: 'sans-serif',
        }}
      >
        <span style={{ fontSize: 24 }}>{axisIcon}</span>
        <span style={{ color: axisColor, fontSize: 18, fontWeight: 700 }}>{axisLabel}</span>
      </div>
    </div>
  );
}
