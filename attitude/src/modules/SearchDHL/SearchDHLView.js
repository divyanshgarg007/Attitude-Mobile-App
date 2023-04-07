import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  Image,
  ActivityIndicator
} from 'react-native';
import { SearchTextBar } from '../components';
import ICON_SEARCH from '../../assets/images/magnifyingglass.png';
import { styles } from './searchDHLStyle';
import { Header } from './components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { checkoutActions } from '../../services/checkoutactions/checkoutRedux';

const renderEmpty = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ width: 40, height: 40 }} source={ICON_SEARCH} />
      <Text style={[styles.emptyText, { marginTop: 5 }]}>
        Search by Zip code, street or address and see collection points near you
      </Text>
    </View>
  );
};

const SearchDHLView = props => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangePickup = (data) => {
    props.route?.params?.onSubmit(data)
    props.navigation.goBack()
  }
  const handleSearchDHL = (data) => {
    setLoading(true)
    let { actions } = props;
    actions.dhlPickUpList(
      { id: data, country_id: props.route?.params?.country_type },
      response => {
        setLoading(false)
        console.log('SUCCESS-DHL', response);
        props.navigation.navigate('dhl-pickup', { response: response, onSubmit: handleChangePickup });
      },
      response => {
        setLoading(false)
        console.log('ERROR', response);
      },
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {loading &&
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      }
      <SearchTextBar
        onClick={props.navigation.goBack}
        value={value}
        onUpdateText={setValue}
        handleSearchDHL={handleSearchDHL}
      />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={item => item}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={() => <Header />}
      />
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  user: state.auth.user,
  cartArticles: state.cart.cartArticles,
});

const ActionCreators = Object.assign(
  {},
  {
    dhlPickUpList: checkoutActions.dhlPickUpList,
  },
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDHLView);
