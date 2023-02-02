import * as React from 'react'

import { Card, CardMedia, styled } from '@mui/material'
import { useDispatch } from 'react-redux'

import deleteIcon from '../../assets/icons/deleteIcon.svg'
import editIcon from '../../assets/icons/editIcon.svg'
import { getHolidayById } from '../../store/slices/HolidayActions'
import MeatBalls from '../ui/meatBall/components/meatBalls'

export default function MyHolidaysCard({
    id,
    img,
    title,
    date,
    onOpen,
    getId,
    navigate,
    variant,
    openDeleteModal,
}) {
    const dispatch = useDispatch()
    const navigations = [
        {
            id: '1',
            icon: editIcon,
            title: 'Редактировать',
            clickItem: (e) => {
                onOpen(id)
                getId(id)
                dispatch(getHolidayById(id))
                e.stopPropagation()
            },
        },
        {
            id: '2',
            icon: deleteIcon,
            title: 'Удалить',
            clickItem: (e) => {
                openDeleteModal(id)
                getId(id)
                e.stopPropagation()
            },
        },
    ]
    return (
        <StyledCard onClick={navigate}>
            <StyledCardMedia component="img" alt={title} image={img} />
            <HolidayTitleDiv>
                <HolidayTitle>{title}</HolidayTitle>
            </HolidayTitleDiv>
            <StyledFooter>
                <StyledDate>{date}</StyledDate>
                {variant && (
                    <MeatBallsWrapper onClick={(e) => e.stopPropagation()}>
                        <MeatBalls navigations={navigations} />
                    </MeatBallsWrapper>
                )}
            </StyledFooter>
        </StyledCard>
    )
}
const MeatBallsWrapper = styled('div')`
    width: auto;
`
const StyledCard = styled(Card)`
    box-sizing: border-box;
    width: 100%;
    height: 38vh;
    border-radius: 8px;
    padding: 16px;
`
const StyledCardMedia = styled(CardMedia)`
    width: 100%;
    height: 67%;
    border-radius: 6px;
`
const HolidayTitleDiv = styled('div')`
    margin-top: 16px;
`
const HolidayTitle = styled('span')`
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: #020202;
`
const StyledFooter = styled('div')`
    display: grid;
    grid-template-columns: 85% 1fr;
    margin-top: 14px;
`
const StyledDate = styled('span')`
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #636c84;
`
