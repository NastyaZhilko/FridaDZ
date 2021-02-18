type InitialStateType = typeof initialState

const initialState = {
    userId: null as string | null,
    userName: null as string | null,
    avatar: '',
    publicCardPacksCount: null as number | null // количество колод
};

export const profileReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                userName: action.userName,
                publicCardPacksCount: action.publicCardPacksCount,
                userId: action.userId
            }
        default:
            return state;
    }
};

export const profileAC = (userName: string | null, publicCardPacksCount: number | null, userId: string | null) => (
    {type: 'SET-USER-DATA', userName, publicCardPacksCount, userId} as const)

type ActionType = ReturnType<typeof profileAC>