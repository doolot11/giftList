import { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Button from '../components/ui/Button'
import ViewsDatePicker from '../components/ui/datePicker/ViewsDatePicker'
import ImagePicker from '../components/ui/ImagePicker'
import Input from '../components/ui/Input'
import Select from '../components/ui/select/Select'
import TextArea from '../components/ui/Textarea'
import {
    addGift,
    getHolidaysToSelect,
} from '../store/slices/AddWishCardActions'

import AddHolidayModal from './AddHolidayModal'

const AddWishCardPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    const { addHoliday } = Object.fromEntries([...params])

    const { holidaysToSelect } = useSelector((state) => state.wishCard)
    useEffect(() => {
        dispatch(getHolidaysToSelect())
    }, [])
    const [wishGift, setWishGift] = useState({
        wishName: '',
        wishLink: '',
        description: '',
    })

    const [holidayId, setHolidays] = useState('')
    const [wishDate, setDateWishGift] = useState('')
    const [wishPhoto, setWishGiftPhoto] = useState('')
    const cancel = () => {
        navigate('/wish_list')
    }
    const toWishPage = () => {
        navigate('/wish_list')
    }
    const addWishGift = (e) => {
        setWishGift({
            ...wishGift,
            [e.target.name]: e.target.value,
        })
    }
    const addImageGift = (e) => {
        setWishGiftPhoto(e)
    }
    const addDateWishGift = (e) => {
        setDateWishGift(e)
    }
    const chooseHoliday = (e) => {
        setHolidays(e.id)
    }
    const openAddModalHandler = () => {
        setParams({ addHoliday: true })
    }
    const closeModalHandler = () => {
        setParams({})
    }

    wishGift.holidayId = holidayId
    wishGift.wishDate = wishDate
    const postHandler = (e) => {
        e.preventDefault()
        if (
            wishGift.wishName &&
            wishGift.wishLink &&
            wishGift.description &&
            wishGift.holidayId &&
            wishGift.wishDate
        ) {
            dispatch(addGift({ wishPhoto, wishGift, dispatch }))
            toWishPage()
        }
    }
    return (
        <WrapperAll onSubmit={postHandler}>
            <ImagePicker onChange={addImageGift} id="addWishes" />
            <WrapperEdit>
                <H2>Добавление желаемого подарка</H2>
                <WrapperLabels>
                    <Label> Название подарка</Label>
                    <Label>Ссылка на подарок </Label>
                </WrapperLabels>
                <WrapperInputs>
                    <Input
                        name="wishName"
                        value={wishGift.wishName}
                        width="396px"
                        placeholder="Введите название подарка"
                        onChange={addWishGift}
                    />
                    <Input
                        name="wishLink"
                        value={wishGift.wishLink}
                        width="396px"
                        placeholder="Вставьте ссылку на подарок"
                        onChange={addWishGift}
                    />
                </WrapperInputs>
                <WrapperSelects>
                    <DivSelect>
                        <Select
                            getValue={chooseHoliday}
                            placeholder="Выберите праздник"
                            label="Праздник"
                            showButton="button"
                            options={holidaysToSelect}
                            additionalOption={
                                <MenuItemButton onClick={openAddModalHandler}>
                                    <Plus>+</Plus> Добавить праздник
                                </MenuItemButton>
                            }
                        />
                    </DivSelect>
                    <DivDatePicker>
                        <ViewsDatePicker
                            value={wishDate}
                            placeholder="Укажите дату праздника"
                            label="Дата праздника"
                            onChange={addDateWishGift}
                        />
                    </DivDatePicker>
                </WrapperSelects>
                <TextArea
                    value={wishGift.description}
                    name="description"
                    placeholder="Введите описание подарка"
                    label="Описание подарка"
                    onChange={addWishGift}
                />
                <WrapperButton>
                    <Button variant="outlined" onClick={cancel}>
                        Отмена
                    </Button>
                    <Button variant="contained" type="submit">
                        Добавить
                    </Button>
                </WrapperButton>
            </WrapperEdit>
            <AddHolidayModal
                onOpen={openAddModalHandler}
                open={addHoliday === 'true'}
                onClose={closeModalHandler}
            />
        </WrapperAll>
    )
}

export default AddWishCardPage

const Plus = styled('span')`
    font-size: 25px;
    margin-right: 7px;
`
const MenuItemButton = styled(MenuItem)`
    color: #8639b5;
    padding: 0 0 0 15px;
`

const WrapperAll = styled('form')`
    padding: 20px;
    display: flex;
    background: #fff;
    margin-top: 110px;
`

const WrapperEdit = styled('div')`
    padding-left: 20px;
    width: 808px;
`
const H2 = styled('h2')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    margin: 0;
`
const WrapperLabels = styled('div')`
    display: grid;
    grid-template-columns: 430px 390px;
    margin-top: 17px;
    margin-bottom: 6px;
`
const Label = styled('label')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #464444;
`
const WrapperInputs = styled('div')`
    display: grid;
    grid-template-columns: 430px 390px;
    margin-bottom: 20px;
    & .Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 1px solid #8639b5;
    }
`
const WrapperSelects = styled('div')`
    display: grid;
    grid-template-columns: 430px 390px;

    & .css-1na6im6-control {
        height: 36px;
    }
`
const DivSelect = styled('div')`
    margin-top: -7px;
    width: 396px;
    div {
        height: 35px;
    }
`
const DivDatePicker = styled('div')``
const WrapperButton = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin-top: 56px;
    button {
        width: 113px;
        height: 37px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        margin-left: 16px;
        padding: 10px 26px 10px 26px;
    }
`
