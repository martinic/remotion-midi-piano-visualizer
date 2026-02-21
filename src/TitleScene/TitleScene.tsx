import React from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import { THEME } from '../theme';
import { useTitleInfo } from './useTitleInfo';
import { useTranslate } from './useTranslate';

export const TitleScene: React.FC = () => {
    const { title, author, midiCreator } = useTitleInfo();
    const { width, fps } = useVideoConfig();
    const marginBottom = width * 0.1;

    const translateX = useTranslate({ from: 400, to: -900, startAtFrame: fps });
    const translateY = useTranslate({ from: 200, to: -500, startAtFrame: fps });
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
                        fontSize: 60,
                    }}
                >
                    {title}
                </h1>
                {author && (
                    <h2
                        style={{
                            fontFamily: THEME.fonts.roboto,
                            color: 'white',
                            fontSize: 44,
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
                            fontSize: 28,
                        }}
                    >
                        {`Midi file by ${midiCreator}`}
                    </h3>
                )}
            </div>
        </AbsoluteFill>
    );
};
