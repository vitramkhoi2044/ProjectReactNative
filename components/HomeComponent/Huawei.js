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
            'https://mediaonlinevn.com/wp-content/uploads/2020/03/200326-huawei-p40-series-0.jpg',
            'https://image.thanhnien.vn/w1024/Uploaded/2022/xdrkxrvekx/2022_05_01/3368-2400.jpg'
        ];
        return (
            <Card onLayout={this.onLayout}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginTop: 0 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Huawei</Text>
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

class Huawei extends Component {
    render() {
        return (
            <RenderSlider />
        );
    }
}

export default Huawei;