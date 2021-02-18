import { packsAPI} from "../api/api";

const initState = {
    packs:[{}],
    packsTotalCount:1,
    pageCount: 10,
    page:1,
    sortPacks: '0created',
    minCardsCount:0,
    maxCardsCount:10,
}

function packsReducer(state=initState, action:any){

    switch (action.type){

        case 'GET-PACKS':{

            return  {...state, packs: action.packs, packsTotalCount: action.packsTotalCount, pageCount: action.pageCount, page: action.page, rangeMin: action.rangeMin, rangeMax: action.rangeMax}
            //return  {...state, newCards: action.newCards, packsTotalCount: action.packsTotalCount}
        }
        case 'SEARCHED-PACKS':{

            return {...state, packs: action.arr, page: action.page, pageCount: action.pageCount}

        }
        case 'SORT-PACKS-UP':{
            return {...state, packs: action.packs, sortPacks: action.sortPacksByDateUp}
        }
        case 'SORT-PACKS-DOWN':{
            return {...state, packs: action.packs, sortPacks: action.sortPacksByDateDown}
        }
        case 'CARDS-COUNT':{

            return {...state,packs: action.packs, minCardsCount: action.min, maxCardsCount: action.max}
        }
        default:
            return initState
    }
}
export default packsReducer


export const getPacksTC = () => (dispatch:any) => {


    packsAPI.getCardPacks().then((data)=>{
        const packsTotalCount= data.data.cardPacksTotalCount
         const packs = data.data.cardPacks
         const page = data.data.page
         const pageCount = data.data.pageCount
        dispatch({type:'GET-PACKS', packs, packsTotalCount, page, pageCount })//rangeMin, rangeMax
    })
}

export const packsTC = (page: number, pageCount:number, sortPacks:any, min:any, max:any) => (dispatch:any) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,  max).then((cards)=>{
        const packsTotalCount= cards.data.cardPacksTotalCount
        const packs = cards.data.cardPacks

        dispatch({type:'GET-PACKS', packs, packsTotalCount, pageCount:pageCount, page:page})
    })
}
export const changeInputTC = (e:any, page:any, pageCount:any, sortPacks:any, min:any, max:any) => (dispatch:any) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min, max).then((data) => {

        const cards = data.data.cardPacks
        const page = data.data.page
        const pageCount = data.data.pageCount

        const arr = cards.filter((card: any) => {
            return card.name.toLowerCase().indexOf(e.target.value.toLowerCase().trim()) !== -1

        })

        dispatch({type: 'SEARCHED-PACKS', arr, page, pageCount })

    })
}
export const sortByDateUpTC = (page:any, pageCount:any, sortPacksByDateUp:string, min:any, max:any) => (dispatch:any) => {
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateUp, min, max).then((data)=>{
        const packs = data.data.cardPacks
        dispatch({type: 'SORT-PACKS-UP', packs, sortPacksByDateUp})
    })
}

export const sortByDateUpDown = (page:any, pageCount:any, sortPacksByDateDown:string, min:any, max:any) => (dispatch:any) => {
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateDown, min, max).then((data)=>{
        const packs = data.data.cardPacks
        dispatch({type: 'SORT-PACKS-DOWN', packs, sortPacksByDateDown})
    })
}

export const changeSliderTC = (page:any, pageCount:any, sortPacks:any, min:any,max:any) => (dispatch:any) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,max ).then(data=>{
        const packs = data.data.cardPacks
        dispatch({type:'CARDS-COUNT',packs,  min, max})


    })
}