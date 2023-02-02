import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import unBlockIcon from '../../assets/icons/cancelBooking.svg'
import mailIcon from '../../assets/icons/mail.svg'
import blockIcon from '../../assets/icons/toBooking.svg'
import Button from '../../components/ui/Button'
import UserCard from '../../components/users/UserCard'
import {
    getAllUsers,
    toBlockUser,
    toUnBlockUser,
} from '../../store/slices/admin/usersPageAction'

import CreatingMailingList from './CreatingMailingList'

export const UsersPage = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users } = useSelector((state) => state.usersCard)
    const openHandler = () => {
        setOpen(true)
    }
    const closeMailingListHandler = () => {
        setOpen(false)
    }
    const blockOption = [
        {
            icon: blockIcon,
            title: ' Блокировать',
            id: '3',
            clickItem: (id) => {
                blockingUser(id)
            },
        },
    ]
    const unBlockOption = [
        {
            icon: unBlockIcon,
            title: 'Разблокировать',
            id: '3',
            clickItem: (id) => {
                unBlockingUser(id)
            },
        },
    ]
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    const toInnerPage = (id) => {
        navigate(`${id}`)
    }
    function blockingUser(id) {
        dispatch(toBlockUser(id))
    }
    function unBlockingUser(id) {
        dispatch(toUnBlockUser(id))
    }
    return (
        <WrapperPage>
            <MailingDiv>
                <H1>Пользователи</H1>
                <Button variant="outlined" onClick={openHandler}>
                    <Img src={mailIcon} /> Отправить рассылку
                </Button>
                {open && (
                    <CreatingMailingList
                        open={open}
                        onClose={closeMailingListHandler}
                    />
                )}
            </MailingDiv>
            <WrapperCards>
                {users.map((el) => (
                    <UserCard
                        status={el.isBlock}
                        key={el.id}
                        id={el.id}
                        img={el.photo}
                        amountWishes={el.countGift}
                        lastName={el.last_name}
                        firstName={el.first_name}
                        option={el.isBlock ? unBlockOption : blockOption}
                        onClick={() => toInnerPage(el.id)}
                    />
                ))}
            </WrapperCards>
        </WrapperPage>
    )
}

const WrapperPage = styled('div')`
    margin: 110px 0 0 20px;
`
const H1 = styled('h1')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
`
const WrapperCards = styled('div')`
    display: flex;
    flex-wrap: wrap;
`
const MailingDiv = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-right: 74px;
    button {
        width: 258px;
        height: 39px;
        border: 1px solid #8639b5;
        color: #8639b5;
    }
`
const Img = styled.img`
    margin-right: 10px;
    width: 16px;
    height: auto;
`
