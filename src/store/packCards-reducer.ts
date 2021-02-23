import {cardsAPI, CardType, packsAPI} from "../api/api";
import {getPacksTC, IsLoadingValuesType} from "./packs-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";

type InitialStateType= typeof initialState

const initialState = {
    status: "idle" as IsLoadingValuesType,
    error: null as string|null,
    cards: [] as Array<CardType>,
}

type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsType>
type ActionsType = ReturnType<typeof setErrorAC>
    |ReturnType<typeof setIsLoadingAC>
    |ReturnType<typeof getCardsAC>

export function packCardsReducer(state=initialState, action:ActionsType):InitialStateType{
    switch(action.type){
        case "SET-IS-LOADING":
            return {...state, status: action.status}

        case "SET-ERROR":
            return {...state, error: action.error}

        case 'GET-CARDS':{
            return {...state, cards: action.cards}
        }
        default:
            return state
    }
}
//actions
const setErrorAC = (error: string | null) => ({type: "SET-ERROR", error} as const)

const setIsLoadingAC = (status: IsLoadingValuesType) => ({type: "SET-IS-LOADING", status} as const)

const getCardsAC = (cards: Array<CardType>) => ({type: 'GET-CARDS', cards} as const)

export const getCardsTC = (packId:string):ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    cardsAPI.getCards(packId).then(data=>{
        const cards = data.data.cards
        dispatch(getCardsAC(cards))
        dispatch(setIsLoadingAC("idle"))
    })
        .catch(err => {
        if (err.response) {
            dispatch(setErrorAC(err.response.data.error))
        } else {
            dispatch(setErrorAC("Some error"))
        }
        dispatch(setIsLoadingAC("idle"))
    })
}

export const createCardTC = (cardsPack_id: string): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    cardsAPI.createCard(cardsPack_id)
        .then(data => {
            const cards = data.data.cards
            dispatch(getCardsTC(cardsPack_id))
            dispatch(setIsLoadingAC("idle"))
        })
        .catch(err => {
            if (err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setIsLoadingAC("idle"))
        })
}


export const deleteCardTC = (id: string, packId: string): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    cardsAPI.deleteCard(id)
        .then(res => {
            dispatch(getCardsTC(packId))
            dispatch(setIsLoadingAC("idle"))
        })
        .catch(err => {
            if (err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setIsLoadingAC("idle"))
        })
}

export const updateCardTC = (id: string, packId: string): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    cardsAPI.updateCard(id)
        .then(res => {
            dispatch(getCardsTC(packId))
            dispatch(setIsLoadingAC("idle"))
        })
        .catch(err => {
            if (err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setIsLoadingAC("idle"))
        })
}