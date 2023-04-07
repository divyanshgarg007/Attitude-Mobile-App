/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Image, Dimensions, Pressable } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { HOME_CONTENT_IMG } from '../../../util/constants';

const WIDTH = Dimensions.get('window').width;

export function Slider(props) {
  const renderLoader = () => {
    return null;
  };

  return (
    <View style={styles.bannerContainer}>
      {props.slider?.duplicable?.d && props.slider.duplicable.d.length > 0 && (
        <SliderBox
          autoplay
          circleLoop
          LoaderComponent={() => renderLoader()}
          ImageComponent={item => (
            <ImageComp
              item={item}
              onClick={item => props.onClickSlider(item)}
            />
          )}
          images={props.slider.duplicable.d}
          sliderBoxHeight={130}
          dotColor="#FFFFFF"
          inactiveDotColor="gray"
        //   dotStyle={{display: 'none'}}
        />
      )}
    </View>
  );
}

const ImageComp = props => {
  return (
    <Pressable onPress={() => props.onClick(props.item.source)}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: `${HOME_CONTENT_IMG}${props.item.source['item-img']}` }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginBottom: 10,
  },
  image: {
    width: WIDTH - 15,
    height: (WIDTH - 15) * (4 / 3),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
});
