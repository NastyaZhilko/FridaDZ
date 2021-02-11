import {Dispatch} from "react";
import {RegistrationDataType, passwordAPI} from "../api/api";

const REGISTRATION = "REGISTRATION"
const ERROR = "ERROR"
const LOADING = "LOADING"

const initState = {
    isRegistration: false,
    isError: false,
    titleError: '',
    isLoading: false
};
type initStateType = {
    isRegistration: boolean
    isError: boolean
    titleError: string
    isLoading: boolean
}

type ActionType = RegistrationType | ErrorType | LoadingType

export const registrationReducer = (state = initState, action: ActionType): initStateType => {
    switch (action.type) {
        case REGISTRATION: {
            return {...state, isRegistration: true};
        }
        case ERROR: {
            return {...state, isError: true, titleError: action.titleError};
        }
        case LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        default: return state;
    }
};
type RegistrationType = {
    type: typeof REGISTRATION
}
type ErrorType = {
    type: typeof ERROR
    titleError: string
}
type LoadingType = {
    type: typeof LOADING
    isLoading: boolean
}
export const registrationAC = (): RegistrationType => {
    return {type: 'REGISTRATION'}
};
export const errorAC = (titleError:string,): ErrorType => {
    return {type: 'ERROR', titleError: titleError}
};
export const loadingAC = (isLoading:boolean): LoadingType => {
    return {type: 'LOADING', isLoading: isLoading}
};

type ResponseErrorType = {
    response:DataType
}
type DataType = {
        data : {
            error: string
            in: string
            isEmailValid?: boolean
            isPassValid?: boolean
            passwordRegExp?: string
        }
}

export const registrationThunkCreator = (registrationData:RegistrationDataType) => (dispatch:Dispatch<any>) => {
                dispatch(loadingAC(true))
            passwordAPI.registration(registrationData)
                .then((data) => {
                    dispatch(registrationAC())
                })
                .catch((error: ResponseErrorType)=>{
                    dispatch(errorAC(error.response.data.error))
                })
                .finally(()=>{
                    dispatch(loadingAC(false))
            })

}