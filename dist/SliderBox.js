import React, { Component } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel"; //Thank From distributer(s) of this lib
import styles from "./SliderBox.style";

// -------------------Props--------------------
// images
// onCurrentImagePressed
// sliderBoxHeight
// parentWidth
// dotColor
// inactiveDotColor
// dotStyle
// paginationBoxVerticalPadding
// circleLoop
// autoplay
// ImageComponent
// ImageLoader
// paginationBoxStyle
// resizeMethod
// resizeMode
// ImageComponentStyle,
// imageLoadingColor = "#E91E63"
// firstItem = 0
// activeOpacity
// autoplayInterval = 3000

const width = Dimensions.get("window").width;

export class SliderBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: props.firstItem || 0,
      loading: [],
    };
    this.onCurrentImagePressedHandler =
      this.onCurrentImagePressedHandler.bind(this);
    this.onSnap = this.onSnap.bind(this);
    this._renderItem = this._renderItem.bind(this);
  }

  componentDidMount() {
    //let a = [...Array(this.props.images.length).keys()].map((i) => false);
  }

  onCurrentImagePressedHandler() {
    if (this.props.onCurrentImagePressed) {
      this.props.onCurrentImagePressed(this.state.currentImage);
    }
  }

  onSnap(index) {
    this._ref.snapToItem(index);
    const { currentImageEmitter } = this.props;
    this.setState({ currentImage: index }, () => {
      if (currentImageEmitter) {
        currentImageEmitter(this.state.currentImage);
      }
    });
  }

  _renderItem({ item, index }) {
    const {
      ImageComponent,
      ImageComponentStyle = {},
      LoaderComponent,
      sliderBoxHeight,
      disableOnPress,
      resizeMethod,
      resizeMode,
      imageLoadingColor = "#E91E63",
      underlayColor = "transparent",
      activeOpacity = 0.85,
    } = this.props;
    return (
      <View
        style={{
          position: "relative",
          justifyContent: "center",
        }}
      >
        <TouchableHighlight
          key={index}
          underlayColor={underlayColor}
          disabled={disableOnPress}
          onPress={this.onCurrentImagePressedHandler}
          activeOpacity={activeOpacity}
        >
          <ImageComponent
            style={[
              {
                width: "100%",
                height: sliderBoxHeight || 200,
                alignSelf: "center",
              },
              ImageComponentStyle,
            ]}
            source={typeof item === "string" ? { uri: item } : item}
            resizeMethod={resizeMethod || "resize"}
            resizeMode={resizeMode || "cover"}
            //onLoad={() => {}}
            //onLoadStart={() => {}}
            onLoadEnd={() => {
              let t = this.state.loading;
              t[index] = true;
              this.setState({ loading: t });
            }}
            {...this.props}
          />
        </TouchableHighlight>
        {!this.state.loading[index] && (
          <LoaderComponent
            index={index}
            size="large"
            color={imageLoadingColor}
            style={{
              position: "absolute",
              alignSelf: "center",
            }}
          />
        )}
      </View>
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
      paginationBoxVerticalPadding,
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
          paginationBoxStyle ? paginationBoxStyle : {},
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
      loopClonesPerSide,
      autoplayDelay,
      useScrollView,
      autoplayInterval,
    } = this.props;

    return (
      <View>
        <Carousel
          autoplayDelay={autoplayDelay}
          autoplayInterval={autoplayInterval || 3000}
          layout={"default"}
          useScrollView={useScrollView}
          data={images}
          ref={(c) => (this._ref = c)}
          loop={circleLoop || false}
          enableSnap={true}
          autoplay={autoplay || false}
          itemWidth={parentWidth || width}
          sliderWidth={parentWidth || width}
          loopClonesPerSide={loopClonesPerSide || 5}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.onSnap(index)}
          {...this.props}
        />
        {images.length > 1 && this.pagination}
      </View>
    );
  }
}

const colors = {
  dotColors: "#BDBDBD",
  white: "#FFFFFF",
};

SliderBox.defaultProps = {
  ImageComponent: Image,
  LoaderComponent: ActivityIndicator,
};
