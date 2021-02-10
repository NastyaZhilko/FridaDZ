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
export type RegistrationDataType = {
    email: string
    password: string
}
export type ResponseRegistrationDataType = {
        addedUser:{
            _id: string
            email: string
            rememberMe: boolean
            isAdmin: boolean
            name: string
            verified: boolean
            publicCardPacksCount: number
            created: string
            updated: string
        }
}
export const passwordAPI = {
    forgot(email:string) {
        return api.post<ResponseNewPasswordType>('auth/forgot', email)
    },

    setNewPassword(data:SetNewPasswordParamsType) {
        return api.post<ResponseNewPasswordType>('auth/set-new-password', data)
    },

    registration(data:RegistrationDataType){
        return api.post<ResponseRegistrationDataType>('auth/register', data)
    }
};