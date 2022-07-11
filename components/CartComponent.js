import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Modal, Button, Image } from 'react-native';
import { ListItem, Avatar, Icon, Input, Divider, Rating } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ScrollView } from 'react-native-virtualized-view';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';

import Loading from './LoadingComponent';



//redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { deleteCart } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        carts: state.carts
    }
};

const mapDispatchToProps = (dispatch) => ({
    deleteCart: (productId) => dispatch(deleteCart(productId))
});


class ModalCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            gender: '',
            dateOfBirth: '',
            phoneNumber: '',
            email: '',
            address: '',
        };
    }
    render() {
        const product = this.props.product;
        return (
            <View style={{ justifyContent: 'center', margin: 20 }}>
                <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>Thanh Toán</Text>
                <View style={{ height: 20 }} />
                <Input value={this.state.fullName} placeholder='Họ và tên'
                    onChangeText={(text) => this.setState({ fullName: text })} />
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: 100 }}>
                        <Input value={this.state.gender} placeholder='Giới tính'
                            onChangeText={(text) => this.setState({ gender: text })} />
                    </View>
                    <View style={{ width: 221 }}>
                        <Input value={this.state.dateOfBirth} placeholder='Ngày sinh'
                            onChangeText={(text) => this.setState({ dateOfBirth: text })} />
                    </View>
                </View>
                <Input value={this.state.phoneNumber} placeholder='Số điện thoại'
                    onChangeText={(text) => this.setState({ phoneNumber: text })} />
                <Input value={this.state.email} placeholder='Email'
                    onChangeText={(text) => this.setState({ email: text })} />
                <Input value={this.state.address} placeholder='Địa chỉ'
                    onChangeText={(text) => this.setState({ address: text })} />
                <Divider style={{ marginBottom: 20 }} />
                <ScrollView style={{ height: 180 }}>
                    <SwipeListView data={product}
                        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                        renderHiddenItem={({ item, index }) => this.renderHiddenItem(item, index)}
                        keyExtractor={(item) => item.id.toString()}
                        rightOpenValue={-100} />
                </ScrollView>
                <Divider />
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Tổng cộng: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.totalPrice(product)} VND</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Button title='PAYMENT' color='#7cc'
                        onPress={() => this.handleSubmit(product)} />
                    <View style={{ width: 10 }} />
                    <Button title='CANCEL' color='#7cc'
                        onPress={() => this.props.onPressCancel()} />
                </View>
            </View>
        );
    }
    renderMenuItem(item, index) {
        return (
            <ListItem key={index}>
                <Avatar source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
    renderHiddenItem(item, index) {
        return (
            <View style={{ alignItems: 'center', backgroundColor: '#DDD', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15 }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, width: 100, backgroundColor: 'red' }}
                    onPress={() => {
                        Alert.alert(
                            'Xóa sản phẩm khỏi thanh toán?',
                            'Bạn có chắc rằng bạn muốn xóa sản phẩm ' + item.name + ' khỏi thanh toán?',
                            [
                                { text: 'Cancel', onPress: () => { /* nothing */ } },
                                { text: 'OK', onPress: () => this.props.onPressDeleteCart(item.id) }
                            ]
                        );
                    }}>
                    <Icon name='trash' type='font-awesome' color='white' />
                    <Text style={{ color: '#FFF' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
    handleSubmit(product) {
        Alert.alert(
            'Xác nhận thanh toán',
            'Họ và tên: ' + this.state.fullName + '\n' +
            'Giới tính: ' + this.state.gender + '\n' +
            'Ngày sinh: ' + this.state.dateOfBirth + '\n' +
            'Số điện thoại: ' + this.state.phoneNumber + '\n' +
            'Email: ' + this.state.email + '\n' +
            'Địa chỉ: ' + this.state.address + '\n' +
            'Tổng tiền: ' + this.totalPrice(product) + ' VND',
            [
                { text: 'Cancel', onPress: () => { /* nothing */ } },
                { text: 'Payment', onPress: () => { this.handlePayment(product) } }
            ]
        );

    }
    handlePayment(product) {
        this.presentLocalNotification();
        for (let i = 0; i < product.length; i++) {
            this.props.onPressDeleteCart(product[i].id)
        }
        this.props.onPressCancel();
    }
    totalPrice(product) {
        let totalPrice = 0;
        for (let i = 0; i < product.length; i++) {
            let tmp = String(product[i].price).split('.');
            let price = tmp[0] + tmp[1] + tmp[2];
            totalPrice += Number(price);
        }
        return this.formatPrice(totalPrice);
    }
    formatPrice(price) {
        let a, b, c, d, e, f, g, h, j;
        a = price % 10;
        price = parseInt(String(price / 10), 0);
        b = price % 10;
        price = parseInt(String(price / 10), 0);
        c = price % 10;
        price = parseInt(String(price / 10), 0);
        d = price % 10;
        price = parseInt(String(price / 10), 0);
        e = price % 10;
        price = parseInt(String(price / 10), 0);
        f = price % 10;
        price = parseInt(String(price / 10), 0);
        g = price % 10;
        price = parseInt(String(price / 10), 0);
        h = price % 10;
        price = parseInt(String(price / 10), 0);
        j = price % 10;
        price = parseInt(String(price / 10), 0);
        if (j != 0) {
            return String(j) + String(h) + String(g) + "." + String(f) + String(e) + String(d) + "." + String(c) + String(b) + String(a);
        }
        return String(h) + String(g) + "." + String(f) + String(e) + String(d) + "." + String(c) + String(b) + String(a);
    }
    async presentLocalNotification() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === 'granted') {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true })
            });
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Đơn hàng thành công',
                    body: 'Đơn hàng của '+this.state.fullName+' đã đặt thành công. Số điện thoại của bạn là: '
                    +this.state.phoneNumber+' và đơn hàng sẽ được giao đến địa chỉ: '+this.state.address,
                    sound: true,
                    vibrate: true
                },
                trigger: null
            });
        }
    }
}


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }
    render() {
        if (this.props.products.isLoading) {
            return (<Loading />);
        } else if (this.props.products.errMess) {
            return (<Text>{this.props.products.errMess}</Text>);
        } else {
            const products = this.props.products.products.filter((product) => this.props.carts.some((el) => el === product.id));
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000}>
                        <SwipeListView data={products}
                            renderItem={({ item, index }) => this.renderMenuItem(item, index)}
                            renderHiddenItem={({ item, index }) => this.renderHiddenItem(item, index)}
                            keyExtractor={(item) => item.id.toString()}
                            rightOpenValue={-100} />
                        <Button title='Thanh Toán' color='#7cc'
                            onPress={() => this.setState({ showModal: true })} />
                    </Animatable.View>
                    <Modal animationType={'slide'} visible={this.state.showModal}
                        onRequestClose={() => this.setState({ showModal: false })}>
                        <ModalCheckout product={products}
                            onPressCancel={() => this.setState({ showModal: false })}
                            onPressDeleteCart={(productId) => this.props.deleteCart(productId)} />
                    </Modal>
                </ScrollView>
            );
        }
    }
    renderMenuItem(item, index) {
        const { navigate } = this.props.navigation;
        return (
            <ListItem key={index} onPress={() => navigate('Productdetail', { productId: item.id })}>
                <Avatar source={{ uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
    renderHiddenItem(item, index) {
        return (
            <View style={{ alignItems: 'center', backgroundColor: '#DDD', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15 }}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, width: 100, backgroundColor: 'red' }}
                    onPress={() => {
                        Alert.alert(
                            'Xóa sản phẩm khỏi giỏ hàng?',
                            'Bạn có chắc rằng bạn muốn xóa sản phẩm ' + item.name + ' khỏi giỏ hàng?',
                            [
                                { text: 'Cancel', onPress: () => { /* nothing */ } },
                                { text: 'OK', onPress: () => this.props.deleteCart(item.id) }
                            ]
                        );
                    }}>
                    <Icon name='trash' type='font-awesome' color='white' />
                    <Text style={{ color: '#FFF' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);