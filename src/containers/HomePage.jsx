import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as BoardIcon } from '../assets/icons/boardIcon.svg'
import { ReactComponent as ListIcon } from '../assets/icons/listIcon.svg'
import ImageNotFound from '../assets/images/EmptyState.png'
import Card from '../components/users/Card'
import ReportModal from '../components/users/ReportModal'
import { deleteWishGift } from '../store/slices/AddWishCardActions'
import {
    addtoMyWish,
    cancelBookingWish,
    copmlainToWish,
    toBookWish,
} from '../store/slices/friendProfileAction'
import { getWishAction } from '../store/slices/HomePageActions'
import { showErrorMessage } from '../utils/helpers'

const Image = (props) => {
    const { alt, ...otherProps } = props

    return <img alt={alt} {...otherProps} />
}
const HomePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [boardList, setBoardList] = useState(false)
    const [loadSpinner, setLoadSpinner] = useState(false)
    const [title, setTitle] = useState('')
    const [complaintId, setcomplaintId] = useState('')
    const { homePageWishes } = useSelector((state) => state.homePageWishes)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getWishAction())
    }, [])

    function toBookWishHandler(id) {
        dispatch(toBookWish({ id }))
        setLoadSpinner(true)
    }

    function cancelBookingWishHandler(id) {
        dispatch(cancelBookingWish({ id }))
        setLoadSpinner(true)
    }
    const addToMyWishHandler = (id) => {
        dispatch(addtoMyWish({ id }))
    }
    const sendComplainToWishHandler = async () => {
        try {
            await dispatch(copmlainToWish({ complaintId, title })).unwrap()
            setOpenModal(false)
        } catch (error) {
            showErrorMessage('Не удалось отправить')
        }
    }

    function openModalHandler(id) {
        setcomplaintId(id)
        setOpenModal(!openModal)
    }
    const titleChangeHandler = (e) => {
        setTitle(e.title)
    }
    const closeModalHandler = () => {
        setOpenModal(false)
    }
    const boardChangeHandler = () => {
        setBoardList(false)
    }
    const listChangeHandler = () => {
        setBoardList(true)
    }

    const navigateToCardPage = (id) => {
        navigate(`${id}`)
    }
    const deletecardhandler = (id) => {
        dispatch(deleteWishGift(id))
    }
    const navigateToUserProfile = (userId) => {
        navigate(`/friends/${userId}`)
    }
    const formatCard = boardList ? 'list' : 'board'
    return (
        <>
            {openModal && (
                <ReportModal
                    open={openModal}
                    onClose={closeModalHandler}
                    onChange={titleChangeHandler}
                    onClick={sendComplainToWishHandler}
                />
            )}

            <HolidayCardDiv>
                <TitleButtonWrapper>
                    <NamePage>Лента</NamePage>
                    <IconDiv>
                        <ButtonBoard onClick={boardChangeHandler}>
                            <BoardIcons fill={formatCard} />
                        </ButtonBoard>
                        <ButtonList onClick={listChangeHandler}>
                            <ListIcons fill={formatCard} />
                        </ButtonList>
                    </IconDiv>
                </TitleButtonWrapper>

                <CardDiv variant={formatCard}>
                    {homePageWishes.length ? (
                        homePageWishes?.map((el) => {
                            return (
                                <Card
                                    key={el?.wish?.wishId}
                                    id={el?.wish?.wishId}
                                    userName={el?.ownerUser?.firstName}
                                    lastName={el?.ownerUser?.lastName}
                                    photo={el?.ownerUser?.photo}
                                    wishName={el?.wish?.wishName}
                                    wishPhoto={el.wish?.photo}
                                    addWishStatus={el?.wish?.addWishStatus}
                                    holidayName={el?.wish?.holiday?.name}
                                    holidayDate={el?.wish?.holiday?.holidayDate}
                                    isBooked={el?.bookedUser}
                                    idOfOwnerUser={el?.ownerUser?.userId}
                                    booking={el?.wish?.booking?.id}
                                    isAvatarInBooking={el.bookedUser?.photo}
                                    variant={formatCard}
                                    spinner={loadSpinner}
                                    openModalHandler={() =>
                                        openModalHandler(el?.wish.wishId)
                                    }
                                    addToMyWishHandler={() => {
                                        addToMyWishHandler(el?.wish.wishId)
                                    }}
                                    toBookWishHandler={() => {
                                        toBookWishHandler(el?.wish.wishId)
                                    }}
                                    cancelBookingWishHandler={() => {
                                        cancelBookingWishHandler(
                                            el?.wish.wishId
                                        )
                                    }}
                                    navigate={(e) => {
                                        e.stopPropagation()
                                        navigateToCardPage(el?.wish?.wishId)
                                    }}
                                    navigateToUserProfile={(e) => {
                                        e.stopPropagation()
                                        navigateToUserProfile(
                                            el?.ownerUser?.userId
                                        )
                                    }}
                                    editCard={() => {
                                        navigate(
                                            `/wish_list/${el?.wish.wishId}/edit`
                                        )
                                    }}
                                    deleteCard={() => {
                                        deletecardhandler(el?.wish.wishId)
                                    }}
                                />
                            )
                        })
                    ) : (
                        <NotFound>
                            <Image src={ImageNotFound} alt="photo" />
                            <TextNotFound>
                                <NothingSpan>Ничего нет</NothingSpan>
                                <TextParagraph>
                                    Здесь будет отображен список желаемых
                                    подарков ваших друзей
                                </TextParagraph>
                            </TextNotFound>
                        </NotFound>
                    )}
                </CardDiv>
            </HolidayCardDiv>
        </>
    )
}

export default HomePage
const TextParagraph = styled('p')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
`
const NotFound = styled('div')`
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    text-align: center;
`
const NothingSpan = styled('span')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-top: 20px;
`
const TextNotFound = styled('div')`
    position: absolute;
    top: 330px;
    text-align: center;
    left: 0;
    right: 0;
`
const HolidayCardDiv = styled('div')`
    margin-top: 118px;
    margin-left: 20px;
    margin-right: 40px;
`
const NamePage = styled('h1')`
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #020202;
`
const TitleButtonWrapper = styled('div')`
    width: 100%;
    height: 39px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const IconDiv = styled('div')`
    display: flex;
    align-items: center;
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
const ButtonBoard = styled('button')`
    width: 41px;
    height: 39px;
    background: #fbfafc;
    border: 1px solid #ebeaed;
    cursor: pointer;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`
const ButtonList = styled('button')`
    width: 41px;
    height: 39px;
    background: #fbfafc;
    border: 1px solid #ebeaed;
    cursor: pointer;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`
const CardDiv = styled('div')(({ variant }) => ({
    ...(variant === 'board' && {
        marginTop: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(6, 320px)',
        gridColumnGap: '19px',
        gridRowGap: '15px',
    }),
    ...(variant === 'list' && {
        marginTop: '32px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(6, 1fr)',
        gridColumnGap: '19px',
        gridRowGap: '15px',
    }),
}))
