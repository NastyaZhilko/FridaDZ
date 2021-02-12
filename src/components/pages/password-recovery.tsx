import React from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import style from "./password-recovery.module.css"
import {useDispatch} from "react-redux";
import {passwordRecoveryTC} from "../../store/password-recovery-reducer";

function PasswordRecovery() {

    const dispatch = useDispatch()
    const sendMail = (e: any) => {
        e.preventDefault();
        const email = e.target.email.value
        dispatch(passwordRecoveryTC(email))
    }

    return (
        <form onSubmit={sendMail}>
            <div>
                <h3>Password recovery</h3>
                <div className={style.container}>
                    <SuperInputText name={'email'} placeholder="Email"/>
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