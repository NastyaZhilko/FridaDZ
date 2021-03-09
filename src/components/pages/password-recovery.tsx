import React, {ChangeEvent} from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import style from "./password-recovery.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {Redirect} from "react-router-dom";
import {passwordRecoveryTC} from "../../store/password-recovery-reducer";
import Loading from "./Loading";


function PasswordRecovery() {
    const dispatch = useDispatch()
    //const isMailSend = useSelector<AppStoreType, boolean>(state => state.passwordRecovery.isMessageSend)
    const isLoading = useSelector<AppStoreType, boolean>((state) => state.registration.isLoading)
    const sendMail =(e:any)=>{
        e.preventDefault();
        const email = e.target.email.value
       // alert(email)
        dispatch(passwordRecoveryTC(email))

    }
    if (isLoading) {
        return (
            <Loading/>
        )
    }
  /*  if (isMailSend) {
        return <Redirect to={'/login'}/>
    }*/

    return (
        <form onSubmit={sendMail}>
        <div className={style.block}>
            <h3>Reset Password Page</h3>
            <div className={style.container}>
                <SuperInputText name={'email'}  placeholder={'Email'}/>
                <span className={style.text}>Please enter your email address so
                    that we will send you a link to reset your password.</span>
                <SuperButton>
                    Send
                </SuperButton>
            </div>
        </div>
        </form>
    )
}

export default PasswordRecovery;