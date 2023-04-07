import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, TouchableOpacity, Image } from "react-native"
import { ButtonShare } from "../components";
import ShareArticleView from "../share/ShareArticleView";
import {
    BottomSheetModal,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

const SCR_WIDTH = Dimensions.get("window").width
const ITEM_HEIGHT = (SCR_WIDTH - 20) / 2

const DATA = [
    {
        "id": "0",
        "title": "BLOUSE",
        "data": [
            { "id": 0, name: "item0" },
            { "id": 1, name: "item1" },
            { "id": 2, name: "item2" },
            { "id": 3, name: "item3" },
            { "id": 4, name: "item4" },
            { "id": 5, name: "item5" }]
    },
    {
        "id": "1",
        "title": "DRESSES",
        "data": [
            { "id": 0, name: "item0" },
            { "id": 1, name: "item1" },
            { "id": 2, name: "item2" },
            { "id": 3, name: "item3" },
            { "id": 4, name: "item4" },
            { "id": 5, name: "item5" }]
    }
]
export default function BoardView(props) {
    const bottomSheetModalShareRef = useRef(null);

    const snapSharePoints = useMemo(() => ['50%', '65%'], []);

    const tapBoardItem = (title) => {
        props.navigation.navigate('boardItemList', data = { title })
    }

    const onClickShare = (item) => {
        bottomSheetModalShareRef.current?.present();
    }

    const renderSeparator = () => (
        <View
            style={{
                marginTop: 10,
                backgroundColor: 'black',
                height: 0.5,
                marginBottom: 10,
            }}
        />
    );

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                {...props}
            />
        ),
        []
    );

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (

        <View style={styles.container}>
            <FlatList
                // style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                data={DATA}
                renderItem={({ item }) => (
                    <BoardItem
                        item={item}
                        tapBoardItem={tapBoardItem}
                        onClickShare={(item) => onClickShare(item)}
                    />
                )}
                keyExtractor={item => item.id}
            />

            <BottomSheetModal
                backdropComponent={renderBackdrop}
                ref={bottomSheetModalShareRef}
                index={1}
                snapPoints={snapSharePoints}
                handleIndicatorStyle={{ top: -20, width: 136, backgroundColor: '#FFFFFF' }}
                onChange={handleSheetChanges}
            >
                <ShareArticleView />
            </BottomSheetModal>
        </View>
    )
}

const BoardItem = (props) => {
    return (
        <>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.bigItem} onPress={() => props.tapBoardItem(props.item.title)}></TouchableOpacity>
                <View style={styles.smallItem}>
                    <SubItem style={{ backgroundColor: "#000" }} />
                    <SubItem style={{ marginTop: 10 }} />
                </View>
                <View style={styles.smallItem}>
                    <SubItem style={{ backgroundColor: "#000" }} />
                    <SubItem style={{ marginTop: 10 }} />
                </View>
            </View>
            <View style={styles.catBg}>
                <Text style={styles.catName}>{props.item.title}
                    <Text style={styles.itemCount}>{'\n'}5 items</Text>
                </Text>
                <ButtonShare onClick={() => props.onClickShare(props.item)} />
            </View>
            <View
                style={{
                    marginTop: 10,
                    backgroundColor: 'black',
                    height: 0.5,
                    marginBottom: 10,
                }}
            />
        </>

    )
}

const SubItem = (props) => {
    return (
        <TouchableOpacity style={{ height: (ITEM_HEIGHT / 2) - 5 }}>
            <Image style={[{ width: '100%', height: "100%", backgroundColor: '#000' }, props.style]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 10,
    },
    itemContainer: {
        marginTop: 15,
        flexDirection: 'row'
    },
    bigItem: {
        flex: 1,
        height: ITEM_HEIGHT,
        backgroundColor: '#000'
    },
    smallItem: {
        marginLeft: 10,
        flex: 1 / 2,
        height: ITEM_HEIGHT
    },
    catBg: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    catName: {
        color: "#000",
        fontFamily: "CenturyGothic-Bold",
        fontSize: 14
    },
    itemCount: {
        color: "#000",
        fontFamily: "CenturyGothic",
        fontSize: 12
    }
})

