import React, {useState, useCallback, useMemo, useRef} from 'react';
import {
  Platform,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import DATAS from '../../assets/mockdata/cart.json';
import DATASIZE from '../../assets/mockdata/articleSize.json';
import DATAQTY from '../../assets/mockdata/articleQty.json';

import {styles} from './wishlist.style';
import GlobalStyle from '../styles/globalstyle';

import {WishAllItem, NavigationBar} from './components';

import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

export default function BoardItemListView(props) {
  const [data, setData] = useState(DATAS);

  const [type, setType] = useState(null);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

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

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const onClickSize = type => {
    setType(type);
    bottomSheetModalRef.current?.present();
  };

  const onClickDelete = index => {
    var array = data;
    array.splice(index, 1);
    setData(array);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <NavigationBar
        type={'boardItem'}
        title={props.route.params.title}
        navigation={props.navigation}
      />
      <FlatList
        style={{flex: 1, marginTop: Platform.OS === 'ios' ? 40 : 55}}
        contentContainerStyle={{flexGrow: 1}}
        data={data}
        renderItem={({item}) => (
          <WishAllItem
            item={item}
            onClickSize={type => onClickSize(type)}
            onClickDelete={index => onClickDelete(index)}
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <Header />}
      />

      <BottomSheetModal
        backdropComponent={renderBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            data={type === 'size' ? DATASIZE : DATAQTY}
            renderItem={({item}) => <ItemSize item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const Header = props => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0.33,
        height: 30,
      }}>
      <Text
        style={{fontSize: 12, fontFamily: GlobalStyle.fontSet.CenturyGothic}}>
        4 Items
      </Text>
    </View>
  );
};

const ItemSize = props => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          {props.item.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginLeft: 15,
            fontFamily: GlobalStyle.fontSet.CenturyGothicBold,
          }}>
          {props.item.price}
        </Text>
      </View>
      {/* <Text style={{ fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }}>{props.item.deliverytime}</Text> */}
    </TouchableOpacity>
  );
};
