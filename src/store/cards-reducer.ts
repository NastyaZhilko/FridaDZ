import {cardsApi, CardType} from "../api/api";



type ActionsType = ReturnType<typeof setCardsAC>

type InitialStateType = typeof initialState

const initialState = {
    cards: [] as CardType[]
}


export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-CARDS':
            return {...state, cards: action.cards}

        default:
            return state
    }
}

export const setCardsAC = (cards: Array<CardType>, packId:string) => ({type: 'SET-CARDS', cards, packId} as const)


export const getCardsTC = (packId:string) =>
    async (dispatch: any) => {
        try {
            const response = await cardsApi.getCards(packId)
            const cards = response.data.cards
            dispatch(setCardsAC(cards, packId))
        } catch (error) {
        }
    }






