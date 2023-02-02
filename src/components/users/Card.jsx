import * as React from 'react'
import { useMemo } from 'react'

import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { useSelector } from 'react-redux'

import addInMyGiftIcon from '../../assets/icons/addInMyGifts.svg'
import cancelBooking from '../../assets/icons/cancelBooking.svg'
import complaintIcon from '../../assets/icons/complaintss.svg'
import deleteIcon from '../../assets/icons/deleteIcon.svg'
import editIcon from '../../assets/icons/editIcon.svg'
import toBookIcon from '../../assets/icons/toBook.svg'
import MeatBalls from '../ui/meatBall/components/meatBalls'

export default function Card(props) {
    const {
        variant,
        photo,
        addWishStatus,
        isBooked,
        wishPhoto,
        userName,
        lastName,
        wishName,
        holidayName,
        holidayDate,
        isAvatarInBooking,
        navigate,
        idOfOwnerUser,
        toBookWishHandler,
        addToMyWishHandler,
        openModalHandler,
        cancelBookingWishHandler,
        editCard,
        deleteCard,
        navigateToUserProfile,
    } = props
    const myId = useSelector((state) => state.authSlice.user.id)

    const options = useMemo(() => checkOwnBook(), [isBooked?.userId])

    function checkOwnBook() {
        const isIWillBookAddAndComplainByMe = [
            {
                icon: toBookIcon,
                title: 'Забронировать',
                id: '1',
                clickItem: (id) => toBookWishHandler(id),
            },
            {
                icon: addInMyGiftIcon,
                title: 'Добавить в мои подарки',
                id: '2',
                clickItem: (id) => addToMyWishHandler(id),
            },
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        const ownerDeleteEdit = [
            {
                icon: editIcon,
                title: 'Редактировать',
                id: '4',
                clickItem: () => editCard(),
            },
            {
                icon: deleteIcon,
                title: 'Удалить',
                id: '5',
                clickItem: () => deleteCard(),
            },
        ]

        const isIWillCancelBookAddAndComplainByMe = [
            {
                icon: cancelBooking,
                title: 'Снять бронь',
                id: '1',
                clickItem: (id) => cancelBookingWishHandler(id),
            },
            {
                icon: addInMyGiftIcon,
                title: 'Добавить в мои подарки',
                id: '2',
                clickItem: (id) => addToMyWishHandler({ id }),
            },
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        const isIWillCancelBookandComplainByMe = [
            {
                icon: cancelBooking,
                title: 'Снять бронь',
                id: '2',
                clickItem: (id) => cancelBookingWishHandler(id),
            },
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        const isIWillBookAndComplainByMe = [
            {
                icon: toBookIcon,
                title: 'Забронировать',
                id: '1',
                clickItem: (id) => toBookWishHandler(id),
            },
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]

        const isIWillAddAndComplainByMe = [
            {
                icon: addInMyGiftIcon,
                title: 'Добавить в мои подарки',
                id: '2',
                clickItem: (id) => addToMyWishHandler(id),
            },
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]

        const isIWillComplainByMe = [
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        if (isBooked === null && addWishStatus === 'NOT_ADD') {
            return isIWillBookAddAndComplainByMe
        }
        if (idOfOwnerUser === myId) {
            return ownerDeleteEdit
        }
        if (isBooked === null && addWishStatus === 'ADDED') {
            return isIWillBookAndComplainByMe
        }
        if (isBooked?.userId === myId && addWishStatus === 'NOT_ADD') {
            return isIWillCancelBookAddAndComplainByMe
        }
        if (isBooked?.userId === myId && addWishStatus === 'ADDED') {
            return isIWillCancelBookandComplainByMe
        }
        if (isBooked?.userId !== idOfOwnerUser && addWishStatus === 'NOT_ADD') {
            return isIWillAddAndComplainByMe
        }
        if (isBooked?.userId !== idOfOwnerUser && addWishStatus === 'ADDED') {
            return isIWillComplainByMe
        }
        return isIWillBookAddAndComplainByMe
    }

    const isMyId = () => {
        const booked = (
            <StyledAvatarOnBook>
                <StyledsmallAvatar src={isAvatarInBooking} alt="avatar" />
                <span>
                    {isBooked?.userId === myId
                        ? 'Вы забронировали'
                        : 'Забронирован'}
                </span>
            </StyledAvatarOnBook>
        )
        const pending = 'В ожидании'
        if (isBooked) {
            return booked
        }
        if (!isBooked) {
            return pending
        }
        return booked
    }

    return (
        <StyledCard variants={variant} onClick={navigate}>
            <StyledCardMedia
                variants={variant}
                component="img"
                image={wishPhoto}
                alt="green iguana"
            />

            <StyledCardContentFirst variants={variant}>
                <StyledAvatar
                    alt="Cindy Baker"
                    src={photo}
                    variants={variant}
                    onClick={navigateToUserProfile}
                />
                <UserDiv>
                    <UserName variants={variant}>
                        {userName} {lastName}
                    </UserName>
                </UserDiv>
                <StyledBirthday>{holidayName}</StyledBirthday>
            </StyledCardContentFirst>
            <NameGift variants={variant}>{wishName}</NameGift>
            <CardSecondDiv>
                <StyledCardContentSecond variants={variant}>
                    <StyledDate variants={variant}>{holidayDate}</StyledDate>
                    <Wrapper>
                        <StyledText>{isMyId()}</StyledText>
                    </Wrapper>
                    <WrapperMeetballs onClick={(e) => e.stopPropagation()}>
                        <MeatBalls navigations={options} />
                    </WrapperMeetballs>
                </StyledCardContentSecond>
            </CardSecondDiv>
        </StyledCard>
    )
}
const WrapperMeetballs = styled('div')``
const StyledCard = styled(MuiCard)(({ variants }) => ({
    ...(variants === 'board' && {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        border: '1px solid #FFFFFF',
        borderRadius: '8px',
    }),
    ...(variants === 'list' && {
        height: '95%',
        display: 'flex',
        position: 'relative',
    }),
}))
const StyledAvatar = styled(Avatar)(({ variants }) => ({
    ...(variants === 'board' && {
        cursor: 'pointer',
    }),
    ...(variants === 'list' && {
        width: '35px',
        height: '35px',
    }),
}))

const StyledAvatarOnBook = styled('div')`
    display: flex;
`
const StyledsmallAvatar = styled(Avatar)`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`
const UserDiv = styled('div')`
    padding: 0px;
    cursor: pointer;
`
const UserName = styled('h1')`
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin-top: 10px;
`
const Wrapper = styled('div')`
    display: flex;
    justify-content: flex-end;
`
const StyledCardContentFirst = styled(CardContent)(({ variants }) => ({
    margin: '0px',
    display: 'flex',
    ...(variants === 'board' && {
        height: '36px',
        padding: '0',
        margin: '16px',
        order: '-1',
        display: 'grid',
        gridTemplateColumns: '43px 135px 101px',
    }),
    ...(variants === 'list' && {
        display: 'grid',
        gridTemplateColumns: '43px 180px 141px',
        padding: '0',
        margin: '16px 16px 0 0',
    }),
}))

const CardSecondDiv = styled.div`
    padding: 0px;
    margin-top: 12px;
    margin-bottom: 0px;
    padding-left: 0px;
`
const StyledCardContentSecond = styled(CardContent)(({ variants }) => ({
    display: 'grid',
    padding: '0',
    ...(variants === 'board' && {
        gridTemplateColumns: '80px 205px 10px',
        gridTemplateRows: '0px',
        margin: '15px 16px 0 16px',
    }),
    ...(variants === 'list' && {
        gridTemplateColumns: '35px 305px 10px',
        position: 'absolute',
        width: '20%',
        top: '18.5vh',
        left: '24.5vh',
    }),
}))

const StyledCardMedia = styled(CardMedia)(({ variants }) => ({
    borderRadius: '6px',
    ...(variants === 'board' && {
        width: '90%',
        height: '48%',
        margin: '0 16px 0 16px',
        order: '0',
    }),
    ...(variants === 'list' && {
        width: '25%',
        height: '78%',
        margin: '16px 14px 16px 16px',
    }),
}))

const NameGift = styled('span')(({ variants }) => ({
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
    fontStyle: 'normal',
    color: '#000000',
    ...(variants === 'board' && {
        margin: '0 16px 20px 16px',
        order: '-1',
    }),
    ...(variants === 'list' && {
        position: 'absolute',
        left: '183px',
        top: '75px',
    }),
}))
const StyledDate = styled('p')(({ variants }) => ({
    fontStyle: 'Inter',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16.94px',
    color: '#636c84',
    margin: '0px',
    ...(variants === 'board' && {}),
    ...(variants === 'list' && {
        marginLeft: '25px',
    }),
}))
const StyledText = styled('span')`
    font-size: Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #636c84;
`
const StyledBirthday = styled('p')`
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
    margin-left: 30px;
    font-size: 'Inter';
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #0ba360;
`
