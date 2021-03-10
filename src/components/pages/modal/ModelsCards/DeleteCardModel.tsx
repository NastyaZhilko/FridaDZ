import React, {FC, useState} from 'react';
import {Modal} from "../modal";
import SuperButton from "../../../common/SuperButton/SuperButton";

type PropsType = {
    onDeleteCard: (id: string) => void
    id: string
    disabled?:boolean
}
export const DeleteCardModal: FC<PropsType> = ({onDeleteCard, id}) => {
    const [modal, setModal] = useState<boolean>(false)

    return <Modal bgOnClick={() => setModal(true)}
                  title={"Are you sure?"} width={500} height={200}
                  backgroundDiv={true}>
        <div style={{display: "flex", justifyContent: "space-around"}}>

            <SuperButton onClick={() => onDeleteCard(id)}>Yes</SuperButton>
            <SuperButton onClick={() => setModal(false)}>No</SuperButton>
        </div>
    </Modal>
}