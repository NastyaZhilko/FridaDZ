import React from "react";
import {NavLink} from "react-router-dom";

import s from './Header.module.css';
import {PATH} from "../routes/Routes";

function Header() {
    return (
        <div className={s.sidebar}>

            <div><NavLink to={PATH.login} className={s.inactive} activeClassName={s.active}>Login:</NavLink></div>
            <div><NavLink to={PATH.passwordRecovery} className={s.inactive} activeClassName={s.active}>Password
                recovery:</NavLink></div>
            <div><NavLink to={PATH.profile} className={s.inactive} activeClassName={s.active}>Profile:</NavLink></div>
            <div><NavLink to={PATH.registration} className={s.inactive}
                          activeClassName={s.active}>Registration:</NavLink></div>

        </div>
    );
}

export default Header;