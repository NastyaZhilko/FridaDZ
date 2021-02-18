import { packsAPI} from "../api/api";

const initState = {
    newCards:[{}],
    packsTotalCount:1,
    pageCount: 10,
    page:1,
    // rangeMin: 3,
    // rangeMax:13,
    sortPacks: '0created',
    minCardsCount:0,
    maxCardsCount:10,
}

function cardsReducer(state=initState, action:any){

    switch (action.type){

        case 'GET-PACKS':{

            return  {...state, newCards: action.newCards, packsTotalCount: action.packsTotalCount, pageCount: action.pageCount, page: action.page, rangeMin: action.rangeMin, rangeMax: action.rangeMax}
            //return  {...state, newCards: action.newCards, packsTotalCount: action.packsTotalCount}
        }
        case 'SEARCHED-PACKS':{

            return {...state, newCards: action.arr, page: action.page, pageCount: action.pageCount}

        }
        case 'SORT-PACKS-UP':{
            return {...state, newCards: action.newCards, sortPacks: action.sortPacksByDateUp}
        }
        case 'SORT-PACKS-DOWN':{
            return {...state, newCards: action.newCards, sortPacks: action.sortPacksByDateDown}
        }
        case 'CARDS-COUNT':{

            return {...state,newCards: action.newCards, minCardsCount: action.min, maxCardsCount: action.max}
        }
        default:
            return initState
    }
}
export default cardsReducer

// export const cardsTC = () => (dispatch:any) => {
//     cardPacksAPI.getCardPacks(1, 10).then((cards)=>{
//         const packsTotalCount= cards.data.cardPacksTotalCount
//          const newCards = cards.data.cardPacks
//         dispatch({type:'GET-PACKS', newCards, packsTotalCount})
//     })
//
// }

export const getPacksTC = () => (dispatch:any) => {
  // const initPage = 1
  // const initPageCount = 10

    packsAPI.getPacks().then((data)=>{
        const packsTotalCount= data.data.cardPacksTotalCount
         const newCards = data.data.cardPacks
         const page = data.data.page
         const pageCount = data.data.pageCount
         // const rangeMin = data.data.minCardsCount
         // const rangeMax = data.data.maxCardsCount
        dispatch({type:'GET-PACKS', newCards, packsTotalCount, page, pageCount })//rangeMin, rangeMax
        //dispatch({type:'GET-PACKS', newCards, packsTotalCount})
    })
}

export const packsTC = (page: number, pageCount:number, sortPacks:any, min:any, max:any) => (dispatch:any) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,  max).then((cards)=>{
        const packsTotalCount= cards.data.cardPacksTotalCount
        const newCards = cards.data.cardPacks

        dispatch({type:'GET-PACKS', newCards, packsTotalCount, pageCount:pageCount, page:page})
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
        const newCards = data.data.cardPacks
        dispatch({type: 'SORT-PACKS-UP', newCards, sortPacksByDateUp})
    })
}

export const sortByDateUpDown = (page:any, pageCount:any, sortPacksByDateDown:string, min:any, max:any) => (dispatch:any) => {
    packsAPI.getCardPacks(page, pageCount, sortPacksByDateDown, min, max).then((data)=>{
        const newCards = data.data.cardPacks
        dispatch({type: 'SORT-PACKS-DOWN', newCards, sortPacksByDateDown})
    })
}

export const changeSliderTC = (page:any, pageCount:any, sortPacks:any, min:any,max:any) => (dispatch:any) => {

    packsAPI.getCardPacks(page, pageCount, sortPacks, min,max ).then(data=>{

        const minCardsCount = data.data.minCardsCount
        const maxCardsCount = data.data.maxCardsCount
        const newCards = data.data.cardPacks
        dispatch({type:'CARDS-COUNT',newCards,  min, max})


    })
}