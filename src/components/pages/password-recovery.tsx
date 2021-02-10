import React from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import style from "./password-recovery.module.css"

function PasswordRecovery() {
    return (
        <div>
            <h3>Password recovery</h3>
            <div className={style.container}>
                <SuperInputText/>
                <span>Enter your email</span>
                <SuperButton>
                    Send
                </SuperButton>
            </div>
        </div>
    )
        ;
}

export default PasswordRecovery;