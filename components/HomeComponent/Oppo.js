import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import { View, Text } from 'react-native'

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
            'https://cdn.tgdd.vn/Files/2022/03/16/1420586/oppo3410-edit_1280x720-800-resize.jpg',
            'https://thepixel.vn/wp-content/uploads/Danh-gia-OPPO-Reno7-Z-5G-10-5-trieu-co-dang-The-Pixel-13-1024x683.jpg'
        ];
        return (
            <Card onLayout={this.onLayout}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginTop: 0 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Oppo</Text>
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

class Oppo extends Component {
    render() {
        return (
            <RenderSlider />
        );
    }
}
export default Oppo;