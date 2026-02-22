import React from 'react';
import { Composition } from 'remotion';
import midiData from './api/midi.json';
import { FPS } from './constant';
import { PianoComposition } from './PianoComposition';
import { defaultProps } from './props';

// Audio duration: 435.691s @ 60fps = 26,141 frames
const SONG_DURATION = 26141;

const HEIGHT = 1080;
const WIDTH = 1920;

const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;

export const RemotionVideo: React.FC = () => {
    return (
        <>
            <Composition
                id="PianoComposition"
                component={PianoComposition}
                durationInFrames={SONG_DURATION}
                fps={FPS}
                width={WIDTH}
                height={HEIGHT}
                defaultProps={defaultProps}
            />
            <Composition
                id="PianoCompositionReel"
                component={PianoComposition}
                durationInFrames={SONG_DURATION}
                fps={FPS}
                width={REEL_WIDTH}
                height={REEL_HEIGHT}
                defaultProps={defaultProps}
            />
        </>
    );
};
