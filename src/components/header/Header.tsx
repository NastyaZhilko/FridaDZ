import React, {useState} from "react";
import {NavLink, Redirect} from "react-router-dom";

import s from './Header.module.css';
import {PATH} from "../routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {logout} from "../../store/login-reducer";

function Header() {
    const [activeMenu, setActiveMenu] = useState<boolean>(false);
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const dispatch = useDispatch()

    const toggle = () => {
        setActiveMenu(!activeMenu)
    }

  /*  if (!isAuth){

        return <Redirect to={'/login'} />
    }*/
    return (
        <div className={s.sidebar}>
            <div className={s.menu} onClick={toggle}>&#9776;</div>
            <div className={`${s.containerMenuLinks} ${activeMenu && s.activeMenu}`}>
                <div className = {s.links}>
         {/*       <NavLink to={PATH.passwordRecovery} className={s.inactive} activeClassName={s.active}>  Password
                    recovery  </NavLink>*/}
                <NavLink to={PATH.profile} className={s.inactive} activeClassName={s.active}>  Profile  </NavLink>
                <NavLink to={PATH.registration} className={s.inactive}
                         activeClassName={s.active}>  Registration  </NavLink>
               {/* <NavLink to={PATH.newPassword} className={s.inactive}
                         activeClassName={s.active}>  Entering a new password  </NavLink>*/}
                {isAuth ? <button onClick={() => dispatch(logout())}>Log out</button> :
                    <NavLink to={'/login'}>Login</NavLink>}
                <NavLink to={PATH.packs} className={s.inactive} activeClassName={s.active}>  Packs  </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;