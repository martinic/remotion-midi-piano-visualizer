# Piano MIDI Visualizer

A MIDI piano visualizer built with [Remotion](https://www.remotion.dev/) v4. Renders falling-note piano videos from any MIDI file, with support for custom audio tracks (e.g. pre-rendered plugin audio instead of MIDI synth).

## Quick Start

```bash
npm install
```

1. Place your MIDI file as `input.mid` in the project root
2. Place your audio file as `public/input.mp3` (or convert: `ffmpeg -i audio.wav -b:a 192k public/input.mp3`)
3. Parse the MIDI to JSON:
   ```bash
   npm run parse-midi
   ```
4. Preview in Remotion Studio:
   ```bash
   npm start
   ```
5. Render the video:
   ```bash
   npx remotion render src/index.ts PianoComposition out.mp4
   ```

## Selecting MIDI Tracks

By default, all tracks containing notes are visualized. To select specific tracks, use the `TRACKS` environment variable (0-indexed, comma-separated):

```bash
# Show available tracks
npm run get-info

# Render only tracks 2 and 5
TRACKS=2,5 npm run parse-midi
```

On Windows (PowerShell):
```powershell
$env:TRACKS="2,5"; npm run parse-midi
```

## Using Custom Audio

This project decouples MIDI visualization from audio playback. The MIDI file provides note timing data for the visual animation, while the audio comes from a separate MP3 file. This lets you use high-quality audio rendered from DAW plugins (REAPER, Logic, etc.) instead of a basic MIDI synthesizer.

## Reel / Portrait Mode (1080×1920)

A second composition `PianoCompositionReel` renders at 1080×1920 for Instagram Reels, YouTube Shorts, and TikTok. All components automatically adapt to portrait orientation:

- **Piano**: Taller keys (`keyWidthToHeight: 0.4`) so they're clearly visible on the narrower canvas
- **Notes area**: Uses 88% of the height (vs 83% in landscape) to maximize the falling-notes display
- **Logo**: Centered at the top instead of top-right, slightly larger
- **Title**: Smaller font sizes to fit the narrower width, adjusted animation path

To render a reel:

```bash
npx remotion render src/index.ts PianoCompositionReel out-reel.mp4
```

For memory-constrained systems, use `--concurrency=1` or split into segments (see landscape render notes above).

## Configuration

Edit `src/constant.ts` to adjust:

- `FPS` — Frame rate (default: 60)
- `FIRST_NOTE` / `LAST_NOTE` — Piano range (default: 21-108, full 88 keys)
- `BASE_NOTE_HEIGHT` — Falling note speed
- `TITLE_DURATION` — Intro title screen length
- `DELAY_BEFORE_FIRST_NOTE` — Gap between title and first note

Edit `src/theme.ts` for colors and `src/api/input.json` for title screen text.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Open Remotion Studio preview |
| `npm run parse-midi` | Convert `input.mid` to `src/api/midi.json` |
| `npm run get-info` | List MIDI tracks and metadata |
| `npm run build` | Parse MIDI + render video |

## License

GPL-2.0-or-later

## Credits

Originally based on [music-music33/remotion-midi-piano-vizualiser](https://github.com/music-music33/remotion-midi-piano-vizualiser). Upgraded to Remotion v4 with custom audio support by [Martinic](https://www.martinic.com).
