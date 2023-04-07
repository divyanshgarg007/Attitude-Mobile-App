import React, { useEffect } from 'react';
import { AppState, View } from 'react-native'

import { masterActions } from './services/masteractions/masterRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RootNavigator } from './navigation';
import { useSelector } from 'react-redux';
import { authActions } from './services/authactions/authRedux';

const AppRedux = (props) => {
  const API_TOKEN = useSelector(state => {
    // console.log("[SCAL] firing useSelector :", state.auth.filters)
    return state.master.API_TOKEN;
  })

  useEffect(() => {
    let { actions } = props;
    actions.getToken({}, (response) => {
      console.log("SUCCESS", response)
    }, (response) => {
      console.log("ERROR", response)
    })
  }, [])

  return (
    <RootNavigator />
  )
}


const mapStateToProps = state => ({
  user: state.auth.user,
});

const ActionCreators = Object.assign(
  {
    getToken: masterActions.getToken,
    setSessionLanguage: masterActions.setSessionLanguage,
    loginTokenSession: authActions.loginTokenSession
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRedux)

