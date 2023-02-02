import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux/es/exports'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import deleteIcon from '../assets/icons/deleteIcon.svg'
import editIcon from '../assets/icons/editIcon.svg'
import NotHolidayImage from '../assets/icons/notHoliday.png'
import GiftCard from '../components/users/GiftCard'
import {
    deleteWishGift,
    getWishWithId,
} from '../store/slices/AddWishCardActions'
import { getHoliday } from '../store/slices/HolidayActions'
import { getHolidayWish } from '../store/slices/HolidayGiftsActions'

const Image = (props) => {
    const { alt, ...otherProps } = props

    return <img alt={alt} {...otherProps} />
}
const HolidayCardInnerPage = () => {
    const { holidayGifts } = useParams()
    const dispatch = useDispatch()
    const holidayUserGifts = useSelector((state) => state)
    const navigate = useNavigate()
    const navigation = [
        {
            icon: editIcon,
            title: 'Редактировать',
            id: '1',
            clickItem: (id) => {
                dispatch(getWishWithId(id))
                navigate(`/wish_list/${id}/edit`)
            },
        },
        {
            icon: deleteIcon,
            title: 'удалить',
            id: '2',
            clickItem: (id) => {
                dispatch(deleteWishGift(id))
            },
        },
    ]
    useEffect(() => {
        dispatch(getHolidayWish(holidayGifts))
        dispatch(getHoliday())
    }, [holidayGifts, holidayUserGifts?.wishCard?.deleteId])

    const nameHoliday = holidayUserGifts?.holiday?.holiday?.filter(
        (i) => i.id === +holidayGifts
    )
    return (
        <HolidayInnerDiv>
            <HolidayTitle>
                <Title>{nameHoliday[0]?.name}</Title>
            </HolidayTitle>
            {holidayUserGifts?.holidayUserGifts?.holidayUserGifts.length ? (
                <GiftCardDiv>
                    {holidayUserGifts?.holidayUserGifts?.holidayUserGifts?.map(
                        (el) => {
                            return (
                                <GiftCard
                                    key={el.wish.wishId}
                                    id={el.wish.wishId}
                                    date={el.wish.wishDate}
                                    variant="board"
                                    nameGift={el.wish.wishName}
                                    holiday={el.wish.holiday.name}
                                    image={el.wish.photo}
                                    toBook={el.wish.booking}
                                    navigation={navigation}
                                />
                            )
                        }
                    )}
                </GiftCardDiv>
            ) : (
                <NotFound>
                    <Image src={NotHolidayImage} alt="photo" />
                    <p style={{ textAlign: 'center' }}>
                        Еще нет желаний связанных с этим праздником
                    </p>
                </NotFound>
            )}
        </HolidayInnerDiv>
    )
}

export default HolidayCardInnerPage

const NotFound = styled('p')`
    position: absolute;
    top: 100px;
    text-align: center;
    left: 0;
    right: 0;
    font-size: x-large;
`
const HolidayInnerDiv = styled('div')`
    padding-top: 90px;
    margin-left: 20px;
    margin-right: 40px;
`
const GiftCardDiv = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 19px;
    grid-row-gap: 15px;
`
const HolidayTitle = styled('div')`
    height: 39px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const Title = styled('h1')`
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #020202;
`
