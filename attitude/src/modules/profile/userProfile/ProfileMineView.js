import React, { useEffect, useState } from "react";
import { Alert, Linking, Modal, Pressable, Image, Text, View, SafeAreaView, SectionList } from "react-native";

import ARROW_RIGHT from "../../../assets/images/arrowright.png"
import { styles } from './profile.style'
import { ActionSheet, Hud } from "../../components";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { RETURN_FAQ, CONTACT, RETURN_HOW } from "../../../util/constants";
import { authActions } from "../../../services/authactions/authRedux";
import strings from "../../../localization/Localization";
import i18n from "i18n-js"

const DATA = [
    {
        title: "",
        data: [strings.myOrder, strings.myReturns, strings.attitudeCoins]
    },
    {
        title: "",
        data: [strings.myDetails, strings.addressBook, strings.paymentMethod, strings.notifications, strings.contactPreference]
    },
    {
        title: "",
        data: [strings.needHelp, strings.rateApp, strings.helpImprove]
    }, {
        title: "",
        data: [strings.language, strings.signOut]
    },
];

const NON_LOGIN_DATA = [
    {
        title: "",
        data: [strings.needHelp, strings.rateApp, strings.helpImprove]
    }, {
        title: "",
        data: [strings.language, strings.signIn]
    },
];

const ProfileMineView = (props) => {
    const [actionSheet, setActionSheet] = useState(false);
    const [dataSource, setDataSource] = useState(NON_LOGIN_DATA)
    const [hud, setHud] = useState(false)

    useEffect(() => {

        //i18n.locale = "en"

    }, [])

    useEffect(() => {
        if (props.user) {
            setDataSource(DATA)
        } else {
            setDataSource(NON_LOGIN_DATA)
        }
    }, [props.user])

    const onClickOptions = index => {
        // const strings = new LocalizedStrings()
        // if (index === 0) {
        //     strings.setLanguage("en")
        // } else if (index === 1) {
        //     strings.setLanguage("nl")
        // }
    }

    const onOpenActionSheet = () => {
        // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
        const options = ["English", "Dutch", 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        const title = "Change App Language"
        props.showActionSheetWithOptions(
            {
                title,
                options,
                cancelButtonIndex,
                //destructiveBuattonIndex,
            },
            (buttonIndex) => {
                // Do something here depending on the button index selected
                onClickOptions(buttonIndex)
            }
        );
    };

    const onClickItem = (item) => {
        if (item === strings.myOrder) {
            props.navigation.navigate("MyOrder")
        } else if (item === strings.myReturns) {
            Linking.openURL('https://www.attitudeholland.nl/klantenservice/mijn-attitude/mijn-accountoverzicht/');
            //props.navigation.navigate("MyReturns")
        } else if (item === strings.myDetails) {
            props.navigation.navigate("MyDetails")
        } else if (item === strings.notifications) {
            props.navigation.navigate("NotificationSettings")
        } else if (item === strings.contactPreference) {
            props.navigation.navigate("ContactPref")
        } else if (item === strings.helpImprove) {
            props.navigation.navigate("ImproveApp")
        } else if (item === strings.addressBook) {
            props.navigation.navigate("AddressList")
        } else if (item === strings.attitudeCoins) {
            props.navigation.navigate("MyECredit")
        } else if (item === strings.needHelp) {
            //setActionSheet(true)
            const options = ["Visit Customer Care", "Where’s my order?", 'How to make a return?', 'Cancel'];
            const cancelButtonIndex = options.length - 1;
            const title = "Need help?"
            props.showActionSheetWithOptions(
                {
                    title,
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex) => {
                    // Do something here depending on the button index selected
                    //onClickOptions(buttonIndex)
                    onPressItem(options[buttonIndex])
                }
            );


        } else if (item === strings.signOut) {
            Alert.alert(
                "Logout?",
                "Are you sure you want to Sign out?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => onClickOk() }
                ]
            );
        } else if (item === strings.signIn) {
            props.navigation.navigate("Logout")
        } else if (item === strings.language) {
            onOpenActionSheet()
        }
    }

    const onClickOk = () => {
        let { actions } = props;
        setHud(true)
        actions.logout({}, (response) => {
            console.log("SUCCESS", response)
            props.navigation.navigate("Logout")
            setHud(false)

        }, (response) => {
            console.log("ERROR", response)
            setHud(false)
        });
    }

    const closeActionSheet = () => setActionSheet(false);

    const onPressItem = (type) => {
        console.log(type)
        setActionSheet(false)

        var url = ""
        if (type === "Visit Customer Care") {
            url = RETURN_FAQ
        } else if (type === "Where’s my order?") {
            url = CONTACT
        } else {
            url = RETURN_HOW
        }

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                style={{ backgroundColor: "#fff" }}
                sections={dataSource}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} onClickItem={(item) => onClickItem(item)} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.header} />
                )}
                stickySectionHeadersEnabled={false}
                ListHeaderComponent={() => <Header user={props.user} />}
                ItemSeparatorComponent={() => (<View style={{ backgroundColor: '#000', height: 0.33 }} />)}
            />

            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={actionSheet}
                style={{
                    margin: 0,
                    justifyContent: 'flex-end'
                }}
            >
                <ActionSheet
                    actionItems={actionItems}
                    onCancel={closeActionSheet}
                    onPress={onPressItem}
                />
            </Modal> */}
            <Hud visible={hud} title="Please wait..." />
        </SafeAreaView>
    )
};

const Header = (props) => {
    if (props.user) {
        var name = ""
        if (props.user.firstname && props.user.firstname.length > 0) {
            name += props.user.firstname
        }
        if (props.user.lastname && props.user.lastname.length > 0) {
            name = name + " " + props.user.lastname
        }

        return (
            <View style={styles.headerContainer} >
                <Text style={styles.textHi}>{`HI, ${name}`}
                    {/* <Text style={styles.textName}>ROB</Text> */}
                </Text>
            </View>
        )
    } else {
        return (<></>)
    }

}

const Item = (props) => (
    <Pressable onPress={() => props.onClickItem(props.title)}>
        <View style={styles.item}>
            <Text style={styles.title}>{props.title}</Text>
            <Image style={{ width: 28, height: 28 }} source={ARROW_RIGHT} />
        </View>
    </Pressable>
);


const mapStateToProps = state => ({
    user: state.auth.user
});

const ActionCreators = Object.assign(
    {},
    {
        logout: authActions.logout
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

const ConnectedApp = connectActionSheet(ProfileMineView);
export default connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)

