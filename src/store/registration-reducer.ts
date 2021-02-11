import {Dispatch} from "react";
import {RegistrationDataType, passwordAPI} from "../api/api";

const REGISTRATION = "REGISTRATION"
const ERROR = "ERROR"

const initState = {
    isRegistration: false,
    isError: false,
    titleError: '',
};
type initStateType = {
    isRegistration: boolean
    isError: boolean
    titleError: string
}

type ActionType = RegistrationType | ErrorType

export const registrationReducer = (state = initState, action: ActionType): initStateType => {
    switch (action.type) {
        case REGISTRATION: {
            return {...state, isRegistration: true};
        }
        case ERROR: {
            return {...state, isError: true, titleError: action.titleError};
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
export const registrationAC = (): RegistrationType => {
    return {type: 'REGISTRATION'}
};
export const errorAC = (titleError:string,): ErrorType => {
    return {type: 'ERROR', titleError: titleError}
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
            passwordAPI.registration(registrationData)
                .then((data) => {
                    console.log(data.data.addedUser._id)
                    dispatch(registrationAC())
                })
                .catch((error: ResponseErrorType)=>{
                    console.log(error.response.data.error)
                    console.log(error.response.data.isEmailValid)
                    console.log(error.response.data.isPassValid)
                    dispatch(errorAC(error.response.data.error))
                })
}