import React from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {Redirect} from "react-router-dom";
import {UserDataType} from "../../store/login-reducer";

function Profile() {

    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const userData = useSelector<AppStoreType, UserDataType>(state => state.login.data)



    return (
        <div>
            <h2>Profile</h2>

            {isAuth
                ? <div>
                    {userData.name}
            </div>
                : <Redirect to={'login'}/>}

        </div>
    );
};

export default Profile;