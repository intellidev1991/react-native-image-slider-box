# react-native-image-slider-box

[![npm](https://img.shields.io/npm/v/react-native-image-slider-box.svg)](https://www.npmjs.com/package/react-native-image-slider-box)  ![npm](https://img.shields.io/npm/dt/react-native-image-slider-box.svg)


> `Announce`: New version published.

---

![SliderBox](assets/pic1.jpg)

![SliderBox](assets/gif.gif)

## Install

1. First, install our library | use below npm script

   > npm i react-native-image-slider-box

   > yarn add react-native-image-slider-box

2. (Optional) : if you want to use third-party image library such as FastImage
   > npm i react-native-fast-image

   > yarn add react-native-fast-image

Well-done.

## Usage :

### list of available props for customization SliderBox:

| Props                        | Value Type                            | Description                                                                                                                                             |
| ---------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ImageComponent`             | Image component, default as `Image`   | default value is React-native Image, if you use third-party library like FastImage use this property                                                    |
| images                       | Array of image path(or url) as string | Set array of images path- these paths can contain `http url link` or `local images path` using `require('./pathOfImage')`                                                                    |
| onCurrentImagePressed        | handler function callback             | callback for get pressed image index (index start from 0)                                                                                               |
| currentImageEmitter          | handler function callback             | callback for get current image index (index start from 0)                                                                                               |
| disableOnPress               | boolean               |               if present, then onCurrentImagePressed will be disabled                            |
| sliderBoxHeight              | int value                             | default value = 200, you can change height of image slider box                                                                                          |
| parentWidth                  | int                                   | default = screen.width ; in advance mode, if parent is smaller, you can change it. best practice is use onLayout handler in parent component or screen. |
| dotColor                     | color string code                     | change color of paging dot                                                                                                                              |
| inactiveDotColor             | color string code                     | change color of inactive paging dot                                                                                                                     |
| dotStyle                     | style object                          | default style is : {width: 10,height: 10,borderRadius: 5,marginHorizontal: 0,padding: 0,margin: 0,} change style of paging dots if you want            |
| paginationBoxVerticalPadding | int value                             | default = 10 ; change the height of paging dots from bottom of Slider-Box                                                                               |
| autoplay                     | bool value                            | default = false                                                                               |
| circleLoop                   | boolean - attribute                   | if set, when user swiped to last image circularly return to the first image again.                                                                      |
| paginationBoxStyle           | object,default values use lib style   | customize pagination box                                                                                                                                |
| dotStyle                     | object,default use lib style          | customize dot styles                                                                                                                                    |
| resizeMethod                 | string                                | default is `resize`                                                                                                                                     |
| resizeMode                   | string                                | default is `cover`                                                                                                                                      |
| ImageComponentStyle          | object                                | {} style object for ImageComponent   |
| imageLoadingColor            | string                                | default is `#E91E63` , image loading indicator color       |

### 1- add below import in your code :

```js
import { SliderBox } from "react-native-image-slider-box";
```

### 2- Define your image array source, for below examples i create array in state.

```js
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
        require('./assets/images/girl.jpg'),          // Local image
      ]
    };
  }
  // other component code ...
}
```

### 3- Use SliderBox such as these below examples :

### Example 1 : SliderBox without and handler or customization

```js
<SliderBox images={this.state.images} />
```

### Example 2 : SliderBox with image press handler and currentImageEmitter

![SliderBox](assets/pic3.jpg)

```js
<SliderBox
  images={this.state.images}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
/>
```

### Example 3 : SliderBox with image press handler and change slider height (default is 200)

![SliderBox](assets/pic2.jpg)

```js
<SliderBox
  images={this.state.images}
  sliderBoxHeight={400}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
/>
```

### Example 4 : SliderBox with custom width from parent. use `onLayout` function by calling it from `root View` of component.

```js
onLayout = e => {
  this.setState({
    width: e.nativeEvent.layout.width
  });
};
```

```js
render() {
    return (
        <View style={styles.container} onLayout={this.onLayout}>
            <SliderBox
                images={this.state.images}
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                    console.warn(`image ${index} pressed`)
                }
                parentWidth={this.state.width}
            />
        </View>
    );
  }
```

### Example 5 : SliderBox with custom dots color

![SliderBox](assets/pic4.jpg)

```js
<SliderBox
  images={this.state.images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
/>
```

### Example 6 : SliderBox with custom dot style

![SliderBox](assets/pic6.jpg)

```js
<SliderBox
  images={this.state.images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 10,
    padding: 0,
    margin: 0
  }}
/>
```

### Example 7 : SliderBox with change paging box padding (Vertical height from bottom of SliderBox) + add `autoplay` and `circleLoop` attribute for jump to the first image after swipe the last one.

![SliderBox](assets/pic5.jpg)

```js
<SliderBox
  images={this.state.images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
/>
```

<hr/>

### Example 8 : use `Custom Image Component`, customize pagination, image `modes` and dotStyles:

![SliderBox](assets/pic7.jpg)

```js
<SliderBox
  ImageComponent={FastImage}
  images={this.state.images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }}
  ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
  imageLoadingColor="#2196F3"
/>
```

## Full-Component(Screen) Example:

```js
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SliderBox } from "react-native-image-slider-box";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
        require('./assets/images/girl.jpg'),
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
```

# Contribute

Note: Please Use `example` folder to run sample. The sample used `components/SliderBox.js` file to run. Please after editing this file copy changes to root `dist/` folder too. The `npm` used `dist/` folder. Thanks guys.

### License MIT

## Please subscribe and contribute with me to develop this lib

---

## Notice:

This library use `react-native-snap-carousel` and make easier way to create image slider box with full customization ability.

See original Library [https://github.com/archriss/react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)

we dont edit or modify original library, we just use it with some additional style. (BSD 3 License)