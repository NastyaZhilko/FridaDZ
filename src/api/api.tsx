import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:7542/2.0/`,
    withCredentials: true
})
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
        return api.post<ResponseNewPasswordType>('auth/forgot', data)
    },

    setNewPassword(data:SetNewPasswordParamsType) {
        return api.post<ResponseNewPasswordType>('auth/set-new-password', data)
    }
};