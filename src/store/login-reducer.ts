import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";
import {authAPI} from "../api/api";

export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

type UserAuthData = {
    data: UserDataType
    isAuth: boolean
    isFetching: boolean
    error: string | null
    showSuccessModal: boolean
}

/*email: "nya-admin@nya.nya",
    password: "1qazxcvBG",*/


const initState: UserAuthData = {
    data: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,

    },
    isAuth: false,
    isFetching: false,
    error: '',
    showSuccessModal: false
};

export const loginReducer = (state = initState, action: ActionsType): UserAuthData => {
    switch (action.type) {
        case "SET-USER-DATA": {
            return {...state, ...action.payload}
        }
        case "ERROR": {

            return {...state, error: action.titleError}
        }
        case "TOGGLE-IS-FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "SET-SHOW-SUCCESS-MODAL":
            return {...state, showSuccessModal: action.show}
        default:
            return state;
    }
};

const setAuthUserDataAC = (data: UserDataType, isAuth: boolean) => {
    return {
        type: 'SET-USER-DATA',
        payload: {data, isAuth}
    } as const
}
const errorAC = (titleError: string | null) => ({type: 'ERROR', titleError} as const)

const toggleIsFetching = (isFetching: boolean) => ({
    type: 'TOGGLE-IS-FETCHING',
    isFetching
} as const)
export const setShowSuccessModalAC = (show: boolean) => ({type: "SET-SHOW-SUCCESS-MODAL", show} as const)

type ActionsType =
    ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof errorAC>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof setShowSuccessModalAC>

type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsType>


export const loginAC = (data: LoginFormData) => ({type: 'LOGIN', data} as const);

export const login = (data: LoginFormData): ThunkType => {

    return (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
        dispatch(toggleIsFetching(true))
        authAPI.login(data)
            .then(response => {
                let data: UserDataType = response.data
                let isAuth = true
                dispatch(setAuthUserDataAC(data, isAuth))
                dispatch(setShowSuccessModalAC(true))
                setTimeout(() => {
                    dispatch(setShowSuccessModalAC(false))
                }, 2000)
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                console.log('Error: ', {...e})
                console.log(error)
                dispatch(errorAC(error))
            })
        dispatch(toggleIsFetching(false))
    }
}

export const logout = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
        authAPI.logout()
            .then(() => dispatch(setAuthUserDataAC(initState.data, false)))
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                console.log('Error: ', {...e})
                console.log(error)
                dispatch(errorAC(error))
            })
        dispatch(toggleIsFetching(false))
    }
}
