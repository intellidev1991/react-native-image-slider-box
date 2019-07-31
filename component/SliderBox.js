import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel'; //Thank From distributer(s) of this lib

// -------------------Props---------------------
// images;
// onCurrentImagePressed;
// sliderBoxHeight;
// parentWidth;
// dotColor;
// inactiveDotColor;
// dotStyle;
// paginationBoxVerticalPadding;
// circleLoop;
// ImageComponent;
// paginationBoxStyle;

const width = Dimensions.get('window').width;
export class SliderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0
    };
    this.onCurrentImagePressedHandler = this.onCurrentImagePressedHandler.bind(
      this
    );
  }

  onCurrentImagePressedHandler(index) {
    // fix index issue when circleLoop is true, default index is -3!
    let x = index;
    if (this.props.onCurrentImagePressed) {
      if (this.props.circleLoop) {
        if (this.props.images.length == 1) {
          x = 0;
        } else {
          x -= 3;
        }
      }
      this.props.onCurrentImagePressed(x);
    }
  }
  _renderItem({ item, index }) {
    const { ImageComponent } = this.props;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.onCurrentImagePressedHandler(index)}
      >
        <ImageComponent
          style={{ width: null, height: this.props.sliderBoxHeight || 200 }}
          source={{ uri: item }}
        />
      </TouchableWithoutFeedback>
    );
  }
  get pagination() {
    const { paginationBoxStyle } = this.props;
    return (
      <Pagination
        borderRadius={2}
        dotsLength={this.props.images.length}
        activeDotIndex={this.state.currentImage}
        containerStyle={[
          styles.paginationBoxStyle,
          this.props.paginationBoxVerticalPadding
            ? { paddingVertical: this.props.paginationBoxVerticalPadding }
            : {},
          paginationBoxStyle ? paginationBoxStyle : {}
        ]}
        dotStyle={this.props.dotStyle || styles.dotStyle}
        dotColor={this.props.dotColor || colors.dotColors}
        inactiveDotColor={this.props.inactiveDotColor || colors.white}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.8}
        carouselRef={this._ref}
        tappableDots={!!this._ref}
      />
    );
  }
  render() {
    return (
      <View style={{ borderRadius: 2 }}>
        <Carousel
          borderTopRightRadius={2}
          borderTopLeftRadius={2}
          ref={c => (this._ref = c)}
          data={this.props.images}
          renderItem={item => this._renderItem(item)}
          onSnapToItem={index => this.setState({ currentImage: index })}
          layout={'default'}
          sliderWidth={this.props.parentWidth || width}
          itemWidth={this.props.parentWidth || width}
          loop={this.props.circleLoop || false}
        />
        {this.props.images.length > 1 && this.pagination}
      </View>
    );
  }
}

const colors = {
  dotColors: '#BDBDBD',
  white: '#FFFFFF'
};

SliderBox.defaultProps = {
  ImageComponent: Image
};

export const styles = StyleSheet.create({
  paginationBoxStyle: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)'
  }
});
