import React from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import style from "./new-password.module.css"

function NewPassword() {
    return (
        <div className={style.container}>
            <h3>Set password</h3>
            <SuperInputText type={'password'} name={'password'}/>
            <span>New password</span>
            <SuperInputText type={'password'} name={'password'}/>
            <span>Confirm new password</span>
            <SuperButton>
                Change password
            </SuperButton>
        </div>
    );
}

export default NewPassword;