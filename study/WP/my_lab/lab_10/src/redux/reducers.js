// src/redux/reducers.js
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from './actions';

const initialState = {
    cart: [],
};

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART: {
        const item = action.payload;
        const exists = state.cart.find((c) => c.id === item.id);
        if (exists) {
            return {
            ...state,
            cart: state.cart.map((c) => (c.id === item.id ? { ...c, qty: (c.qty || 1) + 1 } : c)),
            };
        }
        return { ...state, cart: [...state.cart, { ...item, qty: 1 }] };
        }
        case REMOVE_FROM_CART: {
        const id = action.payload;
        return { ...state, cart: state.cart.filter((c) => c.id !== id) };
        }
        case CLEAR_CART:
        return { ...state, cart: [] };
        default:
        return state;
    }
}

export default cartReducer;
