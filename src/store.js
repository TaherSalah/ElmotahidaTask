import { createStore } from 'redux';
import rootReducer from './Redux/index'; //combining reducers

const store = createStore(rootReducer);   

export default store;