import React from 'react';
import { THEME } from '../theme';

interface Props {
    bottom: string;
    height: string;
}

export const Note: React.FC<Props> = ({ bottom, height }) => {
    return (
        <div
            style={{
                position: 'absolute',
                height,
                width: '100%',
                bottom,
                left: 0,
                backgroundColor: THEME.colors.rightHandNote,
                borderRadius: 12,
                boxShadow:
                    'inset 10px 6px 24px 0px rgba(255, 255, 255, 0.3), inset -10px -6px 24px 0px rgba(0, 0, 0, 0.5), 0.4em 0.4em rgba(0, 0, 0, 0.4)',
            }}
        />
    );
};
