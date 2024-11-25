import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SET_CART, UPDATE_CART_ITEM_COUNT } from "./cartActionTypes";

// Function to save cart items to local storage
const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

// Initial state for the cart
const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [], // Load cart from localStorage if available
};

// Cart reducer
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // Check if the item already exists in the cart
            const existingItem = state.cartItems.find(item => item.id === action.payload.id && item.meatType === action.payload.meatType);
            let updatedCartItems;
            if (existingItem) {
                // If it exists, update the item count
                updatedCartItems = state.cartItems.map(item =>
                    item.id === action.payload.id && item.meatType === action.payload.meatType
                        ? { ...item, count: item.count + action.payload.count }
                        : item
                );
            } else {
                // If it's a new item, add it to the cart
                updatedCartItems = [...state.cartItems, action.payload];
            }

            // Save the updated cart to localStorage
            saveCartToLocalStorage(updatedCartItems);
            return {
                ...state,
                cartItems: updatedCartItems,
            };

        case UPDATE_CART_ITEM_COUNT:
            const updatedCountCartItems = state.cartItems.map((item) => {
                if (item.id === action.payload.id && item.meatType === action.payload.meatType) {
                    return { ...item, count: action.payload.newCount }
                } else return item
                });

            // Save the updated cart to localStorage
            saveCartToLocalStorage(updatedCountCartItems);
            return {
                ...state,
                cartItems: updatedCountCartItems,
            };

        case REMOVE_FROM_CART:
            const filteredCartItems = state.cartItems.filter(item => item.id !== action.payload.id || item.meatType !== action.payload.meatType);

            // Save the updated cart to localStorage
            saveCartToLocalStorage(filteredCartItems);
            return {
                ...state,
                cartItems: filteredCartItems,
            };

        case CLEAR_CART:
            // Clear the cart and save it to localStorage
            saveCartToLocalStorage([]);
            return {
                ...state,
                cartItems: [],
            };

        case SET_CART:
            // Set the cart to a new value and save it to localStorage
            saveCartToLocalStorage(action.payload);
            return {
                ...state,
                cartItems: action.payload,
            };

        default:
            return state;
    }
};

export default cartReducer;
