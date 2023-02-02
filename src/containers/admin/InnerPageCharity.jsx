import React, { useEffect } from 'react'

import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import InnerCardCharity from '../../components/ui/charity/InnerCardCharity'
import {
    getGiftsById,
    toBlockGifts,
    toUnBlockGifts,
} from '../../store/slices/admin/charityAction'

function InnerPageCharity() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { giftById } = useSelector((state) => state.searching)
    useEffect(() => {
        dispatch(getGiftsById(id))
    }, [])
    const blockHandler = (id) => {
        dispatch(toBlockGifts(id))
    }
    const unblockHandler = (id) => {
        dispatch(toUnBlockGifts(id))
    }
    return (
        <Wrapper>
            <InnerCardCharity
                onClickBlock={blockHandler}
                onClickUnBlock={unblockHandler}
                data={giftById}
                admin
            />
        </Wrapper>
    )
}

export default InnerPageCharity
const Wrapper = styled('div')`
    margin-top: 110px;
`
