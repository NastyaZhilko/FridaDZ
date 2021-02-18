import {CardPacksType, cardsPacksAPI, CardType} from "../api/api";
import {AppStoreType} from "./store";
import {loadingAC} from "./registration-reducer";
import {Dispatch} from "react";

export type IsLoadingValuesType = 'loading' | 'idle'

type InitialStateType = typeof initialState
const initialState = {
    isLoading: 'idle',
    error: null as string | null,
    cardPacks: [] as Array<CardPacksType>,
    cards: [] as Array<CardType>,
    searchName: '',
    minCardsCount: 0,
    maxCardsCount: 4,
    cardPacksTotalCount: 5,//количество колод
    page: 1,//выбранная страница
    pageCount: 4,


};

export const packsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOADING":
            return {...state, isLoading: action.isLoading}
        case "SET-ERROR":
            return {...state, error: action.error}
        case 'SET-CARDS-PACKS':
            return {...state, cardPacks: action.cardPacks}
        case "SET-SEARCH-VALUE":
            return {
                ...state,
                searchName: action.searchName,
                minCardsCount: action.minCardsCount,
                maxCardsCount: action.maxCardsCount
            }
        case "SET-PACKS-ON-PAGE":
            return {...state, cardPacksTotalCount: action.value}
        case "SET-CURRENT-PAGE":
            return {...state, page: action.currentPage}
        case "SET-TOTAL-PACKS":
            return {...state, pageCount: action.totalPacks}
        default:
            return state
    }
}


export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const setLoadingAC = (isLoading: IsLoadingValuesType) => ({type: 'SET-IS-LOADING', isLoading} as const)
export const setCardPacksAC = (cardPacks: Array<CardPacksType>) => ({type: 'SET-CARDS-PACKS', cardPacks} as const)
export const setCardsAC = (cards: Array<CardType>) => {
    return {type: "SET-CARDS", cards} as const
}
export const setSearchValueAC = (searchName: string, minCardsCount: number, maxCardsCount: number) => {
    return {type: "SET-SEARCH-VALUE", searchName, minCardsCount, maxCardsCount} as const
}
export const setPacksOnPageAC = (value: number) => {
    return {type: "SET-PACKS-ON-PAGE", value} as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {type: "SET-CURRENT-PAGE", currentPage} as const
}
const setTotalPacksAC = (totalPacks: number) => {
    return {type: "SET-TOTAL-PACKS", totalPacks} as const
}

export const getCardPacksTC = () =>
    (dispatch: any, getState: () => AppStoreType) => {
        dispatch(setLoadingAC('loading'))

        const searchName = getState().packs.searchName
        const minCardsCount = getState().packs.minCardsCount
        const maxCardsCount = getState().packs.maxCardsCount
        const cardPacksTotalCount = getState().packs.cardPacksTotalCount
        const page = getState().packs.page

        cardsPacksAPI.getPacks(searchName, minCardsCount, maxCardsCount, cardPacksTotalCount, page)
            .then(res=>{
                dispatch(setCardPacksAC(res.data.cardPacks))
                dispatch(setLoadingAC('idle'))
                dispatch(setTotalPacksAC(res.data.cardPacksTotalCount))
                }
            )
            .catch(err => {
                if (err.response) {
                    dispatch(setErrorAC(err.response.data.error))
                } else {
                    dispatch(setErrorAC("Some error"))
                }
                dispatch(setLoadingAC("idle"))
            })
    }
export const deletePackTC = (id: string) => (dispatch: any) => {
    dispatch(setLoadingAC("loading"))
    cardsPacksAPI.deletePack(id)
        .then(res => {
            dispatch(getCardPacksTC())
            dispatch(setLoadingAC("idle"))
        })
        .catch(err => {
            if (err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setLoadingAC("idle"))
        })
}

export const updatePackTC = (id: string, name: string) => (dispatch: any) => {
    dispatch(setLoadingAC("loading"))
    cardsPacksAPI.updatePack(id, name)
        .then(res => {
            dispatch(getCardPacksTC())
            dispatch(setLoadingAC("idle"))
        })
        .catch(err => {
            if (err.response) {
                dispatch(setErrorAC(err.response.data.error))
            } else {
                dispatch(setErrorAC("Some error"))
            }
            dispatch(setLoadingAC("idle"))
        })
}
type ActionsType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setSearchValueAC>
    | ReturnType<typeof setPacksOnPageAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalPacksAC>

