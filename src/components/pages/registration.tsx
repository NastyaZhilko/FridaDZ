import React, {FormEvent, useState} from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registrationAC, registrationThunkCreator} from "../../store/registration-reducer";
import { Redirect } from "react-router-dom";

function Registration() {
    const dispatch = useDispatch()
    const isRegistration = useSelector<any,any>((state)=>state.registration.isRegistration)
    const isError = useSelector<any,any>((state)=>state.registration.isError)
    //const titleError = useSelector<any,any>((state)=>state.registration.titleError)
    const [passwordLength, setPasswordLength] = useState(true)
    const [passwordError, setPasswordError] = useState(false)
    const [buttonColor, setButtonColor] = useState('')
    function submit(e:any){ // e:React.FormEvent<HTMLFormElement>
        e.preventDefault();
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        dispatch(registrationThunkCreator(obj))
    }

    function changePassword(e:any){
        console.log(e.currentTarget.value.length)
        if(e.currentTarget.value.length >= 7){
            setPasswordLength(false)
            setPasswordError(false)
            setButtonColor('green')
        }else{
            setPasswordLength(true)
            setButtonColor('')
        }
    }
    function blur(e:any){
        console.log(e.target.value)
        if(e.currentTarget.value.length < 7){
            setPasswordError(true)
        }
    }

    if(isRegistration){
        return <Redirect to={'/login'}/>
    }
    return (
        <form onSubmit={submit} style={{marginTop:'50px'}}>
            <div><label>Email<SuperInputText name={'email'}/></label></div>
            <div><label>Password<SuperInputText type={'password'} name={'password'} onChange={changePassword} onBlur={blur}/></label></div>
            {passwordError && <div style={{color:"red"}}>{'Password must be more than 7 characters...'}</div>}
            <div><SuperButton disabled={passwordLength} style={{background:buttonColor}}>registration</SuperButton></div>
            {isError && <div style={{color:"red"}}>{'not valid email'}</div>}
        </form>
    );
}

export default Registration;