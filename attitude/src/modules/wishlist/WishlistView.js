/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {styles} from './wishlist.style';
import AllItemView from './AllItemsView';
import BoardView from './BoardView';
import {Title, ButtonText} from '../components';

import {useSelector} from 'react-redux';

const windowWidth = Dimensions.get('window').width;

export default function WishlistView(props) {
  const favArticles = useSelector(state => {
    return state.article.favArticles;
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'ALL ITEMS'},
    {key: 'second', title: 'BOARDS'},
  ]);

  const [scrType, setScrType] = useState('board');
  const [selectItem, setSelectItem] = useState(false);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: () => <Title title="WISHLIST" />,
      headerLeft: () => getLeftBarButton(),
      headerRight: () => (
        <ButtonText
          style={{fontSize: 12}}
          title={selectItem ? 'Cancel' : 'Select'}
          onClick={onSelectItem}
        />
      ),
    });
  }, [props.navigation, index, selectItem]);

  const getLeftBarButton = () => {
    if (index === 1) {
      return <ButtonText title="+" onClick={onPressAdd} />;
    } else {
      return null;
    }
  };

  _handleIndexChange = index => setIndex(index);

  const onPressAdd = () => {
    props.navigation.navigate('createBoard');
  };

  const onSelectItem = () => {
    if (favArticles?.length > 0) {
      setSelectItem(!selectItem);
    }
  };

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={[styles.tabBar]}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 1,
            ),
          });

          const isFocused = index === i;
          return (
            <View key={i} style={styles.tabItem}>
              <TouchableOpacity
                style={{
                  borderBottomWidth: isFocused ? 2 : 1,
                  borderBottomColor: isFocused ? '#922a27' : '#707070',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: windowWidth / 2,
                  height: 44,
                }}
                onPress={() => setIndex(i)}>
                <Animated.Text
                  style={{
                    opacity,
                    color: '#000',
                    fontFamily: 'CenturyGothic',
                    fontSize: 20,
                  }}>
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
              {
                <View
                  style={{height: 44, width: 1, backgroundColor: 'black'}}
                />
              }
            </View>
          );
        })}
      </View>
    );
  };

  renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <AllItemView selectItem={selectItem} />;

      case 'second':
        return <BoardView navigation={props.navigation} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={_handleIndexChange}
      sceneContainerStyle={{overflow: 'visible'}}
      scrollEnabled={false}
    />
  );
}
