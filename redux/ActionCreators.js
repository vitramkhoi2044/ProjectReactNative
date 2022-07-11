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


// comments
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
      .then(response => {
        if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
        else return response.json();
      })
      .then(comments => dispatch(addComments(comments)))
      .catch(error => dispatch(commentsFailed(error.message)));
  };
  const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
  });
  const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  });
  
  const addComment = (newcmt) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: newcmt
  });
  
  export const postComment = (productId, rating, author, comment, image) => (dispatch) => {
    var newcmt = { productId: productId, rating: rating, author: author, comment: comment, date: new Date().toISOString(), image: image };
    fetch(baseUrl + 'comments', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newcmt)
    })
      .then(response => {
        if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
        else return response.json();
      })
      .then(cmt => dispatch(addComment(cmt)))
      .catch(error => dispatch(commentsFailed(error.message)));
  };
  
//home
export const fetchHome = () => (dispatch) => {
    dispatch(homeLoading());
    return fetch(baseUrl + 'home')
        .then((response) => {
            if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
            else return response.json();
        })
        .then((home) => dispatch(addHome(home)))
        .catch((error) => dispatch(homeFailed(error.message)));
};
const homeLoading = () => ({
    type: ActionTypes.HOME_LOADING
});
const homeFailed = (errmess) => ({
    type: ActionTypes.HOME_FAILED,
    payload: errmess
});
const addHome = (home) => ({
    type: ActionTypes.ADD_HOME,
    payload: home
});