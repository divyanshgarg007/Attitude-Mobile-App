import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { ButtonWish } from './buttonWish';

import FastImage from 'react-native-fast-image';
import { IMAGE_PREFIX } from '../../../util/constants';

export function ArticleGrid(props) {
    const [items] = useState(props.data);

    const getPrice = (price) => {
        var fPrice = parseFloat(price)
        var str = `${fPrice.toFixed(2)}`
        return str.replace(".", ",")
    }

    const renderEmptyContainer = () => {
        if (props.data.length === 0 && props.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <View style={styles.loading}>
                    <Text>No data</Text>
                </View>
            )
        }
    }

    const renderFooter = () => {
        if (props.morePage) {
            return (
                <View style={{ paddingVertical: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return null
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <FlatGrid
                itemDimension={130}
                data={props.data}
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.gridView}
                spacing={10}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => props.onClick(item)}>
                        <FastImage style={styles.itemContainer} source={{ uri: `${IMAGE_PREFIX}${item.image}` }} />
                        <View style={styles.priceLikeContainer}>
                            <Text style={styles.itemPrice}>€ {getPrice(item.price)}</Text>
                            <ButtonWish />
                        </View>
                        <Text numberOfLines={2} style={styles.itemName}>{item.descriptionlong}</Text>
                    </TouchableOpacity>
                )}

                onEndReached={props.loadMoreData}
                onEndReachedThreshold={0.1}

                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmptyContainer}

            />

        </View>

    );
}

const styles = StyleSheet.create({
    gridView: {
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        padding: 10,
        height: 150,
        backgroundColor: "#000"
    },
    itemPrice: {

        fontFamily: 'CenturyGothic-Bold',
        fontSize: 12,
        lineHeight: 14,
        color: '#000'
    },
    itemName: {
        fontFamily: 'CenturyGothic',
        fontSize: 12,
        color: '#000',
        lineHeight: 14,
    },
    priceLikeContainer: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});