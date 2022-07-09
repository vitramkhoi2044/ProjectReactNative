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
            'https://cdn01.dienmaycholon.vn/filewebdmclnew/public//userupload/images/dien-thoai-Xiaomi-Mi-10T-Pro-5G-2.jpg',
            'https://bachlongmobile.com/bnews/wp-content/uploads/2022/04/Xiaomi-12-ultra.jpg'
        ];
        return (
            <Card onLayout={this.onLayout}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginTop: 0 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Xiaomi</Text>
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

class Xiaomi extends Component {
    render() {
        return (
            <RenderSlider />
        );
    }
}

export default Xiaomi;