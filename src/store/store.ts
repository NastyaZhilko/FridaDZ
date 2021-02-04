import {combineReducers, createStore} from "redux";
import {loginReducer} from "./login-reducer";
import {errorReducer} from "./error-reducer";
import {passwordRecoveryReducer} from "./password-recovery-reducer";
import {profileReducer} from "./profile-reducer";
import {registrationReducer} from "./registration-reducer";
import {newPasswordReducer} from "./new-password-reducer";

const reducers = combineReducers({
    login:loginReducer,
    error:errorReducer,
    passwordRecovery:passwordRecoveryReducer,
    profile:profileReducer,
    registration:registrationReducer,
    newPassword:newPasswordReducer
});

const store = createStore(reducers);

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store;