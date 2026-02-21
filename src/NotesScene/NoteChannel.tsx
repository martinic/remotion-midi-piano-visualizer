import React from 'react';
import { BASE_NOTE_HEIGHT, BLACK_NOTE_WIDH_IN_PERCENT, WHITE_NOTE_WIDH_IN_PERCENT } from '../constant';
import { NoteBoundaries } from '../interface';
import { Note } from './Note';
import { getLeftPositionForNote, groupFrames, isBlackKeyboardNote } from './utils';

interface Props {
    midiNote: string;
    frame: number;
    activeFrames: Array<number>;
    delay: number;
}

export const NoteChannel: React.FC<Props> = ({ midiNote, frame, activeFrames, delay }) => {
    const intMidiNote = parseInt(midiNote);
    const isKeyboardNoteBlack = isBlackKeyboardNote(intMidiNote);

    const leftPosition = getLeftPositionForNote(intMidiNote, isKeyboardNoteBlack);
    const groupedFrames = groupFrames(activeFrames);
    const displayedFrames = 980;

    const frameWithDelay = frame - delay;

    const noteWidth = (isKeyboardNoteBlack ? BLACK_NOTE_WIDH_IN_PERCENT : WHITE_NOTE_WIDH_IN_PERCENT) - 0.3;

    return (
        <div
            style={{
                position: 'absolute',
                height: '100%',
                width: `${noteWidth}%`,
                top: 0,
                left: `${leftPosition + 0.05}%`,
            }}
        >
            {groupedFrames.map((note: NoteBoundaries) => {
                if (frameWithDelay + displayedFrames < note.startFrame) return null;
                if (note.endFrame < frameWithDelay) return null;

                const durationInFrame = note.endFrame - note.startFrame;

                return (
                    <Note
                        key={`${note.startFrame} -> ${note.endFrame} -${midiNote}`}
                        bottom={`${(note.startFrame + delay) * BASE_NOTE_HEIGHT}%`}
                        height={`${durationInFrame * BASE_NOTE_HEIGHT}%`}
                    />
                );
            })}
        </div>
    );
};
