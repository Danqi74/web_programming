import {CLEAR_CART, SET_CART} from "./cartActionTypes";

const saveCartToLocalStorage = (userEmail, cartItems) => {
    if (!userEmail) {
        return;
    }
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
};

export const loadCartFromLocalStorage = () => {
    return (dispatch) => {
        const userEmail = localStorage.getItem('email');
        if (!userEmail) {
            return;
        }

        const savedCart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
        dispatch({ type: SET_CART, payload: savedCart });
    };
};

export const addToCart = (item) => {
    return (dispatch, getState) => {
        const userEmail = localStorage.getItem('email');
        if (!userEmail) {
            return;
        }

        const { cartItems } = getState().cart;
        const userCart = cartItems[userEmail] || [];

        const existingItemIndex = userCart.findIndex(
            (cartItem) =>
                cartItem.id === item.id &&
                cartItem.meatType === item.meatType
        );

        let updatedCartItems;
        if (existingItemIndex > -1) {
            updatedCartItems = [...userCart];
            updatedCartItems[existingItemIndex].count += item.count;
        } else {
            updatedCartItems = [...userCart, item];
        }

        dispatch({ type: SET_CART, payload: updatedCartItems });
        saveCartToLocalStorage(userEmail, updatedCartItems);
    };
};

export const removeFromCart = ({ id, meatType }) => {
    return (dispatch, getState) => {
        const userEmail = localStorage.getItem('email');
        if (!userEmail) return;

        const updatedCartItems = getState().cart.cartItems[userEmail]?.filter(
            (item) => !(item.id === id && item.meatType === meatType)
        );

        dispatch({ type: SET_CART, payload: updatedCartItems });
        saveCartToLocalStorage(userEmail, updatedCartItems);
    };
};

export const updateCartItemCount = ({ id, meatType, newCount }) => {
    return (dispatch, getState) => {
        const userEmail = localStorage.getItem('email');
        if (!userEmail) return;

        const updatedCartItems = getState().cart.cartItems[userEmail]?.map((item) =>
            item.id === id && item.meatType === meatType
                ? { ...item, count: newCount }
                : item
        );

        const filteredCartItems = updatedCartItems.filter((item) => item.count > 0);

        dispatch({ type: SET_CART, payload: filteredCartItems });
        saveCartToLocalStorage(userEmail, filteredCartItems);
    };
};

export const clearCart = () => {
    return (dispatch) => {
        const userEmail = localStorage.getItem('email');
        if (!userEmail) return;

        dispatch({ type: CLEAR_CART });

        const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
        savedCart[userEmail] = [];
        localStorage.setItem('cart', JSON.stringify(savedCart));
    };
};
