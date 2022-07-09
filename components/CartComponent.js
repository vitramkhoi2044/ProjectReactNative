import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

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

class Cart extends Component {
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
                    </Animatable.View>
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
