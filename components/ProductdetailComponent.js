import React, { Component } from 'react';
import { View, Text, FlatList, Modal, Button, PanResponder, Alert } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import * as Animatable from 'react-native-animatable';
import { SliderBox } from 'react-native-image-slider-box';

//redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postCart } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
    return {
        products: state.products,
        carts: state.carts
    }
}

const mapDispatchToProps = (dispatch) => ({
    postCart: (productId) => dispatch(postCart(productId))
});

// [
//     'https://cdn.tgdd.vn/Products/Images/42/235838/Slider/s22-ultra-1020x570.jpg',
//     'https://cdn.tgdd.vn/Products/Images/42/271697/Galaxy-S22-Ultra-Green-600x600.jpg',
//     'https://images.samsung.com/vn/smartphones/galaxy-s22-ultra/images/galaxy-s22-ultra_highlights_kv_img.jpg'
// ]

class RenderSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 30,
            height: 0
        };
    }
    render() {
        const product = this.props.product;
        const images = [
            baseUrl + product.sliderImg.img1,
            baseUrl + product.sliderImg.img2,
            baseUrl + product.sliderImg.img3
        ];
        if (product != null) {
            return (
                <Card onLayout={this.onLayout}>
                    <SliderBox images={images} parentWidth={this.state.width - 30} style={{ height: this.state.width - 30 }} />
                    <Card.Title style={{ marginTop: 20 }}>{product.name}</Card.Title>
                    {/* <Card.Title style={{fontSize:18, color: 'red'}}>27.990.000 VND</Card.Title> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}>{product.price} VND</Text>
                    </View>
                </Card>
            );
        }
        else {
            return (<View />)
        }
    }
    onLayout = (evt) => {
        this.setState({
            width: evt.nativeEvent.layout.width,
            height: evt.nativeEvent.layout.height,
        });
    };
}

class RenderProduct extends Component {
    render() {
        //gesture
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if (dx > 200) return true; //left to right  
            return false;
        };
        // const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        //     if (dx < -200) return true; //right to left
        //     return false;
        // };
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => { return true; },
            onPanResponderEnd: (e, gestureState) => {
                if (recognizeDrag(gestureState)) {
                    Alert.alert(
                        'Thêm vào giỏ hàng',
                        'Bạn có muốn thêm ' + product.name + ' vào giỏ hàng?',
                        [
                            { text: 'Cancel', onPress: () => { /* nothing */ } },
                            { text: 'OK', onPress: () => { this.props.cart ? alert('Đã có trong giỏ hàng') : this.props.onPressCart() } },
                        ]
                    );
                }
                // else if (recognizeComment(gestureState)) {
                //     this.props.onPressComment();
                // }
                return true;
            }
        });
        // render
        const product = this.props.product;
        if (product != null) {
            return (
                <Card {...panResponder.panHandlers}>
                    <Card.Title>Thông tin sản phẩm</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>{product.description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon raised reverse type='font-awesome' color='#f50'
                            name={this.props.cart ? 'shopping-cart' : 'cart-plus'}
                            onPress={() => this.props.cart ? alert('Đã có trong giỏ hàng') : this.props.onPressCart()}
                        />
                        <Icon raised reverse name='pencil' type='font-awesome' color='#512da8' />
                        {/* onPress={() => this.props.onPressComment()}  */}
                    </View>
                </Card>
            );
        }
        else {
            return (<View />);
        }
    }
}

class RenderProductInformation extends Component {
    render() {
        const product = this.props.product;
        if (product != null) {
            return (
                <Card>
                    <Card.Title>Cấu hình Sản Phẩm</Card.Title>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>Màn hình: {product.screen}</Text>
                    <Text style={{ margin: 10 }}>Hệ điều hành: {product.os}</Text>
                    <Text style={{ margin: 10 }}>Camera sau: {product.backCamera}</Text>
                    <Text style={{ margin: 10 }}>Camera trước: {product.frontCamera}</Text>
                    <Text style={{ margin: 10 }}>Chip: {product.chip}</Text>
                    <Text style={{ margin: 10 }}>RAM: {product.ram}</Text>
                    <Text style={{ margin: 10 }}>Bộ nhớ trong: {product.memory}</Text>
                    <Text style={{ margin: 10 }}>SIM: {product.sim}</Text>
                    <Text style={{ margin: 10 }}>Pin, Sạc: {product.battery}</Text>
                </Card>
            );
        }
        else {
            return (<View />)
        }

    }
}

class Productdetail extends Component {
    render() {
        const productId = parseInt(this.props.route.params.productId);
        const product = this.props.products.products[productId];
        const cart = this.props.carts.some((el) => el === productId);
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <RenderSlider product={product} />
                </Animatable.View>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <RenderProduct product={product} cart={cart} onPressCart={() => this.markCart(productId)} />
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000} style={{ marginBottom: 20 }}>
                    <RenderProductInformation product={product} />
                </Animatable.View>
            </ScrollView>

        )
    }
    markCart(productId) {
        this.props.postCart(productId);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productdetail)