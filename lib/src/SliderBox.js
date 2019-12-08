import React, { Component } from "react";
import { View, Image, TouchableHighlight, Dimensions } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel"; //Thank From distributer(s) of this lib
import styles from "./SliderBox.style";

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

const width = Dimensions.get("window").width;
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
    const { ImageComponent, sliderBoxHeight, disableOnPress } = this.props;
    return (
      <TouchableHighlight
        key={index}
        onPress={() =>
          !disableOnPress && this.onCurrentImagePressedHandler(index)
        }
      >
        <ImageComponent
          style={{ width: null, height: sliderBoxHeight || 200 }}
          source={{ uri: item }}
          {...this.props}
        />
      </TouchableHighlight>
    );
  }
  get pagination() {
    const { currentImage } = this.state;
    const {
      images,
      dotStyle,
      dotColor,
      inactiveDotColor,
      paginationBoxStyle,
      paginationBoxVerticalPadding
    } = this.props;
    return (
      <Pagination
        borderRadius={2}
        dotsLength={images.length}
        activeDotIndex={currentImage}
        dotStyle={dotStyle || styles.dotStyle}
        dotColor={dotColor || colors.dotColors}
        inactiveDotColor={inactiveDotColor || colors.white}
        inactiveDotScale={0.8}
        carouselRef={this._ref}
        inactiveDotOpacity={0.8}
        tappableDots={!!this._ref}
        containerStyle={[
          styles.paginationBoxStyle,
          paginationBoxVerticalPadding
            ? { paddingVertical: paginationBoxVerticalPadding }
            : {},
          paginationBoxStyle ? paginationBoxStyle : {}
        ]}
        {...this.props}
      />
    );
  }
  render() {
    const {
      images,
      circleLoop,
      autoplay,
      parentWidth,
      loopClonesPerSide
    } = this.props;
    return (
      <View style={{ borderRadius: 2 }}>
        <Carousel
          layout={"default"}
          borderTopLeftRadius={2}
          borderTopRightRadius={2}
          data={images}
          ref={c => (this._ref = c)}
          loop={circleLoop || false}
          autoplay={autoplay || false}
          itemWidth={parentWidth || width}
          sliderWidth={parentWidth || width}
          loopClonesPerSide={loopClonesPerSide || 5}
          renderItem={item => this._renderItem(item)}
          onSnapToItem={index => this.setState({ currentImage: index })}
          {...this.props}
        />
        {images.length > 1 && this.pagination}
      </View>
    );
  }
}

const colors = {
  dotColors: "#BDBDBD",
  white: "#FFFFFF"
};

SliderBox.defaultProps = {
  ImageComponent: Image
};
