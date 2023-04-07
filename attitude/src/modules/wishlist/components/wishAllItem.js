/* eslint-disable prettier/prettier */
import React, {useRef, useState, useMemo, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import {DropDown} from '../../components';
import GlobalStyle from '../../styles/globalstyle';
import PROD from '../../../assets/images/item.png';
import FAV from '../../../assets/images/fav.png';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import CHECK from '../../../assets/images/check.png';
import UNCHECK from '../../../assets/images/uncheck.png';
import {IMAGE_PREFIX} from '../../../util/constants';
import FastImage from 'react-native-fast-image';
import {getPrice} from '../../utils/Utils';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import DATASIZE from '../../../assets/mockdata/articleSize.json';
import {useSelector} from 'react-redux';

export const WishAllItem = props => {
  const swipeableRef = useRef(null);
  const [check, setCheck] = useState(false);

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

  const articleDetail = useSelector(state => {
    return state.article.articleDetail;
  });

  useEffect(() => {
    if (articleDetail) {
      var obj = articleDetail.articles.article[0];
      if (obj.id === props.item.id) {
        bottomSheetModalRef.current?.present();
      }
      console.log(articleDetail.articles.article[0]);
    }
  }, [articleDetail]);

  onDelete = (swipeableRef, item) => {
    swipeableRef.current.close();
    props.onClickDelete(item);
  };

  const onItemCheck = () => {
    setCheck(!check);
  };

  const swipeRight = (progress, dragX) => {
    return (
      <TouchableOpacity
        style={styles.deleteBg}
        onPress={() => onDelete(swipeableRef, props.item)}>
        <Text style={[styles.deleteX]}>X</Text>
        <Text style={[styles.delete]}>DELETE</Text>
      </TouchableOpacity>
    );
  };

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const onClickSize = type => {
    if (props.item?.articles?.article) {
      bottomSheetModalRef.current?.present();
    } else {
      props.getItemDetail(props.item);
    }
  };

  const onClickSizeItem = (item, size) => {
    props.onClickSize(item, size);
    bottomSheetModalRef.current?.close();
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    [],
  );

  var sizeStr = props.item?.selSizeObj?.extra9.xml.sizecolour
    ? props.item?.selSizeObj?.extra9.xml.sizecolour
    : 'Select Size';
  console.log('sele size: ', sizeStr);
  return (
    <Swipeable
      autoClose={true}
      ref={swipeableRef}
      renderRightActions={() => swipeRight()}>
      <View style={styles.item}>
        {props.selectItem && (
          <TouchableOpacity style={styles.check} onPress={onItemCheck}>
            <Image
              style={{width: 20, height: 20}}
              source={check ? CHECK : UNCHECK}
            />
          </TouchableOpacity>
        )}
        <FastImage
          style={{width: '45%', height: 170}}
          source={{uri: `${IMAGE_PREFIX}${props.item.image}`}}
        />

        <View style={{marginLeft: 15, width: '40%'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
            }}>
            € {getPrice(props.item.price)}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: GlobalStyle.fontSet.CenturyGothic,
            }}>
            {props.item.descriptionlong}
          </Text>
          {props.item?.cluster === 'true' && (
            <View style={{flexDirection: 'row'}}>
              <DropDown
                type="size"
                title={sizeStr}
                onClick={type => onClickSize(type)}
              />
            </View>
          )}
          <ButtonAdd ClickAdd={() => props.ClickAdd(props.item)} />
        </View>
      </View>

      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        handleComponent={() => <HeaderSize />}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        detached={true}
        onChange={handleSheetChanges}>
        <SafeAreaView style={styles.contentContainer}>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            data={props.item?.articles?.article}
            renderItem={({item}) => (
              <ItemSize
                item={item}
                onClick={(item, size) => onClickSizeItem(item, size)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </BottomSheetModal>
    </Swipeable>
  );
};

const ItemSize = props => {
  let resStr = props.item.extra9.xml.sizecolour;
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onClick(props.item, resStr)}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
            width: 30,
          }}>
          {resStr}
        </Text>
        {props.item.price !== props.item.discountprice ? (
          <>
            <Text
              style={[
                {color: props.item?.discountprice ? '#A12421' : '#000000'},
                styles.price,
              ]}>
              € {getPrice(props.item.discountprice)}
            </Text>
            <Text style={styles.stikePrice}>
              € {getPrice(props.item?.price)}
            </Text>
          </>
        ) : (
          <Text style={styles.price}>€ {getPrice(props.item?.price)}</Text>
        )}
      </View>
      {/* <Text style={{ color: "#000", fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>{props.item.deliverytime}</Text> */}
    </TouchableOpacity>
  );
};

const ButtonAdd = props => {
  return (
    <TouchableOpacity style={styles.addBg} onPress={props.ClickAdd}>
      <Text style={styles.addText}>MOVE TO BAG</Text>
    </TouchableOpacity>
  );
};

const HeaderSize = props => {
  return (
    <View style={{backgroundColor: ''}}>
      <View style={{backgroundColor: '#000', padding: 10}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          SELECT SIZE
        </Text>
      </View>
      <View
        style={{
          bottomBorderColor: '#000',
          borderBottomWidth: 0.33,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            fontFamily: GlobalStyle.fontSet.CenturyGothic,
          }}>
          Shipping to:{' '}
          <Text style={{textDecorationLine: 'underline'}}>Netherlands</Text>
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 9,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  // item: {
  //     flexDirection: 'row',
  //     paddingHorizontal: 9,
  //     paddingVertical: 10,
  //     backgroundColor: '#fff',
  // },
  delete: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'CenturyGothic',
  },
  deleteX: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'KeepCalm-Medium',
  },
  deleteBg: {
    backgroundColor: '#AF0B16',
    width: 112,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBg: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#00954F',
    width: 120,
  },
  addText: {
    padding: 5,
    fontSize: 13,
    fontFamily: 'CenturyGothic-Bold',
    color: '#000',
  },
  check: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  price: {
    fontSize: 14,
    marginLeft: 15,
    fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
  },
  stikePrice: {
    color: '#000',
    textDecorationLine: 'line-through',
    fontSize: 14,
    marginLeft: 15,
    fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
  },
});
