import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sampleReducer from './slice';
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  sample: sampleReducer 
});

const store = configureStore({ reducer: rootReducer }, composeWithDevTools());
export default store;
