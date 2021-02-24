import axios from "axios";
import {LoginFormData} from "../store/login-reducer";

const api = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    //baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})


export type SetNewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}

export type ResponseRestoreType = {
    info: string
    error: string
}
export type RegistrationDataType = {
    email: string
    password: string
}
export type ResponseRegistrationDataType = {
    addedUser: {
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
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">
              password recovery link: 	
              <a href='http://localhost:3000/FridaDZ#/newPassword/$token$'>	
              Link </a></div>`
        })
    },

    setNewPassword(password: string, resetPasswordToken: string) {
        return api.post<ResponseRestoreType>('auth/set-new-password', {password, resetPasswordToken})
    },

    registration(data: RegistrationDataType) {
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

//типизация и апи для колод;
export type CardsPackDataType = {
    name: string
}
export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
export type CardPacksResponseType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type UpdatePacksDataType = {
    _id: string
    name?: string
}

export type CreateCardRequestType = {
    cardsPack_id: string
    question?: string
    answer?: string
}



export const packsAPI = {

    getCardPacks(
        page: number = 1,
        pageCount: number = 10,
        sortPacks: string = '0created',
        min: number = 0,
        max: number = 24
    ) {
        return api.get<CardPacksResponseType>('cards/pack', {

            params: {
                page,
                pageCount,
                sortPacks,
                min,
                max,
                //user_id:'5eecf82a3ed8f700042f1186'
            }
        })
    },
    createPack() {
        return api.post(`cards/pack`, {cardsPack: {name: "MNV"}})
    },
    deletePack(id: string) {
        return api.delete(`cards/pack`, {params: {id}})
    },
    updatePack(id: string, name: string) {
        return api.put(`cards/pack/`, {cardsPack: {_id: id, name}})
    }
}




//типизация и апи для карточек

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    questionImg:string
    comments:string
    type: string
    rating: number
    more_id:string
    created: string
    updated: string
    __v: number

}



export type CardsResponseType={
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string

}
export const cardsAPI = {
    getCards(packId: string) {
        return api.get('cards/card/', {
            params: {
                cardsPack_id: packId,
                pageCount: 24
            }
        })
    },
    createCard(cardId:string){
        return api.post(`cards/card`,{card:{cardId,question:'',answer:''}})
    },
    deleteCard(cardId:string){
        return api.delete(`cards/card`,{params: {cardId}})
    },
    updateCard(cardId:string){
        return api.put(`cards/card`,{card:{cardId,question:'',comments:''}})
    }
}
export const gradeCardAPI = {
    gradeCard({grade, card_id}:any){
        return api.put("cards/grade", {grade, card_id})
    }
}