import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";
import {passwordAPI} from "../api/api";


const initialState = {
    isMessageSend: false,
    isError: false,
    titleError: null as string|null,
    isLoading: false
}

type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof passwordRecoveryAC>|ReturnType<typeof errorAC>|ReturnType<typeof loadingAC>

type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsType>


export const passwordRecoveryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PASSWORD-RECOVERY': {
            return {...state, isMessageSend: true};
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

const passwordRecoveryAC = () => ({type: 'PASSWORD-RECOVERY'} as const);
const errorAC = (titleError:string|null) => ({type: 'ERROR', titleError} as const)
const loadingAC = (isLoading:boolean) => ({type: 'LOADING', isLoading} as const)

export const passwordRecoveryTC = (email: string | null): ThunkType => async (dispatch) => {
    try {
        dispatch(loadingAC(true))
        await passwordAPI.forgot(email)
        dispatch(passwordRecoveryAC())
        dispatch(errorAC(null))
    } catch  (e) {
        dispatch(errorAC(e.response.data.error));

    } finally {
        dispatch(loadingAC(false))
    }

}
