import React from 'react';
import { useCurrentFrame } from 'remotion';
import midi from '../api/midi.json';
import { BASE_NOTE_HEIGHT } from '../constant';
import { MidiData } from '../interface';
import { NoteChannel } from './NoteChannel';

const midiData: MidiData = midi;

interface Props {
    delay: number;
}

export const NotesScene: React.FC<Props> = ({ delay }) => {
    const frame = useCurrentFrame();

    return (
        <div style={{ height: '83%', width: '100%' }}>
            <div
                style={{
                    transform: `translateY(${frame * BASE_NOTE_HEIGHT}%)`,
                    width: '100%',
                    height: '100%',
                }}
            >
                {Object.keys(midiData.activeFramePerNote).map((midiNote) => (
                    <NoteChannel
                        key={`noteContainer-${midiNote}`}
                        midiNote={midiNote}
                        activeFrames={midiData.activeFramePerNote[midiNote]}
                        frame={frame}
                        delay={delay}
                    />
                ))}
            </div>
        </div>
    );
};
