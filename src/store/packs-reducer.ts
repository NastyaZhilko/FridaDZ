import { packsAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./store";
type InitStateType = typeof initState
const initState = {
    packs:[{}],
    packsTotalCount:1,
    pageCount: 10,
    page:1,
    sortPacks: '0created',
    minCardsCount:0,
    maxCardsCount:10,
    inputValueSearch:''
}
type ThunkType = ThunkAction<void, AppStoreType, unknown, any>

function packsReducer(state=initState, action:any):InitStateType {

    switch (action.type){

        case 'GET-PACKS':{

            return  {...state, packs: action.filteredPacks, packsTotalCount: action.packsTotalCount, pageCount: action.pageCount, page: action.page, minCardsCount: action.rangeMin, maxCardsCount: action.rangeMax}
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
        default:
            return initState
    }
}
export default packsReducer


export const getPacksTC = () : ThunkType=> (dispatch) => {


    packsAPI.getCardPacks().then((data)=>{
        const packsTotalCount= data.data.cardPacksTotalCount
        const filteredPacks = data.data.cardPacks
        const page = data.data.page
        const pageCount = data.data.pageCount
        dispatch({type:'GET-PACKS', filteredPacks, packsTotalCount, page, pageCount })//rangeMin, rangeMax
    })
}

export const packsTC = (page: number, pageCount:number, sortPacks:any, min:number, max:number, inputValueSearch:any ) : ThunkType=> (dispatch) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,  max).then((cards)=>{
        const packsTotalCount= cards.data.cardPacksTotalCount
        const packs = cards.data.cardPacks
        const filteredPacks = packs.filter((pack: any) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })

        dispatch({type:'GET-PACKS', filteredPacks, packsTotalCount, pageCount:pageCount, page:page})
    })
}
export const changeInputTC = (e:any, page:any, pageCount:any, sortPacks:any, min:number, max:number): ThunkType  =>(dispatch) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min, max).then((data) => {

        const packs = data.data.cardPacks
        const page = data.data.page
        const pageCount = data.data.pageCount
        const inputValueSearch = e.target.value.toLowerCase().trim()
        const filteredPacks = packs.filter((pack: any) => {
            return pack.name.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) !== -1

        })

        dispatch({type: 'SEARCHED-PACKS', filteredPacks, page, pageCount, inputValueSearch })

    })
}
export const sortByDateUpTC = (page:any, pageCount:any, sortPacksByDateUp:string, min:number, max:number, inputValueSearch:any): ThunkType => (dispatch) => {
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateUp, min, max).then((data)=>{
        const packs = data.data.cardPacks
        const filteredPacks = packs.filter((pack: any) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })
        dispatch({type: 'SORT-PACKS-UP', filteredPacks, sortPacksByDateUp})
    })
}

export const sortByDateDown = (page:any, pageCount:any, sortPacksByDateDown:string, min:number, max:number, inputValueSearch:any): ThunkType => (dispatch) => {
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateDown, min, max).then((data)=>{
        const packs = data.data.cardPacks
        const filteredPacks = packs.filter((pack: any) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })
        dispatch({type: 'SORT-PACKS-DOWN', filteredPacks, sortPacksByDateDown})
    })
}

export const changeSliderTC = (page:any, pageCount:any, sortPacks:any, min:number,max:number): ThunkType => (dispatch) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,max ).then(data=>{
        const packs = data.data.cardPacks
        const packsTotalCount= data.data.cardPacksTotalCount
        dispatch({type:'CARDS-COUNT',packs,  min, max, packsTotalCount})


    })
}

export const deletePackTC = (id: string): ThunkType => (dispatch) => {

    packsAPI.deletePack(id)
        .then(res => {
            dispatch(getPacksTC())
        })
}

export const updatePackTC = (id: string, name: string): ThunkType => (dispatch) => {

    packsAPI.updatePack(id, name)
        .then(res => {
            dispatch(getPacksTC() as any)

        })

}