export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
}


const initState: LoginFormData = {
    email: "nya-admin@nya.nya",
    password: "1qazxcvBG",
    rememberMe: false,
};

export const loginReducer = (state = initState, action: LoginActionType): any => {
    switch (action.type) {
        case "LOGIN": {
            return state;
        }
        default:
            return state;
    }
};

type LoginActionType = ReturnType<typeof loginAC>

export const loginAC = (data: LoginFormData) => ({type: 'LOGIN', data } as const);

