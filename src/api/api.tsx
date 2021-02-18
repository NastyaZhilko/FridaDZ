import axios from "axios";
import {LoginFormData} from "../store/login-reducer";

const api = axios.create({
   baseURL: 'https://neko-back.herokuapp.com/2.0',
    //baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})



export type SetNewPasswordParamsType={
    password:string
    resetPasswordToken:string
}

export type ResponseRestoreType={
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
    forgot(email: string | null) {
        return api.post<ResponseRestoreType>('auth/forgot', {
            email,
            from:"test-front-admin <ai73a@yandex.by>",
            message:`<div style="background-color: lime; padding: 15px">
              password recovery link: 	
              <a href='http://localhost:3000/FridaDZ#/newPassword/$token$'>	
              Link </a></div>`})
    },

    setNewPassword(password: string, resetPasswordToken: string) {
        return api.post<ResponseRestoreType>('auth/set-new-password', {password, resetPasswordToken})
    },

    registration(data:RegistrationDataType){
        return api.post<ResponseRegistrationDataType>('auth/register', data)
    }
};

export const authAPI = {
    login(data: LoginFormData) {
        return api.post('auth/login', data)
    },
    authMe() {
        return api.post('auth/me', {})
    },
    logout() {
        return api.delete('auth/me')
    }
};
export const cardPacksAPI = {
    getCardPacks(
        page:number,
         pageCount:number,
        //sortPacks:string
        // min:number,
        // max:number
    ){
        return api.get<any>('cards/pack',{
            params:{
                page,
                pageCount,
                sortPacks: '1created'
                // min,
                // max,
            }
        })
    }
}

export const packsAPI = {
    getPacks(
        page:number=1,
        pageCount:number=10,
    ){
        return api.get<any>('cards/pack',{
            params:{
                page,
                pageCount,

            }
        })
    },

    getCardPacks(
        page:number=1,
        pageCount:number=10,
        sortPacks: string = '0created',
        min:number=0,
        max:number=24
        // min:number,
        // max:number
    ){
        return api.get<any>('/cards/pack',{

            params:{
                page,
                pageCount,
                sortPacks,
                min,
                max
                // min,
                // max,
            }
        })
    }
}
