import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { getSingleCharityById } from '../../../store/slices/GiftActions'
import InnerPage from '../../ui/charity/InnerCardCharity'

const CharityMyInnerPage = () => {
    const state = useSelector((state) => state.addCharity.single)
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleCharityById(id))
    }, [])

    return (
        <Container>
            breadCrambs
            {state && <InnerPage my data={state} />}
        </Container>
    )
}
export default CharityMyInnerPage
const Container = styled.div`
    width: 100%;
    margin: 30px auto;
`
