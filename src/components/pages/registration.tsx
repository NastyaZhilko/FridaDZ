
import React from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registrationAC, registrationThunkCreator} from "../../store/registration-reducer";
import { Redirect } from "react-router-dom";

function Registration() {
    const dispatch = useDispatch()
    const isRegistration = useSelector<any,any>((state)=>state.registration.isRegistration)
    const isError = useSelector<any,any>((state)=>state.registration.isError)
    const titleError = useSelector<any,any>((state)=>state.registration.titleError)
    const passwordRegExp = useSelector<any,any>((state)=>state.registration.passwordRegExp)
    function foo(e:any){
        e.preventDefault();
        // console.log(e.target.email.value)
        // console.log(e.target.password.value)
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        dispatch(registrationThunkCreator(obj))
    }

    if(isRegistration){
        return <Redirect to={'/login'}/>
    }
    return (
        // <div>Registration</div>
        <form onSubmit={foo}>
            <div><label>Email<SuperInputText name={'email'}/></label></div>
            <div><label>Password<input type={'password'} name={'password'}/></label></div>
            <div><SuperButton>registration</SuperButton></div>
            {isError && <div style = {{color:"red"}}>{titleError}</div>}
            {/*{passwordRegExp && <div style = {{color:"red"}}>Password must be more than 7 characters...</div>}*/}
        </form>
    );
}

export default Registration;