import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { useTitleInfo } from './useTitleInfo';
import { useTranslate } from './useTranslate';

export const TitleScene: React.FC = () => {
    const { title, author, midiCreator } = useTitleInfo();
    const { width, height, fps } = useVideoConfig();
    const isPortrait = height > width;
    const marginBottom = width * 0.1;

    const translateX = useTranslate({ from: isPortrait ? 200 : 400, to: isPortrait ? -500 : -900, startAtFrame: fps });
    const translateY = useTranslate({ from: isPortrait ? 400 : 200, to: isPortrait ? -800 : -500, startAtFrame: fps });
    const scale = useTranslate({ from: 1, to: 0.5, startAtFrame: fps * 0.95 });

    return (
        <AbsoluteFill
            style={{
                paddingBottom: marginBottom,
                transform: `scale(${scale})`,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    left: translateX,
                    top: translateY,
                    width: '100%',
                    height: '100%',
                }}
            >
                <h1
                    style={{
                        fontFamily: THEME.fonts.roboto,
                        color: 'white',
                        fontSize: isPortrait ? 48 : 60,
                    }}
                >
                    {title}
                </h1>
                {author && (
                    <h2
                        style={{
                            fontFamily: THEME.fonts.roboto,
                            color: 'white',
                            fontSize: isPortrait ? 36 : 44,
                        }}
                    >
                        {author}
                    </h2>
                )}
                {midiCreator && (
                    <h3
                        style={{
                            fontFamily: THEME.fonts.roboto,
                            color: 'white',
                            fontSize: isPortrait ? 22 : 28,
                        }}
                    >
                        {`Midi file by ${midiCreator}`}
                    </h3>
                )}
            </div>
        </AbsoluteFill>
    );
};
