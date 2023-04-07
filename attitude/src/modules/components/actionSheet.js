import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import GlobalStyle from '../styles/globalstyle';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

const ActionSheet = (props) => {
    const { actionItems } = props;
    const actionSheetItems = [
        ...actionItems,
        {
            id: '#dismiss',
            label: 'Cancel',
            onPress: props?.onCancel
        }
    ]
    return (
        <View style={styles.modalContent}>
            {
                actionSheetItems.map((actionItem, index) => {
                    return (
                        <TouchableHighlight
                            style={[
                                styles.actionSheetView,
                                index === 0 && {
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                },
                                index === actionSheetItems.length - 2 && {
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,
                                },
                                index === actionSheetItems.length - 1 && {
                                    borderBottomWidth: 0,
                                    backgroundColor: WHITE,
                                    marginTop: 8,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                    borderBottomLeftRadius: 12,
                                    borderBottomRightRadius: 12,
                                }]}
                            underlayColor={'#f7f7f7'}
                            key={index} onPress={actionItem.onPress}
                        >
                            <Text
                                allowFontScaling={false}
                                style={[styles.actionSheetText, index === actionSheetItems.length - 1 && { fontFamily: GlobalStyle.fontSet.CenturyGothicBold }]}>
                                {actionItem.label}
                            </Text>
                        </TouchableHighlight>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 30,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    actionSheetText: {
        fontSize: 20,
        fontFamily: GlobalStyle.fontSet.CenturyGothic,

        color: "#1473D0"
    },
    actionSheetView: {
        backgroundColor: WHITE,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: BORDER_COLOR
    }
});

ActionSheet.propTypes = {
    actionItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            label: PropTypes.string,
            onPress: PropTypes.func
        })
    ).isRequired,
    onCancel: PropTypes.func,
    actionTextColor: PropTypes.string
}


ActionSheet.defaultProps = {
    actionItems: [],
    onCancel: () => { },
    actionTextColor: null
}


export default ActionSheet;