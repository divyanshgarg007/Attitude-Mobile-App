import React, { useState, useEffect } from 'react';
import { Text, Animated, View, TouchableOpacity, Dimensions, SafeAreaView, Keyboard } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { Back, Title, Hud } from "../components";
import { Signup, Signin } from './components';
import { styles } from './signup.style';
import { Snackbar } from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActions } from '../../services/authactions/authRedux';


const windowWidth = Dimensions.get('window').width;

function SignupView(props) {
    const [index, setIndex] = useState(props?.route?.params?.index);
    const [routes] = useState([
        { key: 'first', title: 'JOIN' },
        { key: 'second', title: 'SIGN IN' },
    ]);
    const [snack, setSanck] = useState({ visible: false, message: "" })
    const [hud, setHud] = useState(false)

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => null,
            headerLeft: () => (
                <Back navigation={props.navigation} />
            ),
            headerTitle: () => (
                <Title title="ACCOUNT" />
            )
        });
    }, [props.navigation]);

    useEffect(() => {
        if (props.user) {
            loginUser()
        }
    }, [props.user])

    const loginUser = () => {
        let { actions } = props;
        actions.loginTokenSession({ username: props.user?.username, password: props.user?.password }, (response) => {
            console.log("SUCCESS", response)
            loginByToken(response)
        }, (response) => {
            console.log("ERROR", response)
            setHud(false)
        })
    }

    const loginByToken = (response) => {
        let { actions } = props;
        actions.login({ token: response.data.result.token }, (response) => {
            console.log("SUCCESS", response)
            getCustomerData()
        }, (response) => {
            console.log("ERROR", response)
            setHud(false)
        })
    }

    const getCustomerData = () => {
        let { actions } = props;
        actions.customerData({}, (response) => {
            console.log("SUCCESS", response)
            setHud(false)
            onSuccess()
        }, (response) => {
            console.log("ERROR", response)
            setHud(false)
        })
    }

    const onClickSignin = (data) => {
        Keyboard.dismiss()
        setHud(true)
        let { actions } = props;
        actions.loginToken(data, (response) => {
            console.log("SUCCESS", response)
            setSanck({ visible: true, message: "Login success" })
        }, (response) => {
            console.log("ERROR", response)
            setSanck({ visible: true, message: "Login failure" })
            setHud(false)
        })
    }

    const onClickSignup = (data) => {
        Keyboard.dismiss()
        setHud(true)
        let { actions } = props;
        actions.sigup(data, (response) => {
            console.log("SUCCESS", response)
            setSanck({ visible: true, message: "Signup success" })
        }, (response) => {
            console.log("ERROR", response)
            setSanck({ visible: true, message: "Signup error" })
        })
    }

    const onDismissSnackBar = () => setSanck({ visible: false, message: "" });

    const onSuccess = () => {
        if (props.route.params?.from && props.route.params?.from === "join") {
            props.navigation.popToTop()
        } else {
            props.navigation.popToTop()
        }
    }

    _handleIndexChange = (index) => setIndex(index);

    _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <SafeAreaView style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map((inputIndex) =>
                            inputIndex === i ? 1 : 1
                        ),
                    });

                    const isFocused = index === i;
                    return (
                        <View key={i} style={styles.tabItem}>
                            <TouchableOpacity
                                style={{ borderBottomWidth: isFocused ? 2 : 1, borderBottomColor: isFocused ? "#922a27" : '#707070', alignItems: 'center', justifyContent: 'center', width: windowWidth / 2, height: 44 }}
                                onPress={() => setIndex(i)}>
                                <Animated.Text style={{ opacity, color: "#000", fontFamily: 'CenturyGothic', fontSize: 20 }}>{route.title}</Animated.Text>
                            </TouchableOpacity>
                            {

                                <View style={{ height: 44, width: 1, backgroundColor: 'black' }} />
                            }
                        </View>
                    )
                })}
            </SafeAreaView>
        )
    }

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Signup
                    navigation={props.navigation}
                    onClick={(data) => onClickSignup(data)}
                    onSuccess={onSuccess}
                />
            case 'second':
                return <Signin
                    navigation={props.navigation}
                    onClick={(data) => onClickSignin(data)}
                    onSuccess={onSuccess} />
            default:
                return null;
        }
    }

    return (
        <>
            <TabView
                style={{ backgroundColor: "#fff" }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={_renderTabBar}
                onIndexChange={_handleIndexChange}
                sceneContainerStyle={{ overflow: 'visible' }}
            />

            <Snackbar
                visible={snack.visible}
                duration={3000}
                onDismiss={onDismissSnackBar}
            >
                {snack.message}
            </Snackbar>

            {
                hud &&
                <Hud visible={hud} title={`Loading...`} />
            }
        </>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    loginToken: state.auth.loginToken,
});

const ActionCreators = Object.assign(
    {},
    {
        sigup: authActions.sigup,
        loginToken: authActions.loginToken,
        loginTokenSession: authActions.loginTokenSession,
        login: authActions.login,
        customerData: authActions.customerData,
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupView)

