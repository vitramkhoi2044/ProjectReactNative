import React, { Component } from 'react'
import { Card } from "react-native-elements";
import { View, Text, FlatList } from "react-native";
import { SliderBox } from 'react-native-image-slider-box';
import { ScrollView } from 'react-native-virtualized-view';
import * as Animatable from 'react-native-animatable';


import Loading from './LoadingComponent';

//redux
import { baseUrl } from "../shared/baseUrl";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        home: state.home
    }
};

class RenderSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 30,
            height: 0
        };
    }
    render() {
        const home = this.props.home;
        const images = [
            baseUrl + home.sliderImg.img1,
            baseUrl + home.sliderImg.img2,
            baseUrl + home.sliderImg.img3,
            baseUrl + home.sliderImg.img4,
            baseUrl + home.sliderImg.img5
        ];
        return (
            <Animatable.View animation="zoomInDown" duration={2000} delay={1000}>
                <Card onLayout={this.onLayout}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginTop: 0 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{home.product}</Text>
                    </View>
                    <SliderBox images={images} parentWidth={this.state.width - 30}  />
                </Card>
            </Animatable.View >
        );
    }
    onLayout = (evt) => {
        this.setState({
            width: evt.nativeEvent.layout.width,
            height: evt.nativeEvent.layout.height,
        });
    };
}

class Home extends Component {
    render() {
        if (this.props.home.isLoading) {
            return (<Loading />)
        }
        else if (this.props.home.errMess) {
            return (<Text>{this.props.errMess}</Text>);
        }
        else {
            return (
                <ScrollView>
                    <FlatList data={this.props.home.home}
                        style={{ flexDirection: 'column', marginBottom: 20 }}
                        renderItem={({ item, index }) => this.renderHomeItem(item, index)}
                        keyExtractor={item => item.id.toString()} />
                </ScrollView>
            );
        }
    }
    renderHomeItem(item, index) {

        return (
            <View key={index}>
                <RenderSlider home={item} />
            </View>
        );

    }
}

export default connect(mapStateToProps)(Home);
