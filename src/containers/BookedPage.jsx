import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

import addInMyGifts from '../assets/icons/addInMyGifts.svg'
import cacelBooking from '../assets/icons/cancelBooking.svg'
import notFoundImg from '../assets/images/notFoundImg.svg'
import BookedGiftsCard from '../components/ui/BookedGiftsCard'
import BookedWishesCard from '../components/ui/BookedWishesCard'
import {
    addFriendsWishInMyWish,
    getBookedGifts,
    getBookedWishes,
    postCancelBookedGift,
    postCancelBookedWish,
} from '../store/slices/bookedPageAction'

const BookedPage = () => {
    const navigation = [
        {
            icon: addInMyGifts,
            title: 'Добавить в мои подарки',
            id: '1',
            clickItem: (id) => {
                toBookHandler(id)
            },
        },
        {
            icon: cacelBooking,
            title: 'снять бронь',
            id: '2',
            clickItem: (id) => {
                cancelBookedWishHandler(id)
            },
        },
    ]
    const cancelBooked = [
        {
            icon: cacelBooking,
            title: 'снять бронь',
            id: '2',
            clickItem: (id) => {
                cancelBookedGiftHandler(id)
            },
        },
    ]
    const [isShowWishes, setIsShowWishes] = useState(false)
    const [isShowGifts, setIsShowGifts] = useState(false)
    const dispatch = useDispatch()
    const { bookedWishesCard, bookedGiftsCard } = useSelector(
        (state) => state.bookedCards
    )
    useEffect(() => {
        dispatch(getBookedWishes())
        dispatch(getBookedGifts())
    }, [])

    function toBookHandler(id) {
        dispatch(addFriendsWishInMyWish({ id }))
    }
    function cancelBookedWishHandler(id) {
        dispatch(postCancelBookedWish({ id, dispatch }))
    }
    function cancelBookedGiftHandler(id) {
        dispatch(postCancelBookedGift({ id, dispatch }))
    }
    const isShowMoreWishes = () => {
        setIsShowWishes(!isShowWishes)
    }
    const lengthWishesCard = bookedWishesCard.length
    const whichIsShowWishes = isShowWishes ? lengthWishesCard : 3
    const whichTextWishes = whichIsShowWishes < 4 ? 'Смотреть все' : 'Скрыть'
    const textWishes = lengthWishesCard ? true : ''

    const isShowMoreGifts = () => {
        setIsShowGifts(!isShowGifts)
    }
    const lengthGiftsCard = bookedGiftsCard.length
    const whichIsShowGifts = isShowGifts ? lengthGiftsCard : 3
    const whichTextGifts = whichIsShowGifts < 4 ? 'Смотреть все' : 'Скрыть'
    const textGifts = lengthGiftsCard ? true : ''
    return (
        <WrapperPage>
            <H1>Забронированные</H1>
            {textWishes && (
                <WrapperWishes>
                    <H2>Желания</H2>
                    {lengthWishesCard <= 3 ? (
                        ''
                    ) : (
                        <DivIsShow onClick={isShowMoreWishes}>
                            {whichTextWishes}
                        </DivIsShow>
                    )}
                </WrapperWishes>
            )}
            <WrapperCard>
                {bookedWishesCard.slice(0, whichIsShowWishes).map((el) => (
                    <BookedWishesCard
                        key={el.wish.wishId}
                        id={el.wish.wishId}
                        giftName={el.wish.wishName}
                        holiday={el.wish.holiday.name}
                        date={el.wish.wishDate}
                        img={el.wish.photo}
                        navigation={navigation}
                        firstName={el.ownerUser.firstName}
                        lastName={el.ownerUser.lastName}
                        avatar={el.ownerUser.photo}
                        width
                        margin
                    />
                ))}
            </WrapperCard>
            <WrapperCard>
                {textGifts && (
                    <WrapperWishes>
                        <H2>Подарки</H2>
                        {lengthGiftsCard <= 3 ? (
                            ''
                        ) : (
                            <DivIsShow onClick={isShowMoreGifts}>
                                {whichTextGifts}
                            </DivIsShow>
                        )}
                    </WrapperWishes>
                )}
                {bookedGiftsCard.slice(0, whichIsShowGifts).map((el) => (
                    <BookedGiftsCard
                        key={el.gift.giftId}
                        id={el.gift.giftId}
                        img={el.gift.photo}
                        navigation={cancelBooked}
                        giftName={el.gift.name}
                        firstName={el.ownerUser.firstName}
                        lastName={el.ownerUser.lastName}
                        date={el.gift.createdAt}
                        avatar={el.ownerUser.photo}
                        status={el.gift.status}
                    />
                ))}
                {bookedWishesCard.length || bookedGiftsCard.length ? (
                    ''
                ) : (
                    <WrapperNotFoundImg>
                        <NotFoundImg src={notFoundImg} />
                        <h3>Вы пока не добавили желание!</h3>
                    </WrapperNotFoundImg>
                )}
            </WrapperCard>
        </WrapperPage>
    )
}

export default BookedPage

const WrapperNotFoundImg = styled('div')`
    position: relative;
    top: 0px;
    left: 270px;
    text-align: center;
    h3 {
        margin-top: 0;
        margin-bottom: 30px;
    }
`
const NotFoundImg = styled('img')``

const WrapperPage = styled('div')`
    margin: 120px 0 0 10px;
    width: 98%;
`
const H1 = styled('h1')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin-left: 15px;
`
const WrapperWishes = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 25px 0 10px 15px;
`
const H2 = styled('div')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
`
const DivIsShow = styled('div')`
    margin-right: 39px;
    color: #3772ff;
    border-bottom: 1px solid #3772ff;
    cursor: pointer;
`
const WrapperCard = styled('div')`
    display: flex;
    flex-wrap: wrap;
`
