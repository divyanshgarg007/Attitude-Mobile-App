import {Platform} from 'react-native';

/* eslint-disable prettier/prettier */
const _colorSet = {
  black: '#000000',
  white: '#FFFFFF',
  orange: '#FF3A18',
  semiblack: '#0B0B0B',
  semiorange: '#F47920',
  darkgreen: '#6C6B17',
  red: '#922a27',
  redDark: '#571917',
};

const _fontSet = {
  CenturyGothic: 'CenturyGothic',
  CenturyGothicBold: Platform.OS === 'ios' ? 'CenturyGothic-Bold' : 'CenturyGothicBold',
  KeepCalmMedium: 'KeepCalm-Medium',
  DolceVitaHeavyBold: Platform.OS === 'ios' ? 'DolceVitaHeavy-Bold' : 'DolceVitaHeavyBold',
};

const GlobalStyle = {
  colorSet: _colorSet,
  fontSet: _fontSet,
};

export default GlobalStyle;
