import * as React from 'react'

import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import MeatBalls from '../ui/meatBall/components/meatBalls'

export default function GiftCard(props) {
    const {
        variant,
        image,
        nameGift,
        avatarBooked,
        holiday,
        date,
        isBooked,
        navigation,
        idOfOwnerUser,
        id,
    } = props
    const isMyId = () => {
        const booked = (
            <SpanAvatar>
                <StyledAvatar src={avatarBooked} alt="avatar" />
                {isBooked?.userId === idOfOwnerUser
                    ? 'Вы забронировали'
                    : 'Забронирован'}
            </SpanAvatar>
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
    const isNewStateTex = () => {
        const oldState = 'Б/У'
        const newState = 'Новый'
        if (holiday === 'USED') {
            return oldState
        }
        if (holiday !== 'USED') {
            return newState
        }
        return oldState
    }
    return (
        <StyledCard variants={variant}>
            <StyledCardMedia
                variants={variant}
                component="img"
                image={image}
                alt={nameGift}
            />
            <Wrapper>
                <StyledCardContentFirst variants={variant}>
                    <NameGift>{nameGift}</NameGift>
                    <StyledBirthday status={isNewStateTex()}>
                        {isNewStateTex()}
                    </StyledBirthday>
                </StyledCardContentFirst>
                <StyledCardContentSecond variants={variant}>
                    <StyledDate variants={variant}>{date}</StyledDate>
                    <WrapperToBooking variants={variant}>
                        <StyledText>{isMyId()}</StyledText>
                    </WrapperToBooking>
                    <WrapperMeatBalls variants={variant}>
                        <MeatBalls navigations={navigation} id={id} />
                    </WrapperMeatBalls>
                </StyledCardContentSecond>
            </Wrapper>
        </StyledCard>
    )
}

const WrapperToBooking = styled('div')(({ variants }) => ({
    display: 'flex',
    ...(variants === 'board' && {
        justifyContent: 'flex-end',
    }),
    ...(variants === 'list' && {
        order: '-1',
        justifyContent: 'flex-start',
    }),
}))

const StyledAvatar = styled(Avatar)`
    width: 20px;
    height: 20px;
    margin-right: 10px;
`
const SpanAvatar = styled('span')`
    display: flex;
`
const StyledCard = styled(Card)(({ variants }) => ({
    ...(variants === 'board' && {
        width: '349px',
        height: '250px',
        cursor: 'pointer',
    }),
    ...(variants === 'list' && {
        display: 'flex',
        width: '533px',
        height: '134px',
        cursor: 'pointer',
    }),
}))
const Wrapper = styled('div')``
const WrapperMeatBalls = styled('div')(({ variants }) => ({
    ...(variants === 'list' && {
        position: 'absolute',
        top: '50px',
        left: '290px',
    }),
}))
const StyledCardContentFirst = styled(CardContent)(({ variants }) => ({
    display: 'flex',
    alignItems: 'center',
    ...(variants === 'board' && {
        justifyContent: 'space-between',
        padding: '3px 16px 3px 16px',
    }),
    ...(variants === 'list' && {
        width: '335px',
        justifyContent: 'space-between',
        paddingLeft: '0',
    }),
}))

const StyledCardContentSecond = styled(CardContent)(({ variants }) => ({
    display: 'grid',
    ...(variants === 'board' && {
        gridTemplateColumns: '80px 190px 10px',
        padding: '10px 16px 0 16px',
    }),
    ...(variants === 'list' && {
        width: '335px',
        position: 'relative',
        gridTemplateColumns: '190px 145px 5px',
        padding: '10px 16px 0 0px',
    }),
}))

const NameGift = styled('span')`
    font-size: Inter;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
`
const StyledDate = styled('span')(({ variants }) => ({
    fontSTyle: 'Inter',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#636c84',
    ...(variants === 'list' && {
        display: 'flex',
        justifyContent: 'flex-end',
    }),
}))
const StyledText = styled('span')`
    font-size: Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #636c84;
`
const StyledBirthday = styled('span')`
    font-size: Inter;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${(props) => (props.status === 'Б/У' ? '#fd5200' : '#0ba360')};
`
const StyledCardMedia = styled(CardMedia)(({ variants }) => ({
    borderRadius: '6px',

    ...(variants === 'board' && {
        width: '317px',
        height: '149px',
        margin: '16px',
    }),
    ...(variants === 'list' && {
        width: '146px',
        height: '102px',
        margin: '16px',
    }),
}))
