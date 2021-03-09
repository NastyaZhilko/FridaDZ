import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PaginationComponent} from "../common/PaginationComponent/PaginationComponent";
import {SearchComponent} from "../common/SearchComponent/SearchComponent";
import {SortByDate} from "../common/SortByDate/SortByDate";
import {SliderAnt} from "../common/PaginationComponent/RangeAnt/RangeAnt";
import {createPackTC, deletePackTC, getPacksTC, IsLoadingValuesType, setIsMyPacksAC} from "../../store/packs-reducer";
import {AppStoreType} from "../../store/store";
import {CardPacksType} from "../../api/api";
import {NavLink, Redirect, Route, useParams} from "react-router-dom";
import style from './packs.module.css'
import {Modal} from "./modal/modal";
import {SuperModal} from "./modal/SuperModal/SuperModal";
import {AddModal} from "./modal/ModelsCards/AddPackModal";
import {RequestStatusType, UserDataType} from "../../store/app-reducer";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import {DeleteModal} from "./modal/ModelsCards/DeleteCardModel";


function Packs() {
    const {packId} = useParams<{ packId: string }>();
    const options = [10, 20, 30, 40, 50]
    const userId = useSelector<AppStoreType, string>(state => state.app.UserData ? state.app.UserData._id : "")
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const isMyPacks = useSelector<AppStoreType, boolean>(state => state.cards.isMyPacks)
    const status = useSelector<AppStoreType, IsLoadingValuesType>(state => state.cards.status)
    const packs = useSelector<AppStoreType, Array<CardPacksType>>((state) => state.cards.packs)
    const show = useSelector<AppStoreType, boolean>(state => state.cards.showSuccessModal)
    const [displayCreateModal, setDisplayCreateModal] = useState(false)
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
    const [displayUpdateModal, setDisplayUpdateModal] = useState(false)
    const [isMyPackChecked, setIsMyPackChecked] = useState<boolean>(false)
    const isAuth = useSelector<AppStoreType, boolean>(state => state.login.isAuth)
    const dispatch = useDispatch()

/*    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(initializeUser())
        }
    }, [isLoggedIn])*/
    useEffect(() => {

            dispatch(getPacksTC())

    }, [isMyPacks])

    const showMyPacksHandler = () => {
        dispatch(setIsMyPacksAC(!isMyPacks))
    }

    const createPack = (title: string) => {
        dispatch(createPackTC(title))
        setDisplayCreateModal(false)
    }
    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
        setDisplayDeleteModal(false)
    }

   /* if (!isAuth){

        return <Redirect to={'/login'} />
    }*/

    //const updatePack = (id: string) => dispatch(updatePackTC(id))




    let top: number;
    if (show) {
        top = 100
    } else {
        top = -100
    }

    return (
        <div>
            <div><div className={style.showMine}>
                <input type='checkbox' id='myPacks' checked={isMyPacks} onChange={showMyPacksHandler}/>
                <label htmlFor='myPacks'>Show my packs</label>
            </div></div>
            <h1>Packs</h1>
            <SliderAnt/>
            <div className={style.table}>
                <table>
                    <div className={`${style.tableItem} ${style.tableHeader}`}>
                        <thead>
                        <tr>
                            <th>
                                <div className={style.ceil}>Name <SearchComponent/></div>
                            </th>
                            <th>CardsCount</th>
                            <th>
                                <div className={style.ceil}>Update <SortByDate/></div>
                            </th>
                            <th><label>Add pack: <button onClick={() => setDisplayCreateModal(true)}
                                                         disabled={status === 'loading'}>Add</button>
                                {displayCreateModal && <AddModal createItem={createPack}/>}

                            </label></th>
                            <th>Cards</th>
                            <th>Learn</th>
                        </tr>
                        </thead>
                    </div>
                    <div className={style.tableItem}>
                        <tbody>
                        {packs.map((pack: any) => {

                                return <tr key={pack._id}>
                                    <td>{`${pack.name}`} </td>
                                    <td>{`${pack.cardsCount}`}</td>
                                    <td>{`${pack.updated}`}</td>
                                    <td>
                                        <div className={style.tableItem}>
                                            <NavLink to={`/packs/${pack._id}/delete`}>
                                                <button name={"del"} disabled={status === 'loading' ||!isAuth}
                                                        onClick={() => setDisplayDeleteModal(true)}>Delete
                                                </button>
                                            </NavLink>
                                           
                                            <button name={"update"} disabled={status === 'loading'}>Update</button>
                                        </div>
                                    </td>
                                    <td><NavLink to={`/cards/${pack._id}`}>cards</NavLink></td>
                                    <td> <NavLink to={`/learn/${pack._id}`}>learn</NavLink></td>
                                </tr>
                            }
                        )}
                        </tbody>
                    </div>
                </table>

            </div>
            <PaginationComponent options={options}/>
            <Modal title={"Success"} width={100} height={50} backgroundDiv={false} bgOnClick={() => {
            }}
                   CSSStyles={{
                       top: top + "px",
                       backgroundColor: "lightgreen"
                   }}
            />

            <Route path={'/packs/:id/delete'} render={() => <SuperModal successClick={deletePack}/>}/>
            <Route path={'/packs/:id/update'} render={() => <SuperModal successClick={() => {
            }}/>}/>
        </div>
    )
}

export default Packs


