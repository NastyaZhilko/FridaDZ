import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./login-reducer";
import {errorReducer} from "./error-reducer";
import {passwordRecoveryReducer} from "./password-recovery-reducer";
import {profileReducer} from "./profile-reducer";
import {registrationReducer} from "./registration-reducer";
import {newPasswordReducer} from "./new-password-reducer";
import thunk from "redux-thunk"

const reducers = combineReducers({
    login:loginReducer,
    error:errorReducer,
    passwordRecovery:passwordRecoveryReducer,
    profile:profileReducer,
    registration:registrationReducer,
    newPassword:newPasswordReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;