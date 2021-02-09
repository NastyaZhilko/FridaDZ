import {instance} from "./instance";

export type ForgotParamsType={
    email:string
    from:string
    message:boolean
}

export type SetNewPasswordParamsType={
    password:string
    resetPasswordToken:string
}

export type ResponseNewPasswordType={
    info: string
    error:string
}

export const passwordAPI = {
    forgot(data:ForgotParamsType) {
        return instance.post<ResponseNewPasswordType>('auth/forgot', data)
    },

    setNewPassword(data:SetNewPasswordParamsType) {
        return instance.post<ResponseNewPasswordType>('auth/set-new-password', data)
    }
};
