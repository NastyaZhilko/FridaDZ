import React, {FC} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Modal} from "../modal";
import SuperButton from "../../../common/SuperButton/SuperButton";

type PropsType = {
    id?:string
    successClick: (id: string) => void
    component?: React.ReactNode
}
export const DeletePackModal: FC<PropsType> = ({successClick, component}) => {

    const {id} = useParams<{id: string}>()

    const history = useHistory()

    const handleSuccessClick = () => {
        successClick(id)
        closeModal()
    }

    const closeModal = () => {
        history.goBack()
    }
    return <Modal bgOnClick={closeModal}
                  title={"Are you sure?"} width={500} height={200}
                  backgroundDiv={true}>
        <div style={{display: "flex", justifyContent: "space-around"}}>
            {component}
            <SuperButton onClick={handleSuccessClick}>Yes</SuperButton>
            <SuperButton onClick={closeModal}>No</SuperButton>
        </div>
    </Modal>
}