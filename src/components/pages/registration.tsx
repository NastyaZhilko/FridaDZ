import React, {FormEvent, useState} from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registrationAC, registrationThunkCreator} from "../../store/registration-reducer";
import { Redirect } from "react-router-dom";
import {log} from "util";
import SuperPassword from "../common/SuperButton/SuperPassword/SuperPassword";
import Loading from "./Loading";
import {AppStoreType} from "../../store/store";

function Registration() {
    const dispatch = useDispatch()
    const isRegistration = useSelector<AppStoreType,boolean>((state)=>state.registration.isRegistration)
    const isError = useSelector<AppStoreType,boolean>((state)=>state.registration.isError)
    const titleError = useSelector<AppStoreType,string>((state)=>state.registration.titleError)
    const isLoading = useSelector<AppStoreType,boolean>((state)=>state.registration.isLoading)
    const [passwordLength, setPasswordLength] = useState(true)
    const [emailLength, setEmailLength] = useState(true)
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    function submit(e:any){ // e:React.FormEvent<HTMLFormElement>
        e.preventDefault();
        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        dispatch(registrationThunkCreator(obj))
    }

    function changePassword(e:any){
        setPasswordValue(e.currentTarget.value)
        if(e.currentTarget.value.length >= 7){
            setPasswordLength(false)
            setPasswordError(false)

        }else{
            setPasswordLength(true)
        }
    }
    function changEmail(e:any){
        setEmailValue(e.currentTarget.value)
        if(e.currentTarget.value.length >= 7 && (e.currentTarget.value.indexOf("@") !== -1)){
            setEmailLength(false)
            setEmailError(false)
        }else{
            setEmailLength(true)
        }
    }

    function blurPassword(e:any){
        if(e.currentTarget.value.length < 7){
            setPasswordError(true)
        }
    }

    function blurEmail(e:any){
        if(e.currentTarget.value.length < 7 || (e.currentTarget.value.indexOf("@") == -1)){
            setEmailError(true)
        }
    }

    if(isLoading){
        return(
            <Loading/>
        )
    }
    if(isRegistration){
        return <Redirect to={'/login'}/>
    }

    return (
        <form onSubmit={submit} style={{marginTop:'50px'}}>
            <div><label>Email<SuperInputText name={'email'} onChange={changEmail} value={emailValue} onBlur={blurEmail} /></label></div>
            <div style={{height:'50px'}}>{emailError && <div style={{color:"red"}}>{'not valid email'}</div>}</div>
            <div><label>Password<SuperPassword type={'password'} name={'password'} onChange={changePassword} value={passwordValue} onBlur={blurPassword}/></label></div>
            <div style={{height:'50px'}}>{passwordError && <div style={{color:"red"}}>{'Password must be more than 7 characters...'}</div>}</div>
            <div><SuperButton disabled={passwordLength || emailLength} style={(passwordLength || emailLength)? undefined: {background:"green"}}>registration</SuperButton></div>
            {isError && <div style={{color:"red"}}>{titleError}</div>}
        </form>
    );
}

export default Registration;