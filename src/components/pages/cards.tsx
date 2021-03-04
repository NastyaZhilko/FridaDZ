import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../store/packCards-reducer";
import {IsLoadingValuesType} from "../../store/packs-reducer";
import style from "./packs.module.css";
import {AppStoreType} from "../../store/store";
import {CardType} from "../../api/api";
import {Modal} from "./modal/modal";
import {AddModal} from "./modal/AddModel/AddModal";
import {AddCardModal} from "./modal/AddModel/AddCardModal";
import {DeleteModal} from "./modal/AddModel/NewModel";



export function Cards() {
  const {packId} = useParams<{ packId: string }>();
  const dispatch = useDispatch()
  const cards = useSelector<AppStoreType, Array<CardType>>(state => state.packCards.cards)
  const status = useSelector<AppStoreType, IsLoadingValuesType>(state => state.cards.status)
  const show = useSelector<AppStoreType, boolean>(state => state.packCards.showSuccessModal)
  const [displayCreateModal, setDisplayCreateModal] = useState(false)
  let [displayDeleteModal, setDisplayDeleteModal] = useState(false)
  let [displayUpdateModal, setDisplayUpdateModal] = useState(false)

  useEffect(() => {
    dispatch(getCardsTC(packId))
  }, [dispatch])

  const createCard = (question?: string, answer?: string) => {
    dispatch(createCardTC({
      cardsPack_id: packId,
      question: question,
      answer: answer ? answer : ""
    }))
    setDisplayCreateModal(false)
  }

  const deleteCard = (card_id: string) => {
    dispatch(deleteCardTC(card_id, packId))
    setDisplayDeleteModal(false)
  }
  /*const updateCard = (card_id: string) =>
      dispatch(updateCardTC(card_id, packId))*/
  let top: number;
  if (show) {
    top = 100
  } else {
    top = -100
  }
  return (
      <div>
        <h1>Cards</h1>
        <div className={style.table}>
          <table>
            <div className={`${style.tableItem} ${style.tableHeader}`}>
              <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Grade</th>
                <th>Updated</th>
                <th><label>Add item:
                  <button onClick={() => setDisplayCreateModal(true)}
                          disabled={status === 'loading'}>Add</button>
                  {displayCreateModal && <AddCardModal createItem={createCard}/>}
                </label></th>
              </tr>
              </thead>
            </div>
            <div className={style.tableItem}>
              <tbody>
              {cards.map((card: CardType) => {
                return <tr key={card._id}>
                  <td>{`${card.question}`} </td>
                  <td>{`${card.answer}`}</td>
                  <td>{`${card.grade}`}</td>
                  <td>{`${card.updated}`}</td>
                  <td>
                    <div className={style.tableItem}>

                      <button name={"del"} disabled={status === 'loading'}
                              onClick={() => setDisplayDeleteModal(true)}>
                        Delete
                      </button>
                      {displayDeleteModal && <DeleteModal id={card._id}
                                                          onDeleteCard={deleteCard}
                                                          disabled={status === 'loading'}/>}

                      <button name={"update"} disabled={status === 'loading'}
                          /*onClick={() => updateCard(card._id)}*/>Update
                      </button>
                    </div>
                  </td>
                </tr>
              })}
              </tbody>
            </div>
          </table>
          <Modal title={"Success"} width={100} height={50} backgroundDiv={false} bgOnClick={() => {
          }}
                 CSSStyles={{
                   top: top + "px",
                   backgroundColor: "lightgreen"
                 }}
          />
        </div>
      </div>
  )
}