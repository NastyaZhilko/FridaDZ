import React from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../store/store";
import {Redirect} from "react-router-dom";
import {UserDataType} from "../../store/login-reducer";

function Profile() {

    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const userData = useSelector<AppStoreType, UserDataType>(state => state.login.data)
    const cardsCount = useSelector<AppStoreType, number | null>(state => state.profile.publicCardPacksCount)


    return (
        <div>
            <h3>Profile</h3>

            {isAuth
                ? <div>
                   <div> Name: {userData.name}</div>
                   <div> Count of cards: {cardsCount}</div>



            </div>
                : <Redirect to={'login'}/>}

        </div>
    );
};

export default Profile;