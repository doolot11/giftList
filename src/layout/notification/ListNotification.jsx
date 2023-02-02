import React from 'react'

import styled from '@emotion/styled'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ListNotification(props) {
    const navigate = useNavigate()
    const { role } = useSelector((state) => state.authSlice.user)
    const userName = props.userFirstName.concat(` ${props.userLastName}`)
    const statusNotif = () => {
        if (props.notificationStatus === 'ADD_WISH') {
            return `добавил желаемый подарок "${props.wishOrGiftOrHolidayName}"`
        }
        if (props.notificationStatus === 'ADD_HOLIDAY') {
            return `добавил новый праздник "${props.wishOrGiftOrHolidayName}"`
        }
        if (props.notificationStatus === 'ADD_WISH_BOOKING') {
            return `было забронировано ${userName}`
        }
        if (props.notificationStatus === 'ADD_GIFT') {
            return `добавил подарок "${props.wishOrGiftOrHolidayName}"`
        }
        if (props.notificationStatus === 'REQUEST_TO_FRIEND') {
            return `отправил запрос в друзья`
        }
        if (props.notificationStatus === 'COMPLAINT_TO_WISH') {
            return `пожаловался на "${props.wishOrGiftOrHolidayName}"`
        }
        if (props.notificationStatus === 'COMPLAINT_TO_GIFT') {
            return `пожаловался на "${props.wishOrGiftOrHolidayName}"`
        }
        if (props.notificationStatus === 'ADD_GIFT_BOOKING') {
            return `было забронировано ${userName}`
        }

        return statusNotif
    }
    const isComplainWish =
        props.notificationStatus === 'COMPLAINT_TO_WISH' ? userName : ''
    const isAddWish = props.notificationStatus === 'ADD_WISH' ? userName : ''
    const isAddHoliday =
        props.notificationStatus === 'ADD_HOLIDAY' ? userName : ''
    const isAddGift = props.notificationStatus === 'ADD_GIFT' ? userName : ''
    const isComplainGift =
        props.notificationStatus === 'COMPLAINT_TO_GIFT' ? userName : ''
    const isReguest =
        props.notificationStatus === 'REQUEST_TO_FRIEND' ? userName : ''
    const isNameWish =
        props.notificationStatus === 'ADD_WISH_BOOKING'
            ? props.wishOrGiftOrHolidayName
            : ''
    const isNameGift =
        props.notificationStatus === 'ADD_GIFT_BOOKING'
            ? props.wishOrGiftOrHolidayName
            : ''
    const toProfileUser = () => {
        if (role !== 'ADMIN') {
            navigate(`/friends/${props.userId}`)
        } else {
            navigate(`/users/${props.userId}`)
        }
        props.onClose()
    }
    return (
        <StyledMenuItem onClick={toProfileUser} read={props.read}>
            <Avatar src={props.photo} />
            <WrapperMessage>
                <UserName>
                    {isAddHoliday}
                    {isAddGift}
                    {isAddWish}
                    {isComplainGift}
                    {isComplainWish}
                    {isNameGift}
                    {isReguest}
                    {isNameWish}
                </UserName>
                <Message>{statusNotif()} </Message>
                <NotifDate>{props.createdAt} </NotifDate>
            </WrapperMessage>
        </StyledMenuItem>
    )
}

export default ListNotification
const UserName = styled('div')`
    color: #3772ff;
`
const WrapperMessage = styled('div')`
    width: 100%;
    margin-left: 15px;
`
const Message = styled('div')`
    width: 100%;
`
const NotifDate = styled('div')`
    width: 100%;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #949494;
`
const StyledMenuItem = styled('div')`
    cursor: pointer;
    background: ${(props) =>
        props.read ? 'white' : 'rgba(134, 57, 181, 0.1)'};
    display: flex;
    align-items: center;
    height: 75px;
    padding: 0 40px 0 20px;
`
