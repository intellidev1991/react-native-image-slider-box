# react-native-image-slider-box

This library use `react-native-snap-carousel` and make easier way to create image slider box with full customization ability.

## Notice:

See original Library [https://github.com/archriss/react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)

We don't edit or modify original library, we just use it with some additional style.

------------------------


![SliderBox](imgs/pic1.jpg)

## Install

1. First install this library : https://github.com/archriss/react-native-snap-carousel  | use below npm script (`Thank you` so much to provide snap-carousel lib. please see the original lib)

    > npm i react-native-snap-carousel

2. Second install our library | use below npm script

    > npm i react-native-image-slider-box

3. (Optional) : if you want to use third-party image library such as FastImage
    > npm i react-native-fast-image;

 Well-done.

## Usage :

### list of available props for customization SliderBox:
 

|Props  |Value Type  |Description  |
|---------|---------|---------|
|`ImageComponent`|Image component, default as `Image`|default value is React-native Image, if you use third-party library like FastImage use this property
|images     | Array of image path(or url) as string        |Set array of images path- these paths can contain http url link or local images path         |
|onCurrentImagePressed     |handler function callback         | callback for get pressed image index (index start from 0)        |
|sliderBoxHeight     |int value         |default value = 200, you can change height of image slider box         |
|parentWidth     |int         |default = screen.width ; in advance mode, if parent is smaller, you can change it. best practice is use onLayout handler in parent component or screen.         |
|dotColor     |color string code        |change color of paging dot         |
|inactiveDotColor     |color string code        |change color of inactive paging dot         |
|dotStyle     |style object         |default style is : {width: 10,height: 10,borderRadius: 5,marginHorizontal: 0,padding: 0,margin: 0,} change style of paging dots if you want         |
|paginationBoxVerticalPadding     |int value         |default = 10 ; change  the height of paging dots from bottom of Slider-Box         |
|circleLoop     |boolean - attribute         |if set, when user swiped to last image circularly return to first image again.         |
|paginationBoxStyle|object,default valuse use lib style|customize pagination box
|dotStyle|object,default use lib style|customize dot styles

### 1- add below import in your code :

```js

import { SliderBox } from 'react-native-image-slider-box';

```

### 2- Define your image array source, for below examples i create array in state.

```js
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree'
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

### Example 2 : SliderBox with image press handler

![SliderBox](imgs/pic3.jpg)

```js

<SliderBox
    images={this.state.images}
    onCurrentImagePressed={index =>
        console.warn(`image ${index} pressed`)
    }
/>
```

### Example 3 : SliderBox with image press handler and change slider height (default is 200)

![SliderBox](imgs/pic2.jpg)

```js

<SliderBox
    images={this.state.images}
    sliderBoxHeight={400}
    onCurrentImagePressed={index =>
        console.warn(`image ${index} pressed`)
    }
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

![SliderBox](imgs/pic4.jpg)

```js
<SliderBox
    images={this.state.images}
    sliderBoxHeight={200}
    onCurrentImagePressed={index =>
        console.warn(`image ${index} pressed`)
    }
    dotColor="#FFEE58"
    inactiveDotColor="#90A4AE"
/>
```

### Example 6 : SliderBox with custom dot style

![SliderBox](imgs/pic6.jpg)

```js
<SliderBox
    images={this.state.images}
    sliderBoxHeight={200}
    onCurrentImagePressed={index =>
        console.warn(`image ${index} pressed`)
    }
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

### Example 7 : SliderBox with change paging box padding (Vertical height from bottom of SliderBox) + add circleLoop attribute for jump to first image after swipe the last image.

![SliderBox](imgs/pic5.jpg)

```js
<SliderBox
    images={this.state.images}
    sliderBoxHeight={200}
    onCurrentImagePressed={index =>
        console.warn(`image ${index} pressed`)
    }
    dotColor="#FFEE58"
    inactiveDotColor="#90A4AE"
    paginationBoxVerticalPadding={20}
    circleLoop
/>
```

<hr/>

### Example 8 : use Custom Image Component and customize pagination and dotStyles:

```js
<SliderBox
  ImageComponent={FastImage}
  images={this.state.images}
  sliderBoxHeight={200}
  onCurrentImagePressed={index =>
    console.warn(`image ${index} pressed`)
  }
  dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  paginationBoxVerticalPadding={20}
  paginationBoxStyle={{
    position: 'absolute',
    bottom: 0,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)'
  }}
  circleLoop
/>
```

## Full-Component(Screen) Example:

```js
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SliderBox } from 'react-native-image-slider-box';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree'
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

### License MIT

## Please subscribe and contribute me to develop this lib

-------------------

## Notice:

See original Library [https://github.com/archriss/react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)

we dont edit or modify original library, we just use it with some additional style. (BSD 3 License)