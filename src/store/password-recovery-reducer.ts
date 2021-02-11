import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "react";
import {passwordAPI} from "../api/api";

const initialState = {
    isMailSend: false

}

type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof passwordRecoveryAC>

type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsType>


export const passwordRecoveryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PASSWORD-RECOVERY': {
            return {...state, isMailSend: true};
        }
        default:
            return state;
    }
};

export const passwordRecoveryAC = (isMailSend: boolean) => ({type: 'PASSWORD-RECOVERY', isMailSend} as const);

export const passwordRecoveryTC = (email: string): ThunkType => async (dispatch) => {
    //dispatch() показать крутилку
    try {
        await passwordAPI.forgot(email)
        dispatch(passwordRecoveryAC(true))
    } catch {
//словить ошибку
    } finally {
//убрать крутилку
    }

}
