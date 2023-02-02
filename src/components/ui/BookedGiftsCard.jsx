import * as React from 'react'

import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import MuiCard from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

import MeatBalls from './meatBall/components/meatBalls'

export default function BookedGiftsCard({
    avatar,
    date,
    firstName,
    lastName,
    status,
    giftName,
    navigation,
    img,
    id,
    toInnerPage,
}) {
    const statusGift = status === 'USED' ? 'Б/У' : 'новый'
    return (
        <StyledCard status={status} onClick={toInnerPage}>
            <StyledCardContentFirst>
                <Div>
                    <StyledAvatar alt="Cindy Baker" src={avatar} />
                    <UserName>
                        {firstName} {lastName}
                    </UserName>
                </Div>
            </StyledCardContentFirst>
            <Div>
                <NameGift>{giftName}</NameGift>
                <Status sts={status}>{statusGift}</Status>
            </Div>
            <StyledCardMedia component="img" image={img} alt="green iguana" />

            <StyledCardContentSecond onClick={(e) => e.stopPropagation()}>
                <StyledDate>{date}</StyledDate>
                <MeatBalls navigations={navigation} id={id} />
            </StyledCardContentSecond>
        </StyledCard>
    )
}

const StyledCard = styled(MuiCard)`
    width: 28%;
    height: 31%;
    margin: 1%;
    padding: 1%;
    opacity: ${(props) => (props.status === true ? '0.5' : '1')};
`

const StyledAvatar = styled(Avatar)`
    width: 36px;
    height: 36px;
    margin-right: 10px;
`
const UserName = styled('h1')`
    font-family: 'Inter' sans-serif;
    font-weight: 650;
    font-size: 16px;
    line-height: 19.36px;
`
const StyledCardContentFirst = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-bottom: 10px;
`
const Div = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledCardContentSecond = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 15px 0 0px;
`

const StyledCardMedia = styled(CardMedia)`
    border-radius: 6px;
    margin-top: 10px;
    height: 153px;
`

const NameGift = styled('span')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 130%;
`
const StyledDate = styled('span')``
const Status = styled('span')(({ sts }) => ({
    fontFamily: 'sans-serif',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '15px',
    ...(sts === 'NEW' && {
        color: ' #0ba360',
    }),
    ...(sts === 'USED' && {
        color: ' #fd5200',
    }),
}))
