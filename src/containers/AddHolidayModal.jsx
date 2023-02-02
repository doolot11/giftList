import React, { useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import BasicModal from '../components/ui/BasicModal'
import Button from '../components/ui/Button'
import ViewsDatePicker from '../components/ui/datePicker/ViewsDatePicker'
import ImagePicker from '../components/ui/ImagePicker'
import Input from '../components/ui/Input'
import { postHoliday } from '../store/slices/HolidayActions'

const AddHolidayModal = (props) => {
    const { open, onClose } = props
    const [photo, setPhoto] = useState(null)
    const [holidayName, setHolidayName] = useState('')
    const [holidayDate, setHolidayDate] = useState(null)
    const dispatch = useDispatch()
    const onChangeImageValue = (file) => {
        // eslint-disable-next-line no-debugger
        if (file.size <= 1000000) {
            setPhoto(file)
        }
    }
    const onChangeInputValue = (e) => {
        setHolidayName(e.target.value)
    }
    const onChangeDateValue = (date) => {
        setHolidayDate(date)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            postHoliday({
                photo,
                holidayName,
                date: holidayDate,
                onClose,
            })
        )
        setPhoto(null)
        setHolidayName('')
        setHolidayDate(null)
    }

    return (
        <BasicModal open={open} onClose={onClose}>
            <form onSubmit={submitHandler}>
                <ModalChildDiv>
                    <AddTitle>Добавление праздника</AddTitle>
                    <ImagePicker
                        onChange={onChangeImageValue}
                        id="addHolidayImagePicker"
                    />
                    <InModalChildDiv>
                        <LabelInputDiv>
                            <label htmlFor="Название праздника">
                                Название праздника
                            </label>
                            <Input
                                name="add"
                                value={holidayName}
                                onChange={onChangeInputValue}
                                type="text"
                                placeholder="Введите название праздника"
                            />
                        </LabelInputDiv>

                        <DateDiv>
                            <ViewsDatePicker
                                width="100%"
                                value={holidayDate}
                                onChange={onChangeDateValue}
                                label="Дата праздника"
                                placeholder="Укажите дату праздника"
                            />
                            <CancelAddDiv>
                                <Button variant="outlined" onClick={onClose}>
                                    Отмена
                                </Button>
                                <Button type="submit" variant="contained">
                                    Добавить
                                </Button>
                            </CancelAddDiv>
                        </DateDiv>
                    </InModalChildDiv>
                </ModalChildDiv>
            </form>
        </BasicModal>
    )
}

export default AddHolidayModal

const ModalChildDiv = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const InModalChildDiv = styled('div')`
    display: flex;
    flex-direction: column;
`
const AddTitle = styled('p')`
    font-family: 'Inter' sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    margin: 0px;
    margin-bottom: 24px;
    color: #23262f;
`

const LabelInputDiv = styled('div')`
    height: 56px;
    margin-top: 32px;
    margin-bottom: 24px;

    & label {
        padding: 0px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #464444;
    }
`

const CancelAddDiv = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-top: 44px;
    & Button {
        width: 232px;
        height: 37px;
    }
`
const DateDiv = styled('div')`
    font-family: 'Inter', sans-serif;
`
