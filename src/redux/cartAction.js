import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SET_CART} from "./cartActionTypes";

// const saveCartToLocalStorage = (cartItems) => {
//     console.log(JSON.stringify(cartItems), 4)
//     localStorage.setItem('cart', JSON.stringify(cartItems));
// };

export const loadCartFromLocalStorage = () => {
    return (dispatch) => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch({ type: SET_CART, payload: savedCart });
    };
};

export const addToCart = (item) => {
    return (dispatch, getState) => {
        dispatch({ type: ADD_TO_CART, payload: item });
        // console.log(getState())
        // const currentCart = getState().cart.cartItems;
        // saveCartToLocalStorage(currentCart);
    };
};

export const removeFromCart = (id, meatType) => {
    return (dispatch, getState) => {
        dispatch({ type: REMOVE_FROM_CART, payload: { id, meatType} });
        // saveCartToLocalStorage(getState().cart.cartItems);
    };
};


export const clearCart = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_CART });
        localStorage.removeItem('cart');
    };
};

export const updateCartItemCount = (id ,meatType ,newCount) => {
    return (dispatch, getState) => {
        dispatch({ type: 'UPDATE_CART_ITEM_COUNT', payload: { id , meatType, newCount } });
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    };
};