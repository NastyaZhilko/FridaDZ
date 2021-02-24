import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PaginationComponent} from "../common/PaginationComponent/PaginationComponent";
import {SearchComponent} from "../common/SearchComponent/SearchComponent";
import {SortByDate} from "../common/SortByDate/SortByDate";
import {SliderAnt} from "../common/PaginationComponent/RangeAnt/RangeAnt";
import {createPackTC, deletePackTC, getPacksTC, IsLoadingValuesType} from "../../store/packs-reducer";
import {AppStoreType} from "../../store/store";
import {CardPacksType} from "../../api/api";
import style from './packs.module.css'
import {Cards} from "./cards";
import ModalQuestionContainer from "../common/Modal/Question/ModalQuestionContainer";


function Packs() {
    const options = [10, 20, 30, 40, 50]
    const status = useSelector<AppStoreType, IsLoadingValuesType>(state => state.cards.status)
    const packs = useSelector<AppStoreType, Array<CardPacksType>>((state) => state.cards.packs)
    const dispatch = useDispatch()

    const createPack = () => dispatch(createPackTC())
    const deletePack = (id: string) => dispatch(deletePackTC(id))
    // const updatePack = () => dispatch(updatePackTC(props.pack_id))
    useEffect(() => {
        dispatch(getPacksTC())

    }, [dispatch])

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
                            <th><label>Add pack: <button onClick={createPack}
                                                         disabled={status === 'loading'}>Add</button>
                            </label></th>
                            <th>Cards</th>
                        </tr>
                        </thead>
                    </div>
                    <div className={style.tableItem}>
                        <tbody>
                        {packs.map((pack: any, index: number) =>
                            <tr key={index}>
                                <td>{`${pack.name}`} </td>
                                <td>{`${pack.cardsCount}`}</td>
                                <td>{`${pack.updated}`}</td>
                                <td>
                                    <div className={style.tableItem}>
                                        <button name={"del"} disabled={status === 'loading'}
                                                onClick={() => deletePack(pack._id)}>Delete
                                        </button>
                                        <ModalQuestionContainer title={'Delete pack'} question={'You want to delete?'}/>
                                        <button name={"update"} disabled={status === 'loading'}>Update</button>
                                    </div>
                                </td>
                                <td><Cards packId={pack._id}/></td>
                            </tr>
                        )}
                        </tbody>
                    </div>
                </table>

            </div>
            <PaginationComponent options={options}/>


        </div>
    )
}

export default Packs
