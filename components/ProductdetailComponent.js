import React, { Component } from 'react';
import { View, Text, FlatList, Modal, Button, PanResponder, Alert } from 'react-native';
import { Card, Image, Icon, Rating, Input } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import * as Animatable from 'react-native-animatable';
import * as ImagePicker from 'expo-image-picker';
import { SliderBox } from 'react-native-image-slider-box';

//redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postCart, postComment } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
    return {
        products: state.products,
        carts: state.carts,
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => ({
    postCart: (productId) => dispatch(postCart(productId)),
    postComment: (productId, rating, author, comment, image) => dispatch(postComment(productId, rating, author, comment, image))
});

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
        const recognizeComment = ({ moveX, moveY, dx, dy }) => {
            if (dx < -200) return true; //right to left
            return false;
        };
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
                else if (recognizeComment(gestureState)) {
                    this.props.onPressComment();
                }
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
                        <Icon raised reverse name='pencil' type='font-awesome' color='#512da8'
                            onPress={() => this.props.onPressComment()} />
                    </View>
                </Card>
            );
        }
        else {
            return (<View />);
        }
    }
}

class ModalComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            author: '',
            comment: '',
            imageUrl: baseUrl + 'images/iPhone13.jpg',
        };
    }
    render() {
        return (
            <View style={{ justifyContent: 'center', margin: 20 }}>
                <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>Nhận Xét</Text>
                <Rating startingValue={this.state.rating} showRating={true}
                    onFinishRating={(value) => this.setState({ rating: value })} />
                <View style={{ height: 20 }} />
                <Input value={this.state.author} placeholder='Tên tác giả' leftIcon={{ name: 'user-o', type: 'font-awesome' }}
                    onChangeText={(text) => this.setState({ author: text })} />
                <Input value={this.state.comment} placeholder='Nhận xét' leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
                    onChangeText={(text) => this.setState({ comment: text })} />
                <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                    <Image style={{ width: 80, height: 60, marginRight: 2 }} source={{ uri: this.state.imageUrl }} />
                    <View style={{ justifyContent: 'center' }}>
                        <Button title='Camera' color='#7cc' onPress={() => this.getImageFromCamera()} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Button title='SUBMIT' color='#7cc'
                        onPress={() => this.handleSubmit()} />
                    <View style={{ width: 10 }} />
                    <Button title='CANCEL' color='#7cc'
                        onPress={() => this.props.onPressCancel()} />
                </View>
            </View>
        );
    }
    async getImageFromCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3] });
            if (!capturedImage.cancelled) {
                this.setState({ imageUrl: capturedImage.uri });
            }
        }
    }
    handleSubmit() {
        this.props.postComment(this.props.productId, this.state.rating, this.state.author, this.state.comment, this.props.product.image);
        this.props.onPressCancel();
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

class RenderComments extends Component {
    render() {
        const comments = this.props.comments;
        return (
            <Card>
                <Card.Title>Comments</Card.Title>
                <Card.Divider />
                <FlatList data={comments}
                    renderItem={({ item, index }) => this.renderCommentItem(item, index)}
                    keyExtractor={item => item.id.toString()} />
            </Card>
        );
    }
    renderCommentItem(item, index) {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.author}</Text>
                <Rating startingValue={item.rating} imageSize={12} readonly style={{ flexDirection: 'row', marginLeft: 10, marginTop: 3 }} />
                <Text style={{ fontSize: 14, marginTop: 5, marginLeft: 10 }}>{item.comment}</Text>
                <Text style={{ fontSize: 14, marginTop: 5, marginLeft: 10 }}>{String(item.date).split(/([T])/)[0]}</Text>
                <Image source={{ uri: baseUrl + item.image }} style={{ width: 50, height: 50, marginTop: 10, marginLeft: 10 }} />
            </View>
        );
    };
}

class Productdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    render() {
        const productId = parseInt(this.props.route.params.productId);
        const product = this.props.products.products[productId];
        const cart = this.props.carts.some((el) => el === productId);
        const comments = this.props.comments.comments.filter((cmt) => cmt.productId === productId);
        return (
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <RenderSlider product={product} />
                </Animatable.View>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <RenderProduct product={product} cart={cart}
                        onPressCart={() => this.markCart(productId)}
                        onPressComment={() => this.setState({ showModal: true })} />
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                    <RenderProductInformation product={product} />
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={2000} delay={1000} style={{ marginBottom: 20 }}>
                    <RenderComments comments={comments} />
                </Animatable.View>
                <Modal animationType={'slide'} visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}>
                    <ModalComment productId={productId} product={product}
                        postComment={this.props.postComment}
                        onPressCancel={() => this.setState({ showModal: false })} />
                </Modal>
            </ScrollView>
        )
    }
    markCart(productId) {
        this.props.postCart(productId);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Productdetail)