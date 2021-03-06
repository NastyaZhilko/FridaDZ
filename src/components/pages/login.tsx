import React, { FormEvent } from "react";
import SuperInput from "../common/SuperInput/SuperInput";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {login, LoginFormData} from "../../store/login-reducer";
import {AppStoreType} from "../../store/store";
import {NavLink, Redirect} from "react-router-dom";
import {Modal} from "./modal/modal";
import SuperInputText from "../common/SuperInput/SuperInput";
import s from "../header/Header.module.css";
import {PATH} from "../routes/Routes";


export function Login() {

    const dispatch = useDispatch()
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const show = useSelector<AppStoreType, boolean>(state => state.login.showSuccessModal)

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
    let top: number;
    if(show) {
        top = 100
    }else{
        top = -100
    }

    return (
       <> <form onSubmit={submitLoginData}>
            <div style={loginStyle}>
                <h2>Login</h2>
                <SuperInputText name={'email'} placeholder={'Enter your email'}/>
                <SuperInputText name={'password'} type={'password'} placeholder={'Enter your password'}/>
                <div><SuperCheckbox name={'rememberMe'} type={'checkbox'}/>
                    <span>Remember Me</span></div>
                <SuperButton type={'submit'}>Login</SuperButton>
                <div>

                    <NavLink to={PATH.passwordRecovery} className={s.inactive} activeClassName={s.active}>
                        Forgot Password?
                       </NavLink>

                    <NavLink to={PATH.registration} className={s.inactive}
                             activeClassName={s.active}>  Registration  </NavLink>

                </div>


            </div>
        </form>
           <Modal title={"Success"} width={100} height={50} backgroundDiv={false} bgOnClick={() => {}}
                  CSSStyles={{
                      top: top+"px",
                      backgroundColor: "lightgreen"
                  }}
           />
       </>
    );
}

export default Login;