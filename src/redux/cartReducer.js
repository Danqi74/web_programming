import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SET_CART, UPDATE_CART_ITEM_COUNT } from "./cartActionTypes";

const initialState = {
    cartItems: {},
};

const cartReducer = (state = initialState, action) => {
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
        return state;
    }

    switch (action.type) {
        case ADD_TO_CART: {
            const existingCart = state.cartItems[userEmail] || [];
            const existingItemIndex = existingCart.findIndex(
                (item) =>
                    item.id === action.payload.id &&
                    item.meatType === action.payload.meatType
            );

            let updatedCartItems;
            if (existingItemIndex >= 0) {
                updatedCartItems = [...existingCart];
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    count: updatedCartItems[existingItemIndex].count + action.payload.count,
                };
            } else {
                updatedCartItems = [...existingCart, action.payload];
            }

            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: updatedCartItems,
                },
            };
        }

        case UPDATE_CART_ITEM_COUNT: {
            const existingCart = state.cartItems[userEmail] || [];
            const updatedCartItems = existingCart.map((item) =>
                item.id === action.payload.id && item.meatType === action.payload.meatType
                    ? { ...item, count: action.payload.newCount }
                    : item
            );

            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: updatedCartItems,
                },
            };
        }

        case REMOVE_FROM_CART: {
            const existingCart = state.cartItems[userEmail] || [];
            const updatedCartItems = existingCart.filter(
                (item) =>
                    item.id !== action.payload.id || item.meatType !== action.payload.meatType
            );

            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: updatedCartItems,
                },
            };
        }

        case CLEAR_CART:
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: [],
                },
            };

        case SET_CART:
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [userEmail]: action.payload,
                },
            };

        default:
            return state;
    }
};

export default cartReducer;
