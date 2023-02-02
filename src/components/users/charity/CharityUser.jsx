import { useEffect } from 'react'

import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import toBook from '../../../assets/icons/toBook.svg'
import {
    getCharity,
    getMyCharity,
    toBookCharity,
    toCancelCharity,
} from '../../../store/slices/GiftActions'
import Button from '../../ui/Button'
import CharityCard from '../../ui/charity/CharityCard'

const CharityUser = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.addCharity)
    const { charities } = useSelector((state) => state.searching)
    const navigate = useNavigate()
    const link = (b) => {
        navigate(`${b}`)
    }
    useEffect(() => {
        dispatch(getCharity())
        dispatch(getMyCharity())
    }, [])
    const clickCard = (id) => {
        navigate(`/charity/${id}`)
    }
    const addCharity = () => {
        navigate('/charity/add_charity')
    }
    const clickmyCharity = (id) => {
        navigate(`/charity/my/${id}`)
    }
    return (
        <CharityDiv>
            <Header>
                <div>
                    <h2>Благотворительность</h2>
                    <Img>
                        {state.myCharity?.map((el) => (
                            <StyledAvatar
                                key={el.gift.giftId}
                                src={el.gift.photo}
                                alt="my charities"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    clickmyCharity(el.gift.giftId)
                                }}
                            />
                        ))}
                    </Img>
                </div>
                <Button onClick={addCharity}>+ Добавить подарок</Button>
            </Header>
            <CardList>
                {charities?.map((el) => (
                    <CharityCard
                        icon={toBook}
                        clickItem={(id) => dispatch(toBookCharity(id))}
                        cancelBooking={(id) => dispatch(toCancelCharity(id))}
                        userName={el.ownerUser.firstName}
                        avatar={el.ownerUser.photo}
                        bookedUser={el?.bookedUser}
                        key={el.gift.giftId}
                        data={el.gift}
                        clickCard={(event) => {
                            event.stopPropagation()
                            clickCard(el.gift.giftId)
                        }}
                        id={el.gift.giftId}
                        onClickImg={() => link(`/charity/${el.id}`)}
                    />
                ))}
            </CardList>
        </CharityDiv>
    )
}
export default CharityUser

const CharityDiv = styled.div`
    margin-top: 118px;
`
const CardList = styled.div`
    min-width: 1086px;
    margin: 30px 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 19px;
    grid-row-gap: 15px;
`
const Header = styled.div`
    display: flex;
    align-items: center;
    width: inherit;
    margin: 5px 20px;
    padding: 0px;
    justify-content: space-between;
    & button {
        width: auto;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #ffffff;
    }
    & div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & > h2 {
            margin-right: 28px;
        }
    }
    & h2 {
        font-family: 'Inter';
        font-style: bold;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        display: flex;
        align-items: center;
        letter-spacing: 0.2px;
        color: #020202;
    }
`
const StyledAvatar = styled(Avatar)`
    background-color: #fafafa;
`
const Img = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 80%;
    gap: 16px;
`
