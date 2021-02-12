import React, {ChangeEvent, useState} from "react";
import SuperInputText from "../common/SuperInput/SuperInput";
import SuperButton from "../common/SuperButton/SuperButton";
import style from "./new-password.module.css"
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {errorAC, newPasswordTC} from "../../store/new-password-reducer";
import {useParams} from 'react-router-dom';

function NewPassword() {
    const dispatch = useDispatch()
    const isNewPasswordSet = useSelector<AppStoreType, boolean>(state => state.newPassword.isNewPasswordSet)
    const error = useSelector<AppStoreType, boolean>(state => state.newPassword.isError)
    const titleError = useSelector<AppStoreType, string | null>(state => state.newPassword.titleError)
    const {resetPasswordToken} = useParams<{ resetPasswordToken: string }>();
    const [passwordLength, setPasswordLength] = useState(true)
    const [passwordLengthDub, setPasswordLengthDub] = useState(true)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorDub, setPasswordErrorDub] = useState(false)
    const [buttonColor, setButtonColor] = useState('')

    const onSubmit = (e: any) => {
        e.preventDefault();
        const password = e.target.password.value
        const repeatPassword = e.target.repeatPassword.value
        password === repeatPassword
            ? dispatch(newPasswordTC(password, resetPasswordToken))
            : dispatch(errorAC('Not equal'))

    }
    console.log(resetPasswordToken)
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log(e.currentTarget.value.length)
        if (e.currentTarget.value.length >= 7) {
            setPasswordLength(false)
            setPasswordError(false)
            setButtonColor('blue')
        } else {
            setPasswordLength(true)
            setButtonColor('')
        }
    }
    const changePasswordDub = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log(e.currentTarget.value.length)
        if (e.currentTarget.value.length >= 7) {
            setPasswordLengthDub(false)
            setPasswordErrorDub(false)
            setButtonColor('blue')
        } else {
            setPasswordLengthDub(true)
            setButtonColor('')
        }
    }

    const onblur = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value)
        if (e.currentTarget.value.length < 7) {
            setPasswordError(true)
        }
    }
    const onblurDub = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value)
        if (e.currentTarget.value.length < 7) {
            setPasswordErrorDub(true)
        }
    }

    if (isNewPasswordSet) {
        return <Redirect to={'/login'}/>
    }
    return (
        <form onSubmit={onSubmit}>
            <div className={style.container}>
                <h3>Set password</h3>
                <SuperInputText type='password' name='password' placeholder="New password" onChange={changePassword}
                                onBlur={onblur}/>
                {passwordError && <div style={{color: "red"}}>{'Password must be more than 7 characters...'}</div>}

                <SuperInputText type='password' name='repeatPassword' placeholder="Confirm new password"
                                onChange={changePasswordDub} onBlur={onblurDub}/>
                {passwordErrorDub && <div style={{color: "red"}}>{'Password must be more than 7 characters...'}</div>}

                <SuperButton type="submit" disabled={passwordLength || passwordLengthDub}
                             style={{background: buttonColor}}>
                    Change password
                </SuperButton>
            </div>
        </form>
    );
}

export default NewPassword;