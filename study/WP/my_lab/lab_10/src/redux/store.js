// src/redux/store.js
import { createStore } from 'redux';
import cartReducer from './reducers';

const store = createStore(
    cartReducer,
    // enable Redux devtools if present
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
