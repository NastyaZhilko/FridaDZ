
const initState = {

};

export const errorReducer = (state = initState, action: any): any => {
    switch (action.type) {
        case "": {
            return state;
        }
        default: return state;
    }
};

export const errorAC = (): any => {};