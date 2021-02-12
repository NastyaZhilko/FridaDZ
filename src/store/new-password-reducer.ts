import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
import {passwordAPI} from "../api/api";


const initialState = {
    isNewPasswordSet: false,
    isError: false,
    titleError: null as string|null,
    isLoading: false
};
type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof newPasswordAC> | ReturnType<typeof errorAC> | ReturnType<typeof loadingAC>

type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsType>

export const newPasswordReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "NEW-PASSWORD": {
            return {...state, isNewPasswordSet: true};
        }
        case "ERROR": {
            return {...state, isError: true, titleError: action.titleError}
        }
        case "LOADING": {
            return {...state, isLoading: action.isLoading}
        }
        default:
            return state;
    }
};

export const newPasswordAC = () => ({type: "NEW-PASSWORD"} as const)

export const errorAC = (titleError: string,) => ({type: 'ERROR', titleError} as const)

export const loadingAC = (isLoading: boolean) => ({type: 'LOADING', isLoading} as const)


export const newPasswordTC = (password: string, resetPasswordToken: string): ThunkType => async (dispatch) => {
    try {
        dispatch(loadingAC(true))
        await passwordAPI.setNewPassword(password, resetPasswordToken)
        dispatch(newPasswordAC())
    } catch (e) {
        dispatch(errorAC(e.response.data.error));
    } finally {
        dispatch(loadingAC(false))
    }
}