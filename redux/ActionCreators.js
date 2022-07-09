import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'

//products
export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading());
    return fetch(baseUrl + 'products')
        .then((response) => {
            if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
            else return response.json();
        })
        .then((products) => dispatch(addProducts(products)))
        .catch((error) => dispatch(productsFailed(error.message)));
};
const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});
const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
});
const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

//carts
export const postCart = (productId) => (dispatch) => {
    dispatch(addCart(productId));
};
const addCart = (productId) => ({
    type: ActionTypes.ADD_CART,
    payload: productId
});
export const deleteCart = (productId) => ({
    type: ActionTypes.DELETE_CART,
    payload: productId
});

//members
export const fetchMembers = () => (dispatch) => {
    dispatch(membersLoading());
    return fetch(baseUrl + 'members')
        .then((response) => {
            if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
            else return response.json();
        })
        .then((members) => dispatch(addMembers(members)))
        .catch((error) => dispatch(membersFailed(error.message)));
};
const membersLoading = () => ({
    type: ActionTypes.MEMBERS_LOADING
});
const membersFailed = (errmess) => ({
    type: ActionTypes.MEMBERS_FAILED,
    payload: errmess
});
const addMembers = (members) => ({
    type: ActionTypes.ADD_MEMBERS,
    payload: members
});