import {cardsAPI} from "../api/api";

const initState = {
    cards: [{
        question:'',
        answer:'',
        updated:''
    }],
}

export function packCardsReducer(state=initState, action:any){
    switch(action.type){
        case 'GET-CARDS':{
            return {...state, cards: action.cards}
        }
        default:
            return state
    }
}
export const packCardsTC = (packId:string) => (dispatch:any) => {
    cardsAPI.getCards(packId).then(data=>{
        const cards = data.data.cards
        dispatch({type: 'GET-CARDS', cards})
    })

}