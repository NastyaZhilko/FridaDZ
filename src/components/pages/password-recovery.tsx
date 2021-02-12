import React, {ChangeEvent} from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import style from "./password-recovery.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {Redirect} from "react-router-dom";
import {passwordRecoveryTC} from "../../store/password-recovery-reducer";

function PasswordRecovery() {
    const dispatch = useDispatch()
    //const isMailSend = useSelector<AppStoreType, boolean>(state => state.passwordRecovery.isMessageSend)

    const sendMail =(e:any)=>{
        e.preventDefault();
        const email = e.target.email.value
       // alert(email)
        dispatch(passwordRecoveryTC(email))

    }
  /*  if (isMailSend) {
        return <Redirect to={'/login'}/>
    }*/
    return (
        <form onSubmit={sendMail}>
        <div>
            <h3>Password recovery</h3>
            <div className={style.container}>
                <SuperInputText name={'email'}  placeholder="Email"/>
                <span>Enter your email</span>
                <SuperButton>
                    Send
                </SuperButton>
            </div>
        </div>
        </form>
    )
}

export default PasswordRecovery;