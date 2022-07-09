import React, { Component } from "react";
import { Card } from "react-native-elements";
import { View, Text, Image } from "react-native";
import { SliderBox } from 'react-native-image-slider-box';

class RenderSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 30,
            height: 0
        };
    }
    render() {
        const images = [
            'https://ict-imgs.vgcloud.vn/2020/10/14/02/iphone-12-pro-va-iphone-12-pro-max-ra-mat-xung-danh-iphone-cao-cap-nhat-6.jpg',
            'https://imobi.vn/wp-content/uploads/2021/09/Apple-iPhone13-Pro-color-lineup-220308_big_carousel.jpg.slideshow-xlarge.jpg'
        ];
        return (
            <Card onLayout={this.onLayout}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginTop: 0 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Apple</Text>
                </View>
                <SliderBox images={images} parentWidth={this.state.width - 30} />
            </Card>
        );
    }
    onLayout = (evt) => {
        this.setState({
            width: evt.nativeEvent.layout.width,
            height: evt.nativeEvent.layout.height,
        });
    };
}

class Apple extends Component {
    render() {
        return (
            <RenderSlider />
        );
    }
}

export default Apple;