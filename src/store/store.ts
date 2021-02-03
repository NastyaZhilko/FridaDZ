import {combineReducers, createStore} from "redux";
import {reducer} from "./reducer";

const reducers = combineReducers({
    reducer:reducer
});

const store = createStore(reducers);

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;