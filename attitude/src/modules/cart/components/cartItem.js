import React, { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Image, Text, Platform } from "react-native"
import { DropDown } from "../../components"
import GlobalStyle from "../../styles/globalstyle"
import PROD from '../../../assets/images/item.png'
import FAV from '../../../assets/images/fav.png'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { COUNTRY_DELIVERY_DAYS, DAY_COUNT_MAP, IMAGE_PREFIX } from "../../../util/constants"
import { getPrice } from "../../utils/Utils"
import moment from 'moment';
import {
    BottomSheetModal,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from "react-native-gesture-handler";

export const CartItem = (props) => {

    const swipeableRef = useRef(null);

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['50%', '50%'], []);
    const snapPointsQty = useMemo(() => ['35%', '35%'], []);

    const [selectedSize, setSelectedSize] = useState(props?.item?.count);
    const [qty, setQty] = useState(props?.item?.count)

    const onDelete = (swipeableRef, item) => {
        swipeableRef?.current?.close()
        props.onClickDelete(item)
    }

    const onSave = (swipeableRef, item) => {
        swipeableRef?.current?.close()
        props.onClickSave(item)
    }

    const swipeRight = (progress, dragX) => {
        return (
            <TouchableOpacity style={styles.deleteBg} onPress={() => onDelete(swipeableRef, props.item)}>
                <Text style={[styles.deleteX]}>X</Text>
                <Text style={[styles.delete]}>DELETE</Text>
            </TouchableOpacity>
        )
    }

    const swipeLeft = (progress, dragX) => {
        return (
            <TouchableOpacity style={{ backgroundColor: '#009847', width: 112, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => onSave(swipeableRef, props.item)}
            >
                <Image style={[{ width: 19, height: 16 }]} source={FAV}></Image>
                <Text style={[styles.delete]}>SAVE</Text>
            </TouchableOpacity>
        )
    }

    const deliveryDate = (item) => {
        var extra = DAY_COUNT_MAP[item?.extra?.extra2]
        var country = 0
        var toAddDay = 0
        if (item.stock === "1") {
            country = COUNTRY_DELIVERY_DAYS.NETHERLANDS_HIGH
        } else {
            country = COUNTRY_DELIVERY_DAYS.NETHERLANDS_LOW
            toAddDay = 1
        }
        var delDate = moment().add((extra + country), 'd');
        var perv = moment().add((extra + country + toAddDay), 'd');
        var next = moment().add((extra + country + 3), 'd');
        //return delDate.format('DD MMMM')

        return perv.format('DD MMMM') + " - " + next.format('DD MMMM')
    }

    const onClickDone = () => {
        bottomSheetModalRef.current?.close();
        props.onUpdateItemQuantity(props.item, selectedSize)
    }

    const onClickSize = (type) => {
        bottomSheetModalRef.current?.present();
    }

    const onChangeQuantity = (itemValue) => {
        setSelectedSize(itemValue)
        setQty(itemValue)
    }

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
        <Swipeable
            autoClose={true}
            ref={swipeableRef}
            renderRightActions={swipeRight}
            renderLeftActions={swipeLeft}
        >
            <View style={styles.item}>
                <Image style={{ width: '50%', height: 170, }} source={{ uri: `${IMAGE_PREFIX}${props.item.thumbnail}` }} />
                <View style={{ justifyContent: 'center', width: '50%', paddingHorizontal: 10, }}>
                    <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>€ {getPrice(props.item.amount)}</Text>
                    <Text style={{ color: "#000", marginTop: 5, fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>{props.item.desc}</Text>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
                        {/* <DropDown type="size" title="XS" onClick={(type) => props.onClickSize(type)} /> */}
                        <Text style={{ marginRight: 5, color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>{props?.item?.extra?.extra9?.xml?.sizecolour}</Text>
                        <DropDown type="qty" title={`QTY: ${props?.item?.count}`} onClick={(type) => onClickSize(type)} />
                    </View>

                    <Text style={{ color: "#000", fontSize: 12, fontFamily: GlobalStyle.fontSet.CenturyGothic, fontStyle: 'italic' }}>Delivery: {deliveryDate(props?.item)}</Text>
                </View>
            </View>


            <BottomSheetModal
                backdropComponent={renderBackdrop}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPointsQty}
                handleComponent={() => <View />}
                onChange={handleSheetChanges}
            >
                <SafeAreaView style={styles.contentContainer}>


                    <HeaderQty onClick={onClickDone} />
                    {Platform.OS === 'ios' ?
                        <Picker
                            style={{ height: 200 }}
                            selectedValue={selectedSize}
                            onValueChange={(itemValue, itemIndex) =>
                                onChangeQuantity(itemValue)
                            }>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                        </Picker>
                        :
                        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
                            <ItemPicker title="1" onChangeQuantity={onChangeQuantity} />
                            <ItemPicker title="2" onChangeQuantity={onChangeQuantity} />
                            <ItemPicker title="3" onChangeQuantity={onChangeQuantity} />
                            <ItemPicker title="4" onChangeQuantity={onChangeQuantity} />
                            <ItemPicker title="5" onChangeQuantity={onChangeQuantity} />
                        </ScrollView>
                    }


                </SafeAreaView>
            </BottomSheetModal>
        </Swipeable>

    )
}

const HeaderQty = (props) => {
    return (
        <View style={{ backgroundColor: "" }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: "#000", padding: 10 }}>
                <Text style={{ color: '#fff', fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>SELECT QUANTITY</Text>
                <TouchableOpacity onPress={props.onClick}>
                    <Text style={{ color: '#fff', fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>Done</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const ItemPicker = (props) => {
    return (
        <TouchableOpacity onPress={() => props?.onChangeQuantity(props?.title)}>
            <Text style={{ color: "#000", padding: 10, textAlign: 'center', }}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    delete: {
        fontSize: 20,
        color: '#fff',
        fontFamily: "CenturyGothic"
    },
    deleteX: {
        fontSize: 20,
        color: '#fff',
        fontFamily: "KeepCalm-Medium"
    },
    deleteBg: {
        backgroundColor: '#AF0B16',
        width: 112,
        justifyContent: 'center',
        alignItems: 'center'
    }
})