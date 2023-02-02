import React, { useEffect, useState } from 'react'

import { styled } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as BoardIcon } from '../assets/icons/boardIcon.svg'
import deleteIcon from '../assets/icons/deleteIcon.svg'
import editIcon from '../assets/icons/editIcon.svg'
import { ReactComponent as ListIcon } from '../assets/icons/listIcon.svg'
import { ReactComponent as Plus } from '../assets/icons/plusIconInTheButton.svg'
import notFoundImg from '../assets/images/notFoundImg.svg'
import Button from '../components/ui/Button'
import GiftCard from '../components/users/GiftCard'
import {
    getWishGift,
    deleteWishGift,
    getWishWithId,
} from '../store/slices/AddWishCardActions'

const WishList = () => {
    const dispatch = useDispatch()
    const navigateEdit = useNavigate()
    const { cards, deleteId } = useSelector((data) => data.wishCard)
    const navigation = [
        {
            icon: editIcon,
            title: 'Редактировать',
            id: '1',
            clickItem: (id) => {
                toEditPage(id)
                dispatch(getWishWithId(id))
            },
        },
        {
            icon: deleteIcon,
            title: 'Удалить',
            id: '2',
            clickItem: (id) => {
                dispatch(deleteWishGift(id))
            },
        },
    ]

    useEffect(() => {
        dispatch(getWishGift())
    }, [deleteId])

    const [format, setFormat] = useState(false)
    const navigate = useNavigate()

    const toInnerPage = (e) => {
        navigate(`/wish_list/${e}`)
    }
    const toaddWish = (e) => {
        navigate(`/wish_list/${e}`)
    }
    function toEditPage(id) {
        navigateEdit(`${id}/edit`)
    }

    const boardHandler = () => {
        setFormat(false)
    }
    const listHandler = () => {
        setFormat(true)
    }
    const formatCard = format ? 'list' : 'board'
    return (
        <DivWishList>
            <WrapperTop>
                <H2>Список желаний</H2>
                {cards.length ? (
                    <WrapperIcon>
                        <ButtonIcon onClick={boardHandler}>
                            <BoardIcons fill={formatCard} />
                        </ButtonIcon>
                        <ButtonIcon onClick={listHandler}>
                            <ListIcons fill={formatCard} />
                        </ButtonIcon>
                        <Button
                            onClick={() => toaddWish('add')}
                            startIcon={<Plus />}
                        >
                            Добавить желание
                        </Button>
                    </WrapperIcon>
                ) : (
                    ''
                )}
            </WrapperTop>
            <WrapperCards variant={formatCard}>
                {cards.length ? (
                    cards?.map((el) => (
                        <GiftCard
                            key={el.wish.wishId}
                            id={el.wish.wishId}
                            variant={formatCard}
                            image={el.wish.photo}
                            nameGift={el.wish.wishName}
                            date={el.wish.wishDate}
                            holiday={el.wish.holiday.name}
                            toBook={el.toBooking}
                            avatarBooked={el?.bookedUser?.photo}
                            navigateToInnerPage={() => {
                                toInnerPage(el.wish.wishId)
                            }}
                            navigation={navigation}
                        />
                    ))
                ) : (
                    <WrapperNotFoundImg>
                        <NotFoundImg src={notFoundImg} />
                        <h3>Вы пока не добавили желание!</h3>
                        <Button
                            onClick={() => toaddWish('add')}
                            startIcon={<Plus />}
                        >
                            Добавить желание
                        </Button>
                    </WrapperNotFoundImg>
                )}
            </WrapperCards>
        </DivWishList>
    )
}

export default WishList

const WrapperNotFoundImg = styled('div')`
    position: relative;
    top: 0px;
    left: 270px;
    text-align: center;
    h3 {
        margin-top: 0;
        margin-bottom: 30px;
    }
    button {
        width: 219px;
        height: 39px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 19px;
        margin-left: 180px;
    }
`
const NotFoundImg = styled('img')``
const DivWishList = styled('div')`
    margin: 120px 40px 0 20px;
`

const WrapperTop = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    button:last-of-type {
        width: 219px;
        height: 39px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 19px;
        margin-left: 16px;
    }
`
const H2 = styled('h2')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
`
const WrapperIcon = styled('div')`
    display: flex;
    margin-right: 30px;
    button:first-of-type {
        border-radius: 4px 0 0 4px;
    }
`
const ButtonIcon = styled('button')`
    width: 41px;
    height: 39px;
    background: #fbfafc;
    border: 1px solid #ebeaed;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;
`
const BoardIcons = styled(BoardIcon)(({ fill }) => ({
    ...(fill === 'board' && {
        fill: '#8639B5',
    }),
    ...(fill === 'list' && {
        fill: '#84818a',
    }),
}))

const ListIcons = styled(ListIcon)(({ fill }) => ({
    ...(fill === 'board' && {
        fill: '#84818a',
    }),
    ...(fill === 'list' && {
        fill: '#8639B5',
    }),
}))
const WrapperCards = styled('div')(({ variant }) => ({
    ...(variant === 'board' && {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gridColumnGap: '19px',
        gridRowGap: '15px',
    }),
    ...(variant === 'list' && {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gridColumnGap: '19px',
        gridRowGap: '15px',
    }),
}))
