import React, {useState} from "react";
import {NavLink} from "react-router-dom";

import s from './Header.module.css';
import {PATH} from "../routes/Routes";

function Header() {
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const toggle = () => {
        setActiveMenu(!activeMenu)
    }
    return (
        <div className={s.sidebar}>
            <div className={s.menu} onClick={toggle}>&#9776;</div>
            <div className={`${s.containerMenuLinks} ${activeMenu && s.activeMenu}`}>
                <NavLink to={PATH.login} className={s.inactive} activeClassName={s.active}>  Login  </NavLink>
                <NavLink to={PATH.passwordRecovery} className={s.inactive} activeClassName={s.active}>  Password
                    recovery  </NavLink>
                <NavLink to={PATH.profile} className={s.inactive} activeClassName={s.active}>  Profile  </NavLink>
                <NavLink to={PATH.registration} className={s.inactive}
                         activeClassName={s.active}>  Registration  </NavLink>
                <NavLink to={PATH.newPassword} className={s.inactive}
                         activeClassName={s.active}>  Entering a new password  </NavLink>

            </div>
        </div>
    );
}

export default Header;