import { Theme } from 'react-native-elements';

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module 'react-native-elements' {
  export interface Colors {
    primary: string;
    secondary: string,
    light: {
      primary: string;
      secondary: string;
      tertiary: string;
      border: string;
    },
    dark: {
      secondary: string;
      primary: string;
      tertiary: string;
      border: string;
    },
    plainWhite: string;
    error: string;
  }

  export interface FullTheme extends Theme {
    colors: RecursivePartial<Colors>;
  }
}
