import { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import Button from '../components/ui/Button'
import ViewsDatePicker from '../components/ui/datePicker/ViewsDatePicker'
import ImagePicker from '../components/ui/ImagePicker'
import Input from '../components/ui/Input'
import Select from '../components/ui/select/Select'
import TextArea from '../components/ui/Textarea'
import {
    getHolidaysToSelect,
    getWishWithId,
    putWishCard,
} from '../store/slices/AddWishCardActions'

import AddHolidayModal from './AddHolidayModal'

const EditWishCardPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const [params, setParams] = useSearchParams()
    const { addHoliday } = Object.fromEntries([...params])

    const { dataWishCardWithId, holidaysToSelect } = useSelector(
        (state) => state.wishCard
    )
    const [wishPhoto, setWishPhoto] = useState(null)
    const [wishGift, setWishGift] = useState({
        wishName: '',
        wishLink: '',
        description: '',
    })
    const [dateWish, setDateWish] = useState('')
    const [wishSelect, setWishSelect] = useState('')

    useEffect(() => {
        dispatch(getWishWithId(id))
    }, [dataWishCardWithId?.wish?.photo])
    useEffect(() => {
        dispatch(getHolidaysToSelect())
    }, [])

    useEffect(() => {
        if (dataWishCardWithId?.wish?.wishDate) {
            const sd = dataWishCardWithId?.wish?.wishDate.split('.')
            setDateWish(new Date(sd[2], sd[1] - 1, sd[0]))
        }
        setWishGift({
            wishName: dataWishCardWithId?.wish?.wishName,
            wishLink: dataWishCardWithId?.wish?.wishLink,
            description: dataWishCardWithId?.wish?.description,
        })
        setWishSelect(dataWishCardWithId?.wish?.holiday.id)
        setWishPhoto(dataWishCardWithId?.wish?.photo)
    }, [dataWishCardWithId?.wish?.photo, dataWishCardWithId?.wish?.wishDate])

    const cancel = () => {
        navigate('/wish_list')
    }
    const holidayNameHandler = (e) => {
        setWishSelect(e.id)
    }

    const editImageHandler = (file) => {
        setWishPhoto(file)
    }

    const wishGiftHandler = (e) => {
        setWishGift({
            ...wishGift,
            [e.target.name]: e.target.value,
        })
    }
    const DateHandler = (e) => {
        setDateWish(e)
    }
    const openAddModalHandler = () => {
        setParams({ addHoliday: true })
    }
    const closeModalHandler = () => {
        setParams({})
    }

    wishGift.wishDate = dateWish
    wishGift.holidayId = wishSelect

    const putDataWishCard = (e) => {
        e.preventDefault()
        dispatch(
            putWishCard({
                id,
                wishGift,
                wishPhoto,
                dispatch,
            })
        )
        navigate('/wish_list')
    }
    const img = wishPhoto?.name ? null : wishPhoto
    return (
        <WrapperAll onSubmit={putDataWishCard}>
            <ImagePicker
                newFile={img}
                onChange={editImageHandler}
                id="editImagePicker"
            />
            <WrapperEdit>
                <H2>Добавление желаемого подарка</H2>
                <WrapperLabels>
                    <Label> Название п одарка</Label>
                    <Label>Ссылка на подарок </Label>
                </WrapperLabels>
                <WrapperInputs>
                    <Input
                        name="wishName"
                        width="396px"
                        value={wishGift.wishName}
                        onChange={wishGiftHandler}
                    />
                    <Input
                        name="wishLink"
                        width="396px"
                        value={wishGift.wishLink}
                        onChange={wishGiftHandler}
                    />
                </WrapperInputs>
                <WrapperSelects>
                    <DivSelect>
                        <Select
                            holidayName={
                                dataWishCardWithId?.wish?.holiday?.name
                            }
                            options={holidaysToSelect}
                            label="Праздник"
                            getValue={holidayNameHandler}
                            additionalOption={
                                <MenuItemButton onClick={openAddModalHandler}>
                                    <Plus>+</Plus> Добавить праздник
                                </MenuItemButton>
                            }
                        />
                    </DivSelect>
                    <DivDatePicker>
                        <ViewsDatePicker
                            value={dateWish}
                            label="Дата праздника"
                            onChange={DateHandler}
                        />
                    </DivDatePicker>
                </WrapperSelects>
                <TextArea
                    name="description"
                    label="Описание подарка"
                    value={wishGift.description}
                    onChange={wishGiftHandler}
                />
                <WrapperButton>
                    <Button variant="outlined" onClick={cancel}>
                        Отмена
                    </Button>
                    <Button variant="contained" onClick={putDataWishCard}>
                        Сохранить
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

export default EditWishCardPage
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
    width: 100%;
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
    grid-template-columns: 430px 395px;
    margin-bottom: 20px;
    & .Mui-focused .MuiOutlinedInput-notchedOutline {
        border: 1px solid #8639b5;
    }
`
const WrapperSelects = styled('div')`
    display: grid;
    grid-template-columns: 430px 390px;
`
const DivSelect = styled('div')`
    width: 396px;
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
