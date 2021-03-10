import React, {FC, useState} from 'react';
import {Modal} from "../modal";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {useHistory, useParams} from "react-router-dom";

type PropsType = {
    updateTitle?: (id: string, title: string) => void
}
export const UpdatePackModal: FC<PropsType> = ({ updateTitle}:PropsType) => {
    const {id} = useParams<{id: string}>()
    let [value, setValue] = useState("")

    const createHandler = () => {
        updateTitle && updateTitle(id, value)
        setValue("")
        closeModal()
       }
    const history = useHistory()

    const closeModal = () => {
        history.goBack()
    }
    return (
        <>

             <Modal bgOnClick={closeModal} title={"Enter new title"}
                                    width={500} height={200} backgroundDiv={true}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                />

                <div style={{display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                    <SuperButton onClick={createHandler}>Submit</SuperButton>
                    <SuperButton onClick={closeModal}>Cancel</SuperButton>
                </div>
            </Modal>
        </>
    )
}