import React, { useState, useEffect } from 'react'

import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import BasicModal from '../components/ui/BasicModal'
import Button from '../components/ui/Button'
import ViewsDatePicker from '../components/ui/datePicker/ViewsDatePicker'
import ImagePicker from '../components/ui/ImagePicker'
import Input from '../components/ui/Input'
import { putHoliday } from '../store/slices/HolidayActions'
import { clearHoliday } from '../store/slices/HolidaySlice'

const EditHolidaysModal = (props) => {
    const { open, onClose, locationId, name } = props
    const [prevHolidayDate, setPrevHolidayDate] = useState('')
    const [prevImage, setPrevImage] = useState(null)
    const [prevName, setPrevName] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.data.holidayDate) {
            const sd = props.data.holidayDate.split('.')
            setPrevHolidayDate(new Date(sd[2], sd[1] - 1, sd[0]))
        }
        setPrevName(props.data.name)
        setPrevImage(props.data.photo)
    }, [props.data.name, props.data.photo, props.data.holidayDate])

    const holidayNameChangeHandler = (e) => {
        setPrevName(e.target.value)
    }
    const dateChangeHandler = (newData) => {
        setPrevHolidayDate(newData)
    }
    const editCardHandler = (e) => {
        e.preventDefault()
        dispatch(
            putHoliday({
                id: props.data.id,
                locationId,
                onClose,
                body: {
                    photo: prevImage,
                    name: prevName,
                    date: prevHolidayDate,
                },
            })
        )
    }

    useEffect(() => {
        return () => dispatch(clearHoliday())
    }, [])
    const newImage = prevImage?.name ? null : prevImage
    return (
        <BasicModal open={open} onClose={onClose}>
            <ModalChildDiv>
                <AddTitle>Редактировать праздник</AddTitle>
                <ImagePicker
                    onChange={setPrevImage}
                    newFile={newImage}
                    id="edit"
                />
                <InModalChildDiv>
                    <LabelInputDiv>
                        <label htmlFor="Название праздника">
                            Название праздника
                        </label>
                        <Input
                            onChange={holidayNameChangeHandler}
                            value={prevName}
                            type="text"
                            placholder="Введите название праздника"
                            name={name}
                        />
                    </LabelInputDiv>

                    <>
                        <ViewsDatePicker
                            width="100%"
                            value={prevHolidayDate}
                            onChange={dateChangeHandler}
                            label="Дата праздника"
                            placeholder="Укажите дату праздника"
                        />
                        <CancelAddDiv>
                            <Button variant="outlined" onClick={onClose}>
                                Отмена
                            </Button>
                            <Button
                                variant="contained"
                                onClick={editCardHandler}
                            >
                                Сохранить
                            </Button>
                        </CancelAddDiv>
                    </>
                </InModalChildDiv>
            </ModalChildDiv>
        </BasicModal>
    )
}

export default EditHolidaysModal

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
