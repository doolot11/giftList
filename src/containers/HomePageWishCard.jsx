import { useEffect } from 'react'

import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import BreadCrumbs from '../components/ui/breadCrumbs/BreadCrumbs'
import Button from '../components/ui/Button'
import { deleteWishGift } from '../store/slices/AddWishCardActions'
import {
    cancelBookingWish,
    toBookWish,
} from '../store/slices/friendProfileAction'
import { getSingleWishAction } from '../store/slices/HomePageActions'

const HomePageWishCard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.authSlice?.user.id)
    const { singleWish } = useSelector((state) => state.homePageWishes)
    const { wishId } = useParams()
    useEffect(() => {
        dispatch(getSingleWishAction(wishId))
    }, [wishId])
    const link = () => {
        navigate(`/wish_list/${singleWish?.wish.wishId}/edit`)
    }
    const reserve = () => {
        dispatch(toBookWish({ id: singleWish?.wish.wishId, dispatch }))
    }
    const deleteMyWish = () => {
        dispatch(deleteWishGift(singleWish?.wish.wishId))
        navigate('/lenta')
    }
    const cancelBook = () => {
        dispatch(cancelBookingWish({ id: singleWish?.wish.wishId, dispatch }))
    }
    const pathTranslate = {
        lenta: 'Лента',
        [wishId]: singleWish?.wish?.wishName,
    }
    return (
        <WrapperContent>
            <BreadCrumbsDiv>
                <BreadCrumbs translate={pathTranslate} />
            </BreadCrumbsDiv>
            {/* <p style={{ display: 'flex' }}>
                Лента
                <h4 style={{ margin: '0' }}> / {singleWish?.wish?.wishName}</h4>
            </p> */}
            <MainDiv>
                <WrapperDiv>
                    <Img src={singleWish?.wish?.photo} alt="image" />
                    <WishContent>
                        <User>
                            <StyledAvatar
                                src={singleWish?.ownerUser?.photo}
                                alt="avatar"
                            />
                            <UserName>
                                {singleWish?.ownerUser?.firstName}{' '}
                                {singleWish?.ownerUser?.lastName}
                            </UserName>

                            <ToBooking>
                                {singleWish?.wish?.booking === null
                                    ? 'в ожидании'
                                    : 'забронирован'}
                            </ToBooking>
                        </User>
                        <SectionDiv>
                            <WishNameAndDateWrapper>
                                <HolidayTitle>Название праздника:</HolidayTitle>
                                <DateTitle>Дата праздника:</DateTitle>
                            </WishNameAndDateWrapper>
                            <WishNameAndDateWrapper>
                                <HolidayName>
                                    {singleWish?.wish?.holiday?.name}
                                </HolidayName>
                                <HolidayDate>
                                    {singleWish?.wish?.holiday?.holidayDate}
                                </HolidayDate>
                            </WishNameAndDateWrapper>
                            <div>
                                <StyledH1>
                                    {singleWish?.wish?.wishName}
                                </StyledH1>
                                <Styledp>
                                    {singleWish?.wish?.description}
                                </Styledp>
                            </div>
                        </SectionDiv>
                    </WishContent>
                </WrapperDiv>
                <WrapperButtons>
                    {user === singleWish?.ownerUser?.userId && (
                        <>
                            <Button variant="outlined" onClick={deleteMyWish}>
                                Удалить
                            </Button>
                            <Button onClick={link}>Редактировать</Button>
                        </>
                    )}
                    <But>
                        {singleWish?.ownerUser?.userId !== +user &&
                            singleWish?.wish?.booking === null && (
                                <Button onClick={reserve}>Забронировать</Button>
                            )}
                        {singleWish?.wish?.booking === null &&
                            singleWish?.bookedUser?.userId === +user && (
                                <Button onClick={reserve}>Забронировать</Button>
                            )}
                        {singleWish?.bookedUser?.userId === +user && (
                            <Button onClick={cancelBook}>Отменить бронь</Button>
                        )}
                    </But>
                </WrapperButtons>
            </MainDiv>
        </WrapperContent>
    )
}
export default HomePageWishCard

const BreadCrumbsDiv = styled.div`
    margin-top: 40px;
    margin-bottom: 30px;
`
const But = styled.div`
    & button {
        width: auto;
    }
`
const WishContent = styled('div')`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
`
const Img = styled('img')`
    width: 329px;
    height: 329px;
    border-radius: 8px;
`
const WrapperDiv = styled('div')`
    padding: 20px 20px 0 20px;
    width: 100%;
    display: flex;
    align-items: center;
`
const WishNameAndDateWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 50%;
`
const MainDiv = styled('div')`
    width: 100%;
    min-height: 550px;
    overflow: hidden;
    border-radius: 10px;
    background-color: white;
`
const WrapperContent = styled('div')`
    width: 1000px;
    margin: 0 auto;
    padding-top: 50px;
`
const User = styled('div')`
    display: grid;
    grid-template-columns: 48px 465px 120px;
    margin-left: 5px;
    height: 30px;
    box-sizing: border-box;
`
const StyledAvatar = styled(Avatar)`
    width: 36px;
    height: 36px;
`
const UserName = styled('h2')`
    box-sizing: border-box;
    margin: 0;
    width: auto;
    height: 30px;
`
const ToBooking = styled('p')`
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    color: #3774d0;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    margin-top: 5px;
`
const SectionDiv = styled('div')`
    display: flex;
    flex-direction: column;
    margin-top: 14px;
`
const HolidayTitle = styled('div')`
    color: #5c5c5c;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
`
const DateTitle = styled('div')`
    color: #5c5c5c;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
`
const HolidayName = styled('div')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    color: #0ba360;
`
const HolidayDate = styled('div')`
    font-weight: 500;
    margin-right: 25px;
`
const StyledH1 = styled('h1')`
    color: #3774d0;
    font-size: 24px;
    font-weight: 500;
`
const Styledp = styled('p')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    /* margin-bottom: 50px; */
    width: 95%;
`
const WrapperButtons = styled('div')`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & button {
        margin: 0 15px;
    }
`
