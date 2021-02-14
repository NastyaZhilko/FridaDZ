import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "./store";
import {authAPI} from "../api/api";
import {log} from "util";

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

    /*token: string
    tokenDeathTime: number
    __v: number*/

}

type UserAuthData = {
    data: UserDataType
    isAuth: boolean
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
        rememberMe: false
    },
    isAuth: false
};

export const loginReducer = (state = initState, action: ActionsType): UserAuthData => {
    switch (action.type) {
        case "SET-USER-DATA": {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
};

const setAuthUserDataAC = ({data, isAuth}: UserAuthData) => {
    return {
        type: 'SET-USER-DATA',
        payload: {data, isAuth}
    } as const
}


type ActionsType = ReturnType<typeof setAuthUserDataAC>

type getAuthUserDataThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsType>
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsType>

type DataType = {
    data: {
        error: string
        in: string
        isEmailValid?: boolean
        isPassValid?: boolean
        passwordRegExp?: string
    }
}

type ResponseErrorType = {
    response: DataType
}

const errorAC = (titleError: string | null) => ({type: 'ERROR', titleError} as const)

const getAuthUserData = (): getAuthUserDataThunkType => {

    return (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
        debugger
        return authAPI.authMe().then(response => {
                let data: UserDataType = response.data
                let isAuth = true
                debugger
                dispatch(setAuthUserDataAC({data, isAuth}))
            }
        )
    }
}

export const loginAC = (data: LoginFormData) => ({type: 'LOGIN', data} as const);

export const login = (data: LoginFormData): ThunkType => {
    return (dispatch: ThunkDispatch<AppStoreType, unknown, any>) => {
        authAPI.login(data).then(response =>
            dispatch(getAuthUserData())
        )
            .catch((error: ResponseErrorType) => {
                dispatch(errorAC(error.response.data.error))
            })
    }
}

export const logout = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStoreType, unknown, ActionsType>) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                let dataLogout = initState
                dispatch(setAuthUserDataAC(dataLogout))
            }
        })
    }
}
