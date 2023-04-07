/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import GlobalStyle from '../../styles/globalstyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
    color: '#000',
  },
  input: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    color: '#000',
  },
  checkBoxTitle: {
    marginLeft: 10,
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    fontSize: 14,
    color: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 0.28,
  },
  countryContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryName: {
    fontFamily: GlobalStyle.fontSet.CenturyGothic,
    fontSize: 14,
    color: '#000',
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
