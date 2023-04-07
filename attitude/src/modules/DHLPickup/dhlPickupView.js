import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header, PickUpItem } from './components';
import { styles } from './dhl.style';

export default function DhlPickupView(props) {
  const handleSelectAddress = (data) => {
    props.route?.params?.onSubmit(data)
    props.navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={props.route?.params?.response?.data}
        renderItem={({ item }) => <PickUpItem item={item} handleSelectAddress={handleSelectAddress} />}
        keyExtractor={item => item?.id}
        ListHeaderComponent={() => <Header length={props.route?.params?.response?.data?.length} />}
      />
    </View>
  );
}
