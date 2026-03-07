import { useCurrentFrame, interpolate, Easing } from 'remotion';

type OutroSceneProps = {
  axisColor: string;
  tags: string[];
};

export function OutroScene({ axisColor, tags }: OutroSceneProps) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 20], [0.9, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const ctaOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [20, 40], [20, 0], {
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
        padding: '0 64px',
        gap: 40,
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a96e, #7a9e7e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          白
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 10,
            fontFamily: 'sans-serif',
          }}
        >
          SHIROKUMA
        </div>
        <div
          style={{
            color: '#9a9a7a',
            fontSize: 13,
            letterSpacing: 4,
            fontFamily: 'sans-serif',
          }}
        >
          drshirokuma.online
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            background: axisColor,
            color: '#1a1a18',
            borderRadius: 50,
            padding: '18px 48px',
            fontSize: 24,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            letterSpacing: 2,
          }}
        >
          Free 6-Axis Diagnosis →
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 16,
            fontFamily: 'sans-serif',
            letterSpacing: 2,
          }}
        >
          無料診断 · 5分 · 登録不要
        </div>
      </div>

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          opacity: ctaOpacity,
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              color: 'rgba(255,255,255,0.35)',
              fontSize: 16,
              fontFamily: 'sans-serif',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
