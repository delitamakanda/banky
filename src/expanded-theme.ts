import { createTheme } from '@mui/material';

export const theme = createTheme()

declare module '@mui/material/styles/createPalette' {
    interface PaletteColor {
        [key: number]: string[] |string| undefined;
    }

    interface Palette {
        tertiary: PaletteColor;
        primary: PaletteColor;
        secondary: PaletteColor;
    }
}

