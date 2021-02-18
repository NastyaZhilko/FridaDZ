import React, { FormEvent } from "react";
import SuperInput from "../common/SuperInput/SuperInput";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {login, LoginFormData} from "../../store/login-reducer";
import {AppStoreType} from "../../store/store";
import {Redirect} from "react-router-dom";
import SuperPassword from "../common/SuperButton/SuperPassword/SuperPassword";

export function Login() {

    const dispatch = useDispatch()
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const isFetching = useSelector<AppStoreType, boolean>(state => state.login.isFetching)
    const error = useSelector<AppStoreType, string>(state => state.login.error)

    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    const submitLoginData = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value
        const rememberMe: boolean = e.currentTarget.rememberMe.value
        const data: LoginFormData = {email, password, rememberMe}

        dispatch(login(data))
    }

    const loginStyle = {
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center'
    }

    return (
        <form onSubmit={submitLoginData}>
            <div style={loginStyle}>
                <h3>Login</h3>
                <SuperInput name={'email'} placeholder={'Enter your email'}/>
                <SuperPassword name={'password'} type={'password'} placeholder={'Enter your password'}/>
                <div><SuperCheckbox name={'rememberMe'} type={'checkbox'}/>
                    <span>Remember Me</span></div>
                <SuperButton type={'submit'}>Send</SuperButton>
                {error && <div style={{'color': 'red'}}>{error}</div>}
            </div>
        </form>
    );
}

export default Login;