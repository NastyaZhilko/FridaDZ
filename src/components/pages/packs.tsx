import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PaginationComponent} from "../common/PaginationComponent/PaginationComponent";
import {SearchComponent} from "../common/SearchComponent/SearchComponent";
import {SortByDate} from "../common/SortByDate/SortByDate";
import {SliderAnt} from "../common/PaginationComponent/RangeAnt/RangeAnt";
import {createPackTC, deletePackTC, getPacksTC, IsLoadingValuesType} from "../../store/packs-reducer";
import {AppStoreType} from "../../store/store";
import {CardPacksType} from "../../api/api";
import {NavLink, Route} from "react-router-dom";
import style from './packs.module.css'
import {Cards} from "./Cards";
import {Learn} from "./learn";
import {Modal} from "./modal/modal";
import SuperButton from "../common/SuperButton/SuperButton";
import {SuperModal} from "./modal/SuperModal/SuperModal";
import SuperInputText from "../common/SuperInput/SuperInput";
import {AddModal} from "./modal/AddModel/AddModal";


function Packs() {
    //const {packId} = useParams<{ packId: string }>();
    const options = [10, 20, 30, 40, 50]
    const status = useSelector<AppStoreType, IsLoadingValuesType>(state => state.cards.status)
    const packs = useSelector<AppStoreType, Array<CardPacksType>>((state) => state.cards.packs)
    const show = useSelector<AppStoreType, boolean>(state => state.cards.showSuccessModal)
    const [displayCreateModal, setDisplayCreateModal] = useState(false)
    const [displayDeleteModal, setDisplayDeleteModal] = useState(false)
    const [displayUpdateModal, setDisplayUpdateModal] = useState(false)
    const dispatch = useDispatch()
    let [value, setValue] = useState("")


    const createPack = (title: string) => {
        dispatch(createPackTC(title))
        setDisplayCreateModal(false)
    }
    const deletePack = (id: string) => dispatch(deletePackTC(id))
    //const updatePack = (id: string) => dispatch(updatePackTC(id))
    useEffect(() => {
        dispatch(getPacksTC())

    }, [dispatch])

    let top: number;
    if (show) {
        top = 100
    } else {
        top = -100
    }

    return (
        <div>
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
                                                <button name={"del"} disabled={status === 'loading'}
                                                        onClick={() => setDisplayDeleteModal(true)}>Delete
                                                </button>
                                            </NavLink>

                                            <button name={"update"} disabled={status === 'loading'}>Update</button>
                                        </div>
                                    </td>
                                    <td><Cards packId={pack._id}/></td>
                                    <td><Learn packId={pack._id}/></td>
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

            <Route path={'/packs/:id/delete'} render={() => <SuperModal successClick={deletePack}
                                                                        component={<input/>}/>}/>
            <Route path={'/packs/:id/update'} render={() => <SuperModal successClick={() => {
            }}/>}/>
        </div>
    )
}

export default Packs


