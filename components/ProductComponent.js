import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native';
import { Image, Card, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-virtualized-view';
import * as Animatable from 'react-native-animatable';

import Loading from './LoadingComponent'

// redux
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postCart } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        carts: state.carts
    }
};

const mapDispatchToProps = (dispatch) => ({
    postCart: (productId) => dispatch(postCart(productId))
});

class Product extends Component {
    render() {
        if (this.props.products.isLoading) {
            return (<Loading />)
        }
        else if (this.props.products.errMess) {
            return (<Text>{this.props.errMess}</Text>);
        }
        else {
            return (
                <ScrollView>
                    <FlatList data={this.props.products.products}
                        style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginBottom: 20 }}
                        renderItem={({ item, index }) => this.renderProductItem(item, index)}
                        keyExtractor={item => item.id.toString()} />
                </ScrollView>
            );
        }
    }

    renderProductItem(item, index) {
        const { navigate } = this.props.navigation;
        const productId = item.id;
        const cart = this.props.carts.some((el) => el === productId);
        return (
            <Animatable.View animation="zoomInDown" duration={2000} delay={1000}>
                <View key={index} style={{ width: 180 }}>
                    <Card>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Image source={{ uri: baseUrl + item.image }}
                                style={{ width: 130, height: 130 }}
                                onPress={() => navigate('Productdetail', { productId: item.id })} />
                        </View>
                        <Card.Title style={{ marginTop: 7 }}>{item.name}</Card.Title>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 15, color: 'red' }}>{item.price} VND</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                            <Icon raised reverse type='font-awesome' color='#f50'
                                name={cart ? 'shopping-cart' : 'cart-plus'}
                                onPress={() => cart ? alert('Đã có trong giỏ hàng') : this.markCart(productId)}
                            />
                        </View>
                    </Card>
                </View>
            </Animatable.View>
        );
    }
    markCart(productId) {
        this.props.postCart(productId);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)