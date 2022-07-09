import React, { Component } from "react";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
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
            'https://img.global.news.samsung.com/vn/wp-content/uploads/2020/03/Galaxy-Z-Flip-Design-Story_main_1.jpg',
            'https://cdn.nguyenkimmall.com/images/companies/_1/tin-tuc/khuyen%20mai/nhan-qua-linh-dinh-khi-dat-truoc-bo-doi-samsung-z-fold-va-z-flip-h5.jpg'
        ];
        return (
            <Card onLayout={this.onLayout}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginTop: 0 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Samsung</Text>
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

class SamSung extends Component {
    render() {
        return (
            <RenderSlider />
        );
    }
}

export default SamSung;