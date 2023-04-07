import { StyleSheet } from 'react-native';
import GlobalStyle from '../styles/globalstyle';

export const styles = StyleSheet.create({
  emptyText: {
    color: '#000',
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 40
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    zIndex: 1111,
  },
});
