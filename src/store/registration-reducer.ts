import axios from "axios";

const initState = {
    isRegistration: false,
    isError: false,
    titleError: '',
    passwordRegExp: ''
};

export const registrationReducer = (state = initState, action: any): any => {
    switch (action.type) {
        case "REGISTRATION": {
            return {...state, isRegistration: true};
        }
        case "ERROR": {
            return {...state, isError: true, titleError: action.titleError, passwordRegExp: action.passwordRegExp};
        }
        default: return state;
    }
};

export const registrationAC = (): any => {
    return {type: 'REGISTRATION'}
};
export const errorAC = (titleError:any, passwordRegExp:any): any => {
    return {type: 'ERROR', titleError: titleError, passwordRegExp: passwordRegExp }
};
// const obj = {
//     email: "nya-admin11@gmail.com",
//nya-admin@nya.nya
//     password: "1qazxcvBG"
// }
export const registrationThunkCreator = (obj:any) => (dispatch:any) => {
            axios.post("http://localhost:7542/2.0/auth/register", obj)
                .then((data) => {
                    dispatch(registrationAC())
                    console.log(data)
                })
                .catch((error)=>{
                    dispatch(errorAC(error.response.data.error, error.response.data.passwordRegExp))
                    console.log((error.response.data.error))
                })
}