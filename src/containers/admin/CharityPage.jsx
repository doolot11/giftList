import React from 'react'

import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import toUnBlock from '../../assets/icons/cancelBooking.svg'
import toBlock from '../../assets/icons/toBook.svg'
import BookedGiftsCard from '../../components/ui/BookedGiftsCard'
import {
    toBlockGifts,
    toUnBlockGifts,
} from '../../store/slices/admin/charityAction'

export const CharityPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { charities } = useSelector((state) => state.searching)
    const optionBlock = [
        {
            icon: toBlock,
            title: 'Блокировать',
            id: '2',
            clickItem: (id) => {
                blockGiftHandler(id)
            },
        },
    ]
    const optionUnBlock = [
        {
            icon: toUnBlock,
            title: 'Разблокировать',
            id: '2',
            clickItem: (id) => {
                unBlockGiftHandler(id)
            },
        },
    ]
    function blockGiftHandler(id) {
        dispatch(toBlockGifts(id))
    }
    function unBlockGiftHandler(id) {
        dispatch(toUnBlockGifts(id))
    }
    const toInnerPageById = (id) => {
        navigate(`/charityAdmin/${id}`)
    }
    return (
        <WrapperCharityPage>
            <H1>Благотворительность</H1>
            <WrapperCards>
                {charities.map((el) => (
                    <BookedGiftsCard
                        id={el?.gift?.giftId}
                        key={el?.gift?.giftId}
                        date={el?.gift?.createdAt}
                        giftName={el?.gift?.name}
                        firstName={el?.ownerUser?.firstName}
                        lastName={el?.ownerUser?.lastName}
                        status={el?.gift?.isBlock}
                        img={el?.gift?.photo}
                        navigation={
                            el.gift.isBlock ? optionUnBlock : optionBlock
                        }
                        toInnerPage={() => {
                            toInnerPageById(el?.gift?.giftId)
                        }}
                    />
                ))}
            </WrapperCards>
        </WrapperCharityPage>
    )
}

const WrapperCharityPage = styled('div')`
    margin-top: 110px;
`
const H1 = styled('h2')`
    margin-left: 10px;
`
const WrapperCards = styled('div')`
    display: flex;
    flex-wrap: wrap;
`
