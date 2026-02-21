import React from 'react';
import { Piano } from 'react-piano';
import 'react-piano/dist/styles.css';
import { useVideoConfig } from 'remotion';
import { FIRST_NOTE, LAST_NOTE } from '../constant';
import { useGetActivesNotes } from './useGetActivesNotes';

export const PianoScene: React.FC = () => {
    const { width } = useVideoConfig();
    const { activeNotesMidiNumber } = useGetActivesNotes();

    return (
        <div style={{ position: 'absolute', bottom: 0, backgroundColor: 'black' }}>
            <Piano
                noteRange={{ first: FIRST_NOTE, last: LAST_NOTE }}
                activeNotes={activeNotesMidiNumber}
                playNote={(midiNumber: number) => {}}
                stopNote={(midiNumber: number) => {}}
                width={width}
                keyWidthToHeight={0.2}
            />
        </div>
    );
};
