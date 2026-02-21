import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { DELAY_BEFORE_FIRST_NOTE, DELAY_BEFORE_MUSIC_START, TITLE_DURATION } from './constant';
import { THEME } from './theme';
import { NotesScene } from './NotesScene/NotesScene';
import { PianoScene } from './PianoScene/PianoScene';
import { TitleScene } from './TitleScene/TitleScene';

export const PianoComposition: React.FC = () => {
    return (
        <AbsoluteFill>
            <AbsoluteFill>
                <div style={{ height: '100%', width: '100%', backgroundColor: THEME.colors.backgroundColor }} />
            </AbsoluteFill>

            <Sequence from={TITLE_DURATION} durationInFrames={Infinity} name="Notes">
                <NotesScene delay={DELAY_BEFORE_FIRST_NOTE} />
            </Sequence>
            <Sequence from={DELAY_BEFORE_MUSIC_START} durationInFrames={Infinity} name="Audio">
                <Audio src={staticFile('input.mp3')} />
            </Sequence>
            <Sequence from={0} durationInFrames={Infinity} name="Piano">
                <PianoScene />
            </Sequence>
            <Sequence from={0} durationInFrames={Infinity} name="Title">
                <TitleScene />
            </Sequence>
        </AbsoluteFill>
    );
};
