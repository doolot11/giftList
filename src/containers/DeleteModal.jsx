import React from 'react'

import styled from '@emotion/styled'

import BasicModal from '../components/ui/BasicModal'
import Button from '../components/ui/Button'

const DeleteModal = ({ open, onClose, deleteHolidays, id }) => {
    return (
        <BasicModal open={open} onClose={onClose}>
            <p>Вы действительно хотите удалить?</p>
            <DeleteStyle>
                <Button variant="outlined" onClick={onClose}>
                    Отмена
                </Button>
                <Button variant="contained" onClick={() => deleteHolidays(id)}>
                    Да
                </Button>
            </DeleteStyle>
        </BasicModal>
    )
}

export default DeleteModal

const DeleteStyle = styled('div')`
    display: flex;
    justify-content: space-between;
`
