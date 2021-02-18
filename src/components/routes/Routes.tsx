import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Error404 from "../pages/404";
import Login from "../pages/login";
import PasswordRecovery from "../pages/password-recovery";
import Profile from "../pages/profile";
import Registration from "../pages/registration";
import NewPassword from "../pages/new-password";
import Packs from "../pages/Packs";
import {PackCards} from "../pages/PackCards";

export const PATH = {
    login: '/login',
    passwordRecovery: '/passwordRecovery',
    profile:'/profile',
    registration:'/registration',
    newPassword:'/newPassword',
    packs:'/packs'
}

function Routes() {
    return (
        <div >
            <Switch>
                в начале мы попадаем на страницу "/" и переходим сразу на страницу PRE_JUNIOR
                exact нужен чтоб указать полное совподение (что после "/" ничего не будет)
                <Route path={'/'} exact render={() => <Redirect to={'/login'}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/passwordRecovery'} exact render={() => <PasswordRecovery/>}/>
                <Route path={'/profile'} exact render={() => <Profile/>}/>
                <Route path={'/registration'} exact render={() => <Registration/>}/>
                <Route path={'/newPassword/:resetPasswordToken'} exact render={() => <NewPassword/>}/>
                <Route path={'/packs'} exact render={() => <Packs/>}/>
                <Route path={'/packs/:packId'} exact render={() => <PackCards/>}/>
                <Route render={() => <Error404/>}/>
                //у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу

            </Switch>
        </div>
    );
}

export default Routes;