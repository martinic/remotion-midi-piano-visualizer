const fs = require('fs');
const toneJsMidi = require('@tonejs/midi');

const FPS = 60;

// Set TRACKS env var to select specific tracks (comma-separated, 0-indexed)
// e.g. TRACKS=2,3 to use tracks 2 and 3
// Default: all tracks that contain notes
const SELECTED_TRACKS = process.env.TRACKS
    ? process.env.TRACKS.split(',').map(Number)
    : null;

const { Midi } = toneJsMidi;

const isNoteActive = (currentSecondInVideo, note) => {
    if (note.time >= currentSecondInVideo) {
        return false;
    }

    if (note.time + note.duration <= currentSecondInVideo) {
        return false;
    }

    return true;
};

const getActiveNotesFromTrack = (currentSecondInVideo, track) => {
    return track.notes
        .filter((note) => isNoteActive(currentSecondInVideo, note))
        .map((note) => ({
            midi: note.midi,
        }));
};

const printProgress = (frame, totalFrames) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Converting midi to json : ${((frame / totalFrames) * 100).toFixed(2)}% (${frame}/${totalFrames})`);
};

const convertMidiToActiveFramePerNote = (midi, trackIndices) => {
    const dataPerFrame = {};
    const totalFrames = Math.round(midi.duration * FPS);
    for (let frame = 0; frame < totalFrames; frame++) {
        printProgress(frame, totalFrames);
        const currentSecondInVideo = frame / FPS;

        const activesNotesAtFrame = trackIndices.flatMap((i) =>
            getActiveNotesFromTrack(currentSecondInVideo, midi.tracks[i])
        );

        activesNotesAtFrame.forEach((note) => {
            if (!dataPerFrame[note.midi]) {
                dataPerFrame[note.midi] = [];
            }
            dataPerFrame[note.midi].push(frame);
        });
    }

    return dataPerFrame;
};

const readMidi = () => {
    const midiData = fs.readFileSync('input.mid');
    const midi = new Midi(midiData);

    // Print available tracks
    console.log(`\nFound ${midi.tracks.length} tracks:`);
    midi.tracks.forEach((track, i) => {
        const noteCount = track.notes.length;
        const marker = noteCount > 0 ? '♪' : ' ';
        console.log(`  [${i}] ${marker} ${track.name || '(unnamed)'} — ${noteCount} notes`);
    });

    // Select tracks
    let trackIndices;
    if (SELECTED_TRACKS) {
        trackIndices = SELECTED_TRACKS;
    } else {
        trackIndices = midi.tracks
            .map((track, i) => (track.notes.length > 0 ? i : -1))
            .filter((i) => i >= 0);
    }

    console.log(`\nUsing tracks: ${trackIndices.join(', ')}\n`);

    const activeFramePerNote = convertMidiToActiveFramePerNote(midi, trackIndices);
    const dataToWrite = { activeFramePerNote, duration: midi.duration };

    fs.writeFileSync('./src/api/midi.json', JSON.stringify(dataToWrite), null, 4);
    console.log('\nDone!');
};

readMidi();
