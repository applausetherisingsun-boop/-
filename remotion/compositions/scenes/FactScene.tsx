import { useCurrentFrame, interpolate, Easing } from 'remotion';

type FactPoint = {
  icon: string;
  text: string;
};

type FactSceneProps = {
  points: FactPoint[];
  axisColor: string;
  description: string;
};

export function FactScene({ points, axisColor, description }: FactSceneProps) {
  const frame = useCurrentFrame();

  const descOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const descY = interpolate(frame, [0, 20], [20, 0], {
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
        justifyContent: 'center',
        padding: '0 64px',
        gap: 48,
      }}
    >
      {/* Description */}
      <div
        style={{
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
          color: 'rgba(255,255,255,0.85)',
          fontSize: 30,
          lineHeight: 1.6,
          fontFamily: 'sans-serif',
          textAlign: 'center',
          borderLeft: `4px solid ${axisColor}`,
          paddingLeft: 32,
          textAlign: 'left',
        }}
      >
        {description}
      </div>

      {/* Key points */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {points.map((point, i) => {
          const pOpacity = interpolate(frame, [20 + i * 20, 40 + i * 20], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const pX = interpolate(frame, [20 + i * 20, 40 + i * 20], [-40, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                opacity: pOpacity,
                transform: `translateX(${pX}px)`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 20,
                padding: '20px 24px',
                border: `1px solid ${axisColor}30`,
              }}
            >
              <span style={{ fontSize: 40, lineHeight: 1 }}>{point.icon}</span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 26,
                  lineHeight: 1.4,
                  fontFamily: 'sans-serif',
                  fontWeight: 500,
                }}
              >
                {point.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
