import React, { Component } from "react";
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from "react-native-elements";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import About from "./AboutUsComponent";
import Home from "./HomeComponent";
import Contact from './ContactComponent';
import Productdetail from './ProductdetailComponent';
import Product from './ProductComponent';
import Cart from './CartComponent';

// redux
import { connect } from 'react-redux';
import { fetchProducts, fetchMembers, fetchComments, fetchHome } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchMembers: () => dispatch(fetchMembers()),
    fetchComments: () => dispatch(fetchComments()),
    fetchHome: () => dispatch(fetchHome()),
});

function AboutNavigatorScreen() {
    const AboutNavigator = createStackNavigator();
    return (
        <AboutNavigator.Navigator initialRouteName='About'
            screenOptions={{
                headerStyle: { backgroundColor: '#7cc' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <AboutNavigator.Screen name='About' component={About}
                options={({ navigation }) => ({
                    headerTitle: 'Về chúng tôi',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}
            />
        </AboutNavigator.Navigator>
    );
}

function HomeNavigatorScreen() {
    const HomeNavigator = createStackNavigator();
    return (
        <HomeNavigator.Navigator initialRouteName='Home'
            screenOptions={{
                headerStyle: { backgroundColor: '#7cc' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <HomeNavigator.Screen name='Home' component={Home}
                options={({ navigation }) => ({
                    headerTitle: 'Trang Chủ',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}
            />
        </HomeNavigator.Navigator>
    )
}

function ProductNavigatorScreen() {
    const ProductNavigator = createStackNavigator();
    return (
        <ProductNavigator.Navigator
            initialRouteName='Products'
            screenOptions={{
                headerStyle: { backgroundColor: '#7cc' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <ProductNavigator.Screen name='Products' component={Product}
                options={({ navigation }) => ({
                    headerTitle: 'Sản Phẩm',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
            <ProductNavigator.Screen name='Productdetail' component={Productdetail} options={{ headerTitle: 'Chi Tiết Sản Phẩm' }} />
        </ProductNavigator.Navigator>
    );
}

function ContactNavigatorScreen() {
    const ContactNavigator = createStackNavigator();
    return (
        <ContactNavigator.Navigator
            initialRouteName='Contact'
            screenOptions={{
                headerStyle: { backgroundColor: '#7cc' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
            <ContactNavigator.Screen name='Contact' component={Contact}
                options={({ navigation }) => ({
                    headerTitle: 'Thông Tin Liên Hệ',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })} />
        </ContactNavigator.Navigator>
    );
}

function CartNavigationScreen() {
    const CartNavigator = createStackNavigator();
    return (
        <CartNavigator.Navigator initialRouteName='Cart'
            screenOptions={{
                headerStyle: { backgroundColor: '#7cc' },
                headerTintColor: '#fff',
                headerTitleStyle: { color: '#fff' }
            }}>
                <CartNavigator.Screen name='Cart' component={Cart}
                 options={({ navigation }) => ({
                    headerTitle: 'Giỏ hàng',
                    headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
                })}/>
                <CartNavigator.Screen name='Productdetail' component={Productdetail} options={{ headerTitle: 'Chi Tiết Sản Phẩm' }} />
        </CartNavigator.Navigator>
    )
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 2 }}>
                    <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginLeft: 20 }}>VB Store</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

function MainNavigatorScreen() {
    const MainNavigator = createDrawerNavigator();
    return (
        <MainNavigator.Navigator initialRouteName='HomeScreen' drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
                options={{
                    title: 'Trang chủ', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
                }} />
            <MainNavigator.Screen name='ProductScreen' component={ProductNavigatorScreen}
                options={{
                    title: 'Sản phẩm', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='smartphone' size={size} color={focused ? '#7cc' : '#ccc'} />)
                }} />
            <MainNavigator.Screen name='CartScreen' component={CartNavigationScreen}
                options={{
                    title: 'Giỏ hàng', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='shopping-cart' size={size} color={focused ? '#7cc' : '#ccc'} />)
                }} />
            <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
                options={{
                    title: 'Về chúng tôi', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
                }} />
            <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
                options={{
                    title: 'Thông tin liên hệ', headerShown: false,
                    drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
                }} />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {
    render() {
        return (
            <NavigationContainer>
                <MainNavigatorScreen />
            </NavigationContainer>
        );
    }
    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchMembers();
        this.props.fetchComments();
        this.props.fetchHome();
    }
}

export default connect(null, mapDispatchToProps)(Main);