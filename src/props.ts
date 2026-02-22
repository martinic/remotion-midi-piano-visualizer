export interface VideoProps {
    /** Song title shown on the title screen */
    title?: string;
    /** Artist/author name */
    author?: string;
    /** MIDI file creator credit */
    midiCreator?: string;
    /** Logo filename in public/ (e.g. "AX73Logo.svg"). Omit for no logo. */
    logo?: string;
    /** URL text shown below the logo (e.g. "martinic.com/ax73"). Omit for no URL. */
    url?: string;
}

export const defaultProps: VideoProps = {};
