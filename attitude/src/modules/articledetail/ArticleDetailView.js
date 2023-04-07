import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import { Share, SafeAreaView, FlatList, Image, ImageBackground, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { NavigationBar, ButtonSelect, ButtonAdd, ButtonWish, MoreInfo } from './components'
import { styles } from "./article.style";
import { ScrollViewHoriRect } from "../home/components";

import {
    BottomSheetModal,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import DATAS from '../../assets/mockdata/articleSize.json'
import GlobalStyle from "../styles/globalstyle";

import { connect } from 'react-redux';
import { articleActions } from '../../services/articleactions/articleRedux';
import { bindActionCreators } from 'redux';
import ShareArticleView from "../share/ShareArticleView";

import ICON_FAV from '../../assets/images/favorite.png'
import { IMAGE_PREFIX } from "../../util/constants";
import { getPrice } from "../utils/Utils";
import { authActions } from "../../services/authactions/authRedux";

import { Snackbar } from "react-native-paper";
import { cartActions } from "../../services/cartactions/cartRedux";
import { Hud } from "../components";

const DATA = [{ id: '1' }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }]
const DATA_BOARD = [{ id: 0, name: "Blouse" }, { id: 1, name: "Dresses" }]


function ArticleDetailView(props) {

    const [article, setArticle] = useState(props.route.params.data)
    const [price, setPrice] = useState(article.price)
    const [size, setSize] = useState(null)
    const [snack, setSanck] = useState({ visible: false, message: "" })
    //state
    const [fav, setFav] = useState(false)
    const images = getArticleImages()

    // ref
    const bottomSheetModalRef = useRef(null);
    const bottomSheetModalShareRef = useRef(null);
    const bottomSheetModalAddRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['50%', '50%'], []);
    const snapSharePoints = useMemo(() => ['50%', '65%'], []);

    const [hud, setHud] = useState(false)

    useEffect(() => {
        console.log(article)
    }, [article])

    useEffect(() => {
        let { actions } = props;

        let recentArt = [...props.recentArticles]

        let obj = recentArt.find((item) => item.id === article.id)
        if (!obj) {
            recentArt.unshift(article)
            actions.articleAddRecent(recentArt)
        }

        actions.getArticleDetail({ id: article.id, from: "detail" }, onSuccess, onError);

        if (article?.articles?.article?.length === 0) {
            setSize(article)
        }
    }, [])

    const onSuccess = (resp) => {
        console.log("SUCCESS: ", resp.articles.article[0])
        setArticle(resp.articles.article[0])
    }

    const onError = (resp) => {
        console.log("ERROR: ", resp)
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

    function getArticleImages() {
        var arr = []
        if (typeof (article.files?.file) !== "string") {
            article.files?.file?.map((obj, index) => {
                arr.push(`${IMAGE_PREFIX}${obj._text}`)
            })
        } else {
            arr.push(`${IMAGE_PREFIX}${article.files?.file}`)
        }
        return arr
    }

    const onClick = (data) => {
    }

    const onClickSize = () => {
        //alert('onClickSize')
        bottomSheetModalRef.current?.present();
    }

    const onClickMore = (title) => {
        if (title === "Product information") {
            props.navigation.navigate('ProductInfo', { article: article })
        } else if (title === "Size chart") {
            props.navigation.navigate('ProductSizeGuide')
        }
    }

    const onClickAddToBag = () => {
        if (!props?.loginToken) {
            props.navigation.navigate("Signup", { type: 'join', index: 0 })
        } else {
            if (article?.cluster === "true") {
                if (size) {
                    callAddToBagAPI(size?.id)
                } else {
                    alert("Please select size")
                }
            } else {
                callAddToBagAPI(article?.id)
            }
        }
    }

    const callAddToBagAPI = (articleId) => {
        setHud(true)
        let { actions } = props;
        actions.addArticleToCart({ "item_id1": articleId }, (response) => {
            console.log("SUCCESS", response)
            setHud(false)
            setSanck({ visible: true, message: "Article added to bag successfully" })
        }, (response) => {
            setHud(false)
            console.log("ERROR", response)
        });
    }

    const onClickFav = (flag) => {
        if (props?.loginToken && props?.loginToken !== undefined) {
            if (article?.cluster === "true") {
                if (size) {
                    callAddToFavAPI(size.id, flag)
                } else {
                    alert("Please select size")
                }
            } else {
                callAddToFavAPI(article.id, flag)
            }
        } else {
            props.navigation.navigate("Signup", { type: 'join', index: 0 })
        }
    }

    const callAddToFavAPI = (articleId, flag) => {
        setHud(true)
        let { actions } = props;
        actions.articleFav({ "item_id1": articleId }, (response) => {
            console.log("SUCCESS", response)
            setHud(false)
            setFav(true)
            setSanck({ visible: true, message: "Article added successfully" })
        }, (response) => {
            console.log("ERROR", response)
            setHud(false)
        });
    }

    const onClickShare = () => {
        let text = article.descriptionlong
        if (Platform.OS === 'android')
            text = text.concat('')
        else
            text = text.concat('')
        let newUrl
        if (typeof props.route.params.data?.webgroups?.wg === 'string') {
            newUrl = `https://www.attitudeholland.nl/default.asp?pageid=173&webgroupfilter=${props.route?.params.data?.webgroups?.wg}&artdetail=${props.route?.params?.data?.id}`

        } else {
            newUrl = `https://www.attitudeholland.nl/default.asp?pageid=173&webgroupfilter=${props.route?.params.data?.webgroups?.wg[0]?._text}&artdetail=${props.route?.params?.data?.id}`
        }

        console.log('newUrl', newUrl)
        Share.share({
            //subject: 'Download TagWag App Now',
            //title: 'Download TagWag App Now',
            message: text,
            //url: 'app://tagwag',
            url: newUrl
            // "https://www.asos.com/nl/asos-design/asos-design-skinny-t-shirt-van-mesh-met-lange-mouwen-in-metallic-zilver/prd/203557151?ctaref=product_share_native"

        }, {
            // Android only:
            dialogTitle: '',
            // iOS only:
            excludedActivityTypes: []
        })
        // console("article: ", article)
        // //bottomSheetModalShareRef.current?.present();
        // try {
        //     const result = await Share.share({
        //         message: `${article.descriptionlong}`,
        //     });
        //     if (result.action === Share.sharedAction) {
        //         if (result.activityType) {
        //             // shared with activity type of result.activityType
        //         } else {
        //             // shared
        //         }
        //     } else if (result.action === Share.dismissedAction) {
        //         // dismissed
        //     }
        // } catch (error) {
        //     alert(error.message);
        // }
    }

    const onPressAddCancel = () => {

    }

    const onClickAddToBoard = () => {
        bottomSheetModalAddRef.current?.present();
    }

    const onClickSizeItem = (item, value) => {
        setPrice(item.price)
        // setSize(value)
        setSize(item)
        bottomSheetModalRef.current?.close();
    }

    const onDismissSnackBar = () => setSanck({ visible: false, message: "Article added successfully" });
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <NavigationBar type="all" navigation={props.navigation} onClickShare={onClickShare} />
                <SliderBox
                    images={images}
                    ImageComponent={data => {
                        const { source: { uri } = {} } = data || {};
                        return (
                            <Image resizeMode="contain" source={{ uri }} style={{ flexDirection: 'column-reverse', width: "100%", height: 300 }} >
                                {/* {
                                    fav &&
                                    <TouchableOpacity onPress={onClickAddToBoard} style={{ paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: "'rgba(0,0,0,0.7)'", height: 35 }}>
                                        <Image style={{ tintColor: '#fff', width: 11, height: 15 }} source={ICON_FAV} />
                                        <Text style={{ marginLeft: 10, color: '#fff', fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>Add to board</Text>
                                    </TouchableOpacity>
                                } */}
                            </Image>
                        );
                    }}
                    ImageLoader={() => null}
                    LoaderComponent={() => null}
                    dotColor="#FFFFFF"
                    dotStyle={{ width: 5, height: 5 }}
                    inactiveDotColor="#000000"
                />
                <View style={{ paddingHorizontal: 10 }}>
                    {props.route.params.type === 'sale' && props.route.params.type !== undefined && article?.extra10 ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.itemPriceDiscount}>€ {getPrice(article.extra10?.xml?.oldprice)}</Text>
                            <Text style={styles.itemPrice}>€ {getPrice(article.extra10?.xml?.lowestprice)}</Text>
                        </View> :
                        <>
                            <Text style={styles.itemPrice}>€ {getPrice(price)}</Text>
                        </>
                    }

                    <Text style={styles.itemName}>{article.descriptionlong}</Text>
                    {
                        article?.articles?.article?.length > 0 &&
                        <ButtonSelect
                            style={{ marginTop: 10 }}
                            value={size?.extra9?.xml?.sizecolour}
                            onClick={() => onClickSize()}
                        />
                    }

                    <View style={styles.add}>
                        <ButtonAdd onClickAdd={onClickAddToBag} />
                        <ButtonWish
                            fav={fav}
                            onClickFav={(flag) => onClickFav(flag)}
                        />
                    </View>
                </View>
                <MoreInfo
                    style={{ marginTop: 20 }}
                    onClickMore={(title) => onClickMore(title)}
                />
                <ScrollViewHoriRect type="just_dropped" title="Inspiration" data={DATA} onClick={(data) => onClick(data)} />
                <ScrollViewHoriRect type="just_dropped" title="More to love" data={DATA} onClick={(data) => onClick(data)} />
            </ScrollView>
            <BottomSheetModal
                backdropComponent={renderBackdrop}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                handleComponent={() => <View />}
                onChange={handleSheetChanges}
            >
                <SafeAreaView style={styles.contentContainer}>
                    <Header />
                    <FlatList
                        data={article?.articles?.article}
                        renderItem={({ item }) => (
                            <Item
                                item={item}
                                onClick={(item, value) => onClickSizeItem(item, value)}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </BottomSheetModal>


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

            <BottomSheetModal
                backdropComponent={renderBackdrop}
                ref={bottomSheetModalAddRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                handleComponent={() => <View />}
                backgroundComponent={props => <BottomSheetBackground {...props} />}
            >
                <SafeAreaView style={styles.contentContainer}>
                    <NavigationBar
                        type={"addBoard"}
                        title="ADD TO BOARD"
                        onPressAddCancel={onPressAddCancel} />
                    <FlatList
                        style={{ flex: 1, backgroundColor: "#fff" }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={DATA_BOARD}
                        renderItem={({ item }) => (
                            <ItemAddBoard
                                item={item}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </BottomSheetModal>

            <Snackbar
                style={{ backgroundColor: "#00954F" }}
                visible={snack.visible}
                duration={3000}
                onDismiss={onDismissSnackBar}
            >
                {snack.message}
            </Snackbar>
            <Hud visible={hud} />
        </SafeAreaView>
    )
}

const BottomSheetBackground = ({ style }) => {
    return (
        <View
            style={[
                {
                    borderRadius: 0,
                },
                { ...style },
            ]}
        />
    );
};

const Header = (props) => {
    return (
        <View style={{ backgroundColor: "" }}>
            <View style={{ backgroundColor: "#000", padding: 10 }}>
                <Text style={{ color: '#fff', fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>SELECT SIZE</Text>
            </View>
            <View style={{ bottomBorderColor: "#000", borderBottomWidth: 0.33, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>Shipping to:{` `}
                    <Text style={{ color: "#000", textDecorationLine: 'underline', }}>Netherlands</Text>
                </Text>
                <TouchableOpacity>
                    <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Item = (props) => {
    // var input = props.item.id
    // var fields = input.split(props.item.parentid);
    // var size = fields[1];
    //let resStr = size?.slice(1)
    let resStr = props.item.extra9.xml.sizecolour//size?.slice(1)

    return (
        <TouchableOpacity style={styles.item} onPress={() => props.onClick(props.item, resStr)}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: 30, color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold }}>{resStr}</Text>
                {props.item.price !== props.item.discountprice ?
                    <>
                        <Text style={[{ color: (props.item?.discountprice ? "#A12421" : "#000000") }, styles.price]}>€ {getPrice(props.item.discountprice)}</Text>
                        <Text style={styles.stikePrice}>€ {getPrice(props.item?.price)}</Text>
                    </> :
                    <Text style={styles.price}>     € {getPrice(props.item?.price)}</Text>
                }
            </View>
            {/* <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>{props.item.deliverytime}</Text> */}
        </TouchableOpacity>
    )
}

const ItemAddBoard = (props) => {
    return (
        <TouchableOpacity style={styles.itemBoard}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>{props.item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    loginToken: state.auth.loginToken,
    recentArticles: state.article.recentArticles,
});

const ActionCreators = Object.assign(
    {},
    {
        addToBag: articleActions.addToBag,
        getArticleDetail: articleActions.getArticleDetail,
        articleFav: articleActions.articleFav,
        articleUnFav: articleActions.articleUnFav,
        login: authActions.login,
        loginTokenSession: authActions.loginTokenSession,
        addArticleToCart: cartActions.addArticleToCart,
        articleAddRecent: articleActions.articleAddRecent
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailView)

