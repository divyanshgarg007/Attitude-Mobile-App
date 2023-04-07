import React from 'react';
import { StyleSheet, Text } from 'react-native';


const CG14_BoldText = props => {
    return (
        <Text style={[styles.CG14_Bold, props.style]}>{props.children}</Text>
    );
};

const CG9_BoldText = props => {
    return (
        <Text style={[styles.CG9_Bold, props.style]}>{props.children}</Text>
    );
};


const styles = StyleSheet.create({
    CG14_Bold: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'CenturyGothic-Bold',
    },
    CG9_Bold: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'CenturyGothic-Bold',
    },
});

export {
    CG14_BoldText,
    CG9_BoldText
};

//CenturyGothic,
//"CenturyGothic-Bold", "KeepCalm-Medium"