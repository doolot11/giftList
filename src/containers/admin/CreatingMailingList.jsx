import React, { useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import BasicModal from '../../components/ui/BasicModal'
import Button from '../../components/ui/Button'
import ImagePicker from '../../components/ui/ImagePicker'
import Input from '../../components/ui/Input'
import { mailingAction } from '../../store/slices/mailingAction'

const CreatingMailingList = (props) => {
    const { open, onClose } = props
    const [photo, setPhoto] = useState(null)
    const [mailingTitle, setMailingTitle] = useState('')
    const [mailingText, setMailingText] = useState('')
    const dispatch = useDispatch()
    const onChangeImageValue = (file) => {
        if (file.size <= 1000000) {
            setPhoto(file)
        }
    }
    const onChangeInputTitle = (e) => {
        setMailingTitle(e.target.value)
    }
    const onChangeInputText = (e) => {
        setMailingText(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            mailingAction({
                photo,
                mailingTitle,
                mailingText,
                onClose,
            })
        )
        setPhoto(null)
        setMailingTitle('')
        setMailingText('')
    }
    return (
        <BasicModal open={open} onClose={onClose}>
            <form onSubmit={submitHandler}>
                <ModalChildDiv>
                    <AddTitle>Создание рассылки</AddTitle>
                    <ImagePicker id="mailing" onChange={onChangeImageValue} />
                    <InModalChildDiv>
                        <LabelInputDiv>
                            <label htmlFor="Заголовок">Заголовок</label>
                            <Input
                                name="Заголовок"
                                value={mailingTitle}
                                onChange={onChangeInputTitle}
                                type="text"
                                placeholder="Введите заголовок рассылки"
                            />
                        </LabelInputDiv>
                        <DateDiv>
                            <LabelInputDiv>
                                <label htmlFor="Текст рассылки">
                                    Текст рассылки
                                </label>
                                <Input
                                    name="Текст рассылки"
                                    type="text"
                                    value={mailingText}
                                    onChange={onChangeInputText}
                                    placeholder="Введите текст рассылки"
                                />
                            </LabelInputDiv>

                            <CancelAddDiv>
                                <Button variant="outlined" onClick={onClose}>
                                    Отмена
                                </Button>
                                <Button type="submit" variant="contained">
                                    Отправить
                                </Button>
                            </CancelAddDiv>
                        </DateDiv>
                    </InModalChildDiv>
                </ModalChildDiv>
            </form>
        </BasicModal>
    )
}
export default CreatingMailingList
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
