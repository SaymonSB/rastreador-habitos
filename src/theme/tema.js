import {
  DarkTheme as NavegacaoEscuraPadrao,
  DefaultTheme as NavegacaoClaraPadrao,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';

const fontes = configureFonts({
  config: {
    headlineSmall: { fontWeight: '700' },
    titleLarge: { fontWeight: '700' },
    titleMedium: { fontWeight: '600' },
    labelLarge: { fontWeight: '700', letterSpacing: 0.3 },
  },
});

export const temaClaro = {
  ...MD3LightTheme,
  roundness: 5,
  fonts: fontes,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#006A60',
    onPrimary: '#FFFFFF',
    primaryContainer: '#9EF2E4',
    onPrimaryContainer: '#00201C',
    secondary: '#4A635F',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#CCE8E2',
    onSecondaryContainer: '#05201C',
    tertiary: '#A04100',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFDBCB',
    onTertiaryContainer: '#341100',
    background: '#F4FBF8',
    onBackground: '#161D1C',
    surface: '#F4FBF8',
    onSurface: '#161D1C',
    surfaceVariant: '#DAE5E1',
    onSurfaceVariant: '#3F4947',
    outline: '#6F7977',
    outlineVariant: '#BEC9C5',
    inverseSurface: '#2B3230',
    inverseOnSurface: '#ECF2EF',
    inversePrimary: '#4FDBC8',
    elevation: {
      level0: 'transparent',
      level1: '#EAF4F1',
      level2: '#E3F0EC',
      level3: '#DCEBE7',
      level4: '#DAEAE5',
      level5: '#D5E7E2',
    },
  },
};

export const temaEscuro = {
  ...MD3DarkTheme,
  roundness: 5,
  fonts: fontes,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4FDBC8',
    onPrimary: '#003731',
    primaryContainer: '#005048',
    onPrimaryContainer: '#9EF2E4',
    secondary: '#B1CCC6',
    onSecondary: '#1C3531',
    secondaryContainer: '#334B47',
    onSecondaryContainer: '#CCE8E2',
    tertiary: '#FFB692',
    onTertiary: '#552000',
    tertiaryContainer: '#7A3000',
    onTertiaryContainer: '#FFDBCB',
    background: '#0E1513',
    onBackground: '#DDE4E1',
    surface: '#0E1513',
    onSurface: '#DDE4E1',
    surfaceVariant: '#3F4947',
    onSurfaceVariant: '#BEC9C6',
    outline: '#899390',
    outlineVariant: '#3F4947',
    inverseSurface: '#DDE4E1',
    inverseOnSurface: '#2B3230',
    inversePrimary: '#006A60',
    elevation: {
      level0: 'transparent',
      level1: '#162320',
      level2: '#1A2926',
      level3: '#1E2F2C',
      level4: '#1F312D',
      level5: '#223531',
    },
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavegacaoClaraPadrao,
  reactNavigationDark: NavegacaoEscuraPadrao,
  materialLight: temaClaro,
  materialDark: temaEscuro,
});

export const navegacaoClara = LightTheme;
export const navegacaoEscura = DarkTheme;
