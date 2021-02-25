import {CardPacksType, packsAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";


export type IsLoadingValuesType = 'loading' | 'idle'

type InitStateType = typeof initState
const initState = {
    status: "idle" as IsLoadingValuesType,
    error: null as string|null,
    packs:[] as Array<CardPacksType>,
    packsTotalCount:1,
    pageCount: 10,
    page:1,
    sortPacks: '0created',
    minCardsCount:0,
    maxCardsCount:10,
    inputValueSearch:'',
    showSuccessModal: false
}
type ThunkType = ThunkAction<void, AppStoreType, unknown, ActionsType>
type ActionsType=
    ReturnType<typeof setErrorAC>
    |ReturnType<typeof setIsLoadingAC>
    |ReturnType<typeof getPacksAC>
    |ReturnType<typeof searchedPacksAC>
    |ReturnType<typeof sortPacksUPAC>
    |ReturnType<typeof sortPacksDownAC>
    |ReturnType<typeof sortPacksDownAC>
    |ReturnType<typeof cardsCountAC>
    |ReturnType<typeof setShowSuccessModalAC>

function packsReducer(state=initState, action:ActionsType):InitStateType {

    switch (action.type){

        case "SET-IS-LOADING":
            return {...state, status: action.status}

        case "SET-ERROR":
            return {...state, error: action.error}

        case 'GET-PACKS':{

            return  {...state, packs: action.filteredPacks, packsTotalCount: action.packsTotalCount,
                pageCount: action.pageCount, page: action.page}
            //return  {...state, newCards: action.newCards, packsTotalCount: action.packsTotalCount}
        }
        case 'SEARCHED-PACKS':{

            return {...state, packs: action.filteredPacks, page: action.page, pageCount: action.pageCount, inputValueSearch: action.inputValueSearch}

        }
        case 'SORT-PACKS-UP':{
            return {...state, packs: action.filteredPacks, sortPacks: action.sortPacksByDateUp}
        }
        case 'SORT-PACKS-DOWN':{
            return {...state, packs: action.filteredPacks, sortPacks: action.sortPacksByDateDown}
        }
        case 'CARDS-COUNT':{

            return {...state,packs: action.packs, minCardsCount: action.min, maxCardsCount: action.max, packsTotalCount: action.packsTotalCount}
        }
        case "SET-SHOW-SUCCESS-MODAL":
            return {...state, showSuccessModal: action.show}

        default:
            return initState
    }
}
export default packsReducer

//actions

const setErrorAC = (error: string | null) => ({type: "SET-ERROR", error} as const)
const setIsLoadingAC = (status: IsLoadingValuesType) => ({type: "SET-IS-LOADING", status} as const)
const getPacksAC = (filteredPacks: Array<CardPacksType>, packsTotalCount: number, page: number, pageCount: number) =>
    ({type:'GET-PACKS', filteredPacks, packsTotalCount, page, pageCount } as const)
const searchedPacksAC = (filteredPacks: Array<CardPacksType>, page: number, pageCount: number, inputValueSearch: string) =>
    ({type: 'SEARCHED-PACKS', filteredPacks, page, pageCount, inputValueSearch } as const)
const sortPacksUPAC = (filteredPacks: Array<CardPacksType>, sortPacksByDateUp:string) =>
    ({type: 'SORT-PACKS-UP', filteredPacks, sortPacksByDateUp} as const)
const sortPacksDownAC = (filteredPacks: Array<CardPacksType>, sortPacksByDateDown:string) =>
    ({type: 'SORT-PACKS-DOWN', filteredPacks, sortPacksByDateDown} as const)
const cardsCountAC = (packs:Array<CardPacksType>,  min:number, max:number, packsTotalCount:number) =>
    ({type:'CARDS-COUNT',packs,  min, max, packsTotalCount} as const)
export const setShowSuccessModalAC = (show: boolean) => ({type: "SET-SHOW-SUCCESS-MODAL", show} as const)


//thunks
export const getPacksTC = () : ThunkType=> (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.getCardPacks().then((data)=>{

        const packsTotalCount= data.data.cardPacksTotalCount
        const filteredPacks = data.data.cardPacks
        const page = data.data.page
        const pageCount = data.data.pageCount
        dispatch(getPacksAC(filteredPacks, packsTotalCount, page, pageCount))//rangeMin, rangeMax
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

export const packsTC = (page: number, pageCount:number, sortPacks:string, min:number, max:number, inputValueSearch:string ) :
    ThunkType=> (dispatch) => {
    packsAPI.getCardPacks(page, pageCount, sortPacks, min,  max).then((cards)=>{
        const packsTotalCount= cards.data.cardPacksTotalCount
        const packs = cards.data.cardPacks
        const filteredPacks = packs.filter((pack: CardPacksType) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })

        dispatch(dispatch(getPacksAC(filteredPacks, packsTotalCount, page, pageCount)))
    })
}
export const changeInputTC = (e:any, page:number, pageCount:number, sortPacks:string, min:number, max:number):
    ThunkType  =>(dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.getCardPacks(page, pageCount, sortPacks, min, max).then((data) => {

        const packs = data.data.cardPacks
        const page = data.data.page
        const pageCount = data.data.pageCount
        const inputValueSearch = e.target.value.toLowerCase().trim()
        const filteredPacks = packs.filter((pack: CardPacksType) => {
            return pack.name.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) !== -1

        })

        dispatch(searchedPacksAC(filteredPacks, page, pageCount, inputValueSearch))

    })
}
export const sortByDateUpTC =
    (page:number, pageCount:number, sortPacksByDateUp:string, min:number, max:number, inputValueSearch:string):
        ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateUp, min, max).then((data)=>{
        const packs = data.data.cardPacks
        const filteredPacks = packs.filter((pack: CardPacksType) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })
        dispatch(sortPacksUPAC(filteredPacks, sortPacksByDateUp))
    })
}

export const sortByDateDown = (page:number, pageCount:number, sortPacksByDateDown:string, min:number, max:number, inputValueSearch:any): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateDown, min, max).then((data)=>{
        const packs = data.data.cardPacks
        const filteredPacks = packs.filter((pack: CardPacksType) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })
        dispatch(sortPacksDownAC(filteredPacks, sortPacksByDateDown))
    })
}

export const changeSliderTC = (page:number, pageCount:number, sortPacks:string, min:number,max:number): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.getCardPacks(page, pageCount, sortPacks, min,max ).then(data=>{
        const packs = data.data.cardPacks
        const packsTotalCount= data.data.cardPacksTotalCount
        dispatch(cardsCountAC(packs,  min, max, packsTotalCount))


    })
}

export const createPackTC = (): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.createPack()
        .then(res => {
            dispatch(getPacksTC())
            dispatch(setIsLoadingAC("idle"))
            dispatch(setShowSuccessModalAC(true))
            setTimeout(() => {
                dispatch(setShowSuccessModalAC(false))
            }, 2000)
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


export const deletePackTC = (id: string): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.deletePack(id)
        .then(res => {
            dispatch(getPacksTC())
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

export const updatePackTC = (id: string, name: string): ThunkType => (dispatch) => {
    dispatch(setIsLoadingAC("loading"))
    packsAPI.updatePack(id, name)
        .then(res => {
            dispatch(getPacksTC())
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