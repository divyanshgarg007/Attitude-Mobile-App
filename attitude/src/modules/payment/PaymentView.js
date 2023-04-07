import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { checkoutActions } from "../../services/checkoutactions/checkoutRedux";
import { cartActions } from "../../services/cartactions/cartRedux";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { Hud } from '../components';

const PaymentView = (props) => {
    const webview = useRef()
    const response = props.route.params.response
    const [hud, setHud] = useState(false)

    const onPaymentSuccess = () => {
        setHud(true)
        let { actions } = props;
        var params = {
            "transactionid": response.transactionid,
            "cancelled": false
        }

        actions.paymentTransactionSuccess({ params }, (response) => {
            console.log("SUCCESS", response)
            setHud(false)
            actions.cartArticles({}, (response) => {
                console.log("SUCCESS", response)
            }, (response) => {
                console.log("ERROR", response)
            })
            props.navigation.navigate('Cart')
            alert('Thank you for shopping. Your order has been succesfully.')
        }, (response) => {
            console.log("ERROR", response)
            setHud(false)
            alert("Something went wrong. Please try again")
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                ref={webview}
                startInLoadingState={true}
                renderLoading={() =>
                    <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', }}>
                        <ActivityIndicator />
                    </View>}
                source={{ uri: response.redirecturl }}
                onShouldStartLoadWithRequest={(request) => {
                    // If we're loading the current URI, allow it to load

                    console.log("URL:", request.url)
                    if (request.url.includes('paymentsuccess')) {
                        webview.current.stopLoading();
                        onPaymentSuccess()
                        return false
                    }

                    if (
                        request.url.includes('paymentcancelled') ||
                        request.url.includes('paymenterror') ||
                        request.url.includes('paymentrejected')) {
                        alert('Something went wrong. Please try again')

                        return false
                    }

                    return true
                }}
            />

            {
                hud &&
                <Hud visible={hud} style={{ textAlign: 'center' }} title={`Processing your payment.\nPlease wait.`} />
            }
        </SafeAreaView>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    cartArticles: state.cart.cartArticles
});

const ActionCreators = Object.assign(
    {},
    {
        paymentTransaction: checkoutActions.paymentTransaction,
        paymentTransactionSuccess: checkoutActions.paymentTransactionSuccess,
        cartArticles: cartActions.cartArticles,
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentView)