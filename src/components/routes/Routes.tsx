import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Error404 from "../pages/404";
import Login from "../pages/login";
import PasswordRecovery from "../pages/password-recovery";
import Profile from "../pages/profile";
import Registration from "../pages/registration";
import NewPassword from "../pages/new-password";
import Packs from "../pages/packs";
import {LearnPage} from "../pages/learnsPage";
import {Cards} from "../pages/cards";





export const PATH = {
    login: '/login',
    passwordRecovery: '/passwordRecovery',
    profile:'/profile',
    registration:'/registration',
    newPassword:'/newPassword',
    cards: '/cards',
    packs: '/packs'

}

function Routes() {

    return (
        <div >
            <Switch>

                <Route path={'/'} exact render={() => <Redirect to={'/login'}/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/passwordRecovery'} exact render={() => <PasswordRecovery/>}/>
                <Route path={'/profile'} exact render={() => <Profile/>}/>
                <Route path={'/registration'} exact render={() => <Registration/>}/>
                <Route path={'/newPassword/:resetPasswordToken'}  render={() => <NewPassword/>}/>
                <Route path={'/newPassword/'} exact render={ () => <PasswordRecovery/>}/>
                <Route path={'/packs'} render={() => <Packs/>}/>
               {/* <Route path={'/cards'} render={() => <Cards/>}/>*/}
                <Route path={'/cards/:packId'}  render={() => <Cards/>}/>
                <Route path={'/learn/:packId'}  render={() => <LearnPage/>}/>
                <Route render={() => <Error404/>}/>


            </Switch>
        </div>
    );
}

export default Routes;