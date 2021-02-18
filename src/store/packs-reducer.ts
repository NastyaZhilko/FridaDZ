<<<<<<< HEAD
import {CardPacksType, cardsPacksAPI, CardType} from "../api/api";
import {AppStoreType} from "./store";

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
    sortPacks: '0created'

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
        case 'SORT-PACKS-UP': {
            return {...state, cardPacks: action.cardPacks, sortPacks: action.sortPacksByDateUp}
        }
        case 'SORT-PACKS-DOWN': {
            return {...state, cardPacks: action.cardPacks, sortPacks: action.sortPacksByDateDown}
        }
        case 'CARDS-COUNT': {

            return {
                ...state,
                cardPacks: action.cardPacks,
                minCardsCount: action.minCardsCount,
                maxCardsCount: action.maxCardsCount
            }
        }
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

const sortPuckUpAC = (cardPacks: Array<CardPacksType>, sortPacksByDateUp: string) => {
    return {type: 'SORT-PACKS-UP', cardPacks, sortPacksByDateUp} as const
}

const sortPuckDownAC = (cardPacks: Array<CardPacksType>, sortPacksByDateDown: string) => {
    return {type: 'SORT-PACKS-DOWN', cardPacks, sortPacksByDateDown} as const
}
const cardsCountAC = (cardPacks: Array<CardPacksType>, minCardsCount: number, maxCardsCount: number) => {
    return {type: 'CARDS-COUNT', cardPacks, minCardsCount, maxCardsCount} as const
}
export const sortByDateUpTC = (page: any, pageCount: any, sortPacksByDateUp: string, min: any, max: any) => (dispatch: any) => {
    cardsPacksAPI.getPacks(page, pageCount, sortPacksByDateUp, min, max).then((data) => {
        const newCards = data.data.cardPacks
        dispatch({type: 'SORT-PACKS-UP', newCards, sortPacksByDateUp})
    })
}

export const sortByDateUpDown = (page: any, pageCount: any, sortPacksByDateDown: string, min: any, max: any) => (dispatch: any) => {
    cardsPacksAPI.getPacks(page, pageCount, sortPacksByDateDown, min, max).then((data) => {
        const newCards = data.data.cardPacks
        dispatch({type: 'SORT-PACKS-DOWN', newCards, sortPacksByDateDown})
    })
}

export const changeSliderTC = (page: any, pageCount: any, sortPacks: any, min: any, max: any) => (dispatch: any, getState: () => AppStoreType) => {
    const minCardsCount = getState().packs.minCardsCount
    const maxCardsCount = getState().packs.maxCardsCount
    const newCards = getState().packs.cardPacks
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount
    const sortPacks = getState().packs.sortPacks

    cardsPacksAPI.getPacks(page, pageCount, sortPacks, minCardsCount, maxCardsCount).then(res => {
        dispatch(cardsCountAC(newCards, minCardsCount, maxCardsCount))


    })
}

/*export const getCardPacksTC = () =>
    (dispatch: any, getState: () => AppStoreType) => {
        dispatch(setLoadingAC('loading'))

        const searchName = getState().packs.searchName
        const minCardsCount = getState().packs.minCardsCount
        const maxCardsCount = getState().packs.maxCardsCount
        const cardPacksTotalCount = getState().packs.cardPacksTotalCount
        const page = getState().packs.page
        const sortPacks = getState().packs.sortPacks
        cardsPacksAPI.getPacks(searchName, minCardsCount, maxCardsCount, cardPacksTotalCount, page, sortPacks)
            .then(res => {
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
    }*/
/*export const deletePackTC = (id: string) => (dispatch: any) => {
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
}*/

/*export const updatePackTC = (id: string, name: string) => (dispatch: any) => {
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
}*/
type ActionsType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setLoadingAC>
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setSearchValueAC>
    | ReturnType<typeof setPacksOnPageAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalPacksAC>
    | ReturnType<typeof sortPuckUpAC>
    | ReturnType<typeof sortPuckDownAC>
    | ReturnType<typeof cardsCountAC>

=======
import { packsAPI} from "../api/api";

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

function packsReducer(state=initState, action:any){

    switch (action.type){

        case 'GET-PACKS':{

            return  {...state, packs: action.filteredPacks, packsTotalCount: action.packsTotalCount, pageCount: action.pageCount, page: action.page, rangeMin: action.rangeMin, rangeMax: action.rangeMax}
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


export const getPacksTC = () => (dispatch:any) => {


    packsAPI.getCardPacks().then((data)=>{
        const packsTotalCount= data.data.cardPacksTotalCount
         const filteredPacks = data.data.cardPacks
         const page = data.data.page
         const pageCount = data.data.pageCount
        dispatch({type:'GET-PACKS', filteredPacks, packsTotalCount, page, pageCount })//rangeMin, rangeMax
    })
}

export const packsTC = (page: number, pageCount:number, sortPacks:any, min:any, max:any, inputValueSearch:any ) => (dispatch:any) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,  max).then((cards)=>{
        const packsTotalCount= cards.data.cardPacksTotalCount
        const packs = cards.data.cardPacks
        const filteredPacks = packs.filter((pack: any) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })

        dispatch({type:'GET-PACKS', filteredPacks, packsTotalCount, pageCount:pageCount, page:page})
    })
}
export const changeInputTC = (e:any, page:any, pageCount:any, sortPacks:any, min:any, max:any) => (dispatch:any) => {

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
export const sortByDateUpTC = (page:any, pageCount:any, sortPacksByDateUp:string, min:any, max:any, inputValueSearch:any) => (dispatch:any) => {
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateUp, min, max).then((data)=>{
        const packs = data.data.cardPacks
        const filteredPacks = packs.filter((pack: any) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })
        dispatch({type: 'SORT-PACKS-UP', filteredPacks, sortPacksByDateUp})
    })
}

export const sortByDateDown = (page:any, pageCount:any, sortPacksByDateDown:string, min:any, max:any, inputValueSearch:any) => (dispatch:any) => {
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateDown, min, max).then((data)=>{
        const packs = data.data.cardPacks
        const filteredPacks = packs.filter((pack: any) => {
            return pack.name.toLowerCase().indexOf(inputValueSearch) !== -1

        })
        dispatch({type: 'SORT-PACKS-DOWN', filteredPacks, sortPacksByDateDown})
    })
}

export const changeSliderTC = (page:any, pageCount:any, sortPacks:any, min:any,max:any) => (dispatch:any) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,max ).then(data=>{
        const packs = data.data.cardPacks
        const packsTotalCount= data.data.cardPacksTotalCount
        dispatch({type:'CARDS-COUNT',packs,  min, max, packsTotalCount})


    })
}
>>>>>>> origin/maxim2
