
import React from "react";
import SuperInput from "../common/SuperInput/SuperInput";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/SuperButton/SuperButton";

export function Login() {
    const loginStyle = {
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center'
    }
    return (
        <div style={loginStyle}>
            <h2>Login</h2>
            <SuperInput name={'email'} placeholder={'Enter your email'}/>
            <SuperInput name={'password'} type={'password'} placeholder={'Enter your password'}/>
            <div><SuperCheckbox/>
                <span>Remember Me</span></div>
            <SuperButton>Send</SuperButton>
        </div>
    );
}

export default Login;