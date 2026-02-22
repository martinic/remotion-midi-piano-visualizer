import React from 'react';
import { staticFile, Img, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

interface Props {
    logo: string;
    url?: string;
}

export const LogoOverlay: React.FC<Props> = ({ logo, url }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const isPortrait = height > width;

    // Fade in during the first 1.5 seconds
    const opacity = interpolate(frame, [0, fps * 1.5], [0, 1], {
        extrapolateRight: 'clamp',
    });

    // Gentle pulsing glow (cycles every 4 seconds)
    const pulse = Math.sin((frame / fps) * Math.PI * 0.5);
    const glowSize = interpolate(pulse, [-1, 1], [8, 28]);
    const glowOpacity = interpolate(pulse, [-1, 1], [0.4, 0.85]);

    const glowFilter = [
        `brightness(0) invert(1)`,
        `drop-shadow(0 0 ${glowSize}px rgba(0, 173, 255, ${glowOpacity}))`,
        `drop-shadow(0 0 ${glowSize * 0.4}px rgba(0, 173, 255, ${glowOpacity * 0.6}))`,
    ].join(' ');

    const textShadow = [
        `0 0 ${glowSize}px rgba(0, 173, 255, ${glowOpacity})`,
        `0 0 ${glowSize * 2}px rgba(0, 173, 255, ${glowOpacity * 0.4})`,
    ].join(', ');

    // Slight scale-in on appearance
    const scale = interpolate(frame, [0, fps * 1.5], [0.85, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
    });

    const containerStyle: React.CSSProperties = isPortrait
        ? {
              position: 'absolute',
              top: 50,
              left: '50%',
              transform: `translateX(-50%) scale(${scale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity,
          }
        : {
              position: 'absolute',
              top: 40,
              right: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity,
              transform: `scale(${scale})`,
          };

    return (
        <div style={containerStyle}>
            <Img
                src={staticFile(logo)}
                style={{
                    width: isPortrait ? 200 : 160,
                    filter: glowFilter,
                }}
            />
            {url && (
                <span
                    style={{
                        fontFamily: 'Roboto, sans-serif',
                        color: 'white',
                        fontSize: isPortrait ? 22 : 18,
                        marginTop: 8,
                        letterSpacing: 0.5,
                        textShadow,
                    }}
                >
                    {url}
                </span>
            )}
        </div>
    );
};
