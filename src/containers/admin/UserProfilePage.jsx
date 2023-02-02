import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import unBlockIcon from '../../assets/icons/cancelBooking.svg'
import { ReactComponent as Facebook } from '../../assets/icons/facebookFriendProfilePage.svg'
import { ReactComponent as GrayFacebook } from '../../assets/icons/grayFacebook.svg'
import { ReactComponent as GrayInstagram } from '../../assets/icons/grayInstagram.svg'
import { ReactComponent as GrayTelegram } from '../../assets/icons/grayTelegram.svg'
import { ReactComponent as WkFriendProfile } from '../../assets/icons/grayVk.svg'
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg'
import { ReactComponent as Telegram } from '../../assets/icons/telegram.svg'
import blockIcon from '../../assets/icons/toBook.svg'
import { ReactComponent as Wk } from '../../assets/icons/vkFriendProfile.svg'
import BookedGiftsCard from '../../components/ui/BookedGiftsCard'
import BreadCrumbs from '../../components/ui/breadCrumbs/BreadCrumbs'
import Button from '../../components/ui/Button'
import GiftCard from '../../components/users/GiftCard'
import MyHolidaysCard from '../../components/users/MyHolidaysCard'
import {
    getUserProfileWithId,
    toBlockGift,
    toBlockUser,
    toBlockWish,
    toUnBlockGift,
    toUnBlockUser,
    toUnBlockWish,
} from '../../store/slices/admin/usersPageAction'

function UserProfilePage() {
    const { id } = useParams()
    const userId = id
    const blockWishOption = [
        {
            icon: blockIcon,
            title: 'Блокировать',
            id: '1',
            clickItem: (id) => {
                toBlockWishHandler(id)
            },
        },
    ]
    const unBlockWishOption = [
        {
            icon: unBlockIcon,
            title: 'Разблокировать',
            id: '2',
            clickItem: (id) => {
                toUnBlockWishHandler(id)
            },
        },
    ]
    const blockGiftOption = [
        {
            icon: blockIcon,
            title: 'Блокировать',
            id: '1',
            clickItem: (id) => {
                toBlockGiftHandler(id)
            },
        },
    ]
    const unBlockGiftOption = [
        {
            icon: unBlockIcon,
            title: 'Разблокировать',
            id: '2',
            clickItem: (id) => {
                toUnBlockGiftHandler(id)
            },
        },
    ]
    const [showMoreWishCard, setShowMoreWishCard] = useState(false)
    const [showMoreHolidayCard, setShowMoreHolidayCard] = useState(false)
    const [showMoreCharityCard, setShowMoreCharityCard] = useState(false)

    const { userProfile } = useSelector((state) => state.usersCard)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserProfileWithId(id))
    }, [])
    const toBlockUserHandler = () => {
        dispatch(toBlockUser(userId))
    }
    const toUnBlockUserHandler = () => {
        dispatch(toUnBlockUser(userId))
    }
    function toBlockGiftHandler(id) {
        dispatch(toBlockGift({ id, userId }))
    }
    function toUnBlockGiftHandler(id) {
        dispatch(toUnBlockGift({ id, userId }))
    }
    function toBlockWishHandler(id) {
        dispatch(toBlockWish({ id, userId }))
    }
    function toUnBlockWishHandler(id) {
        dispatch(toUnBlockWish({ id, userId }))
    }
    const isShowMoreHandler = () => {
        setShowMoreHolidayCard(!showMoreHolidayCard)
    }
    const isShowMoreWishHandler = () => {
        setShowMoreWishCard(!showMoreWishCard)
    }
    const isShowMoreGiftHandler = () => {
        setShowMoreCharityCard(!showMoreCharityCard)
    }

    const holidayLength = userProfile?.holidays?.length
    const wichIsShowHoliday = showMoreHolidayCard ? holidayLength : 3
    const whichTextHoliday = wichIsShowHoliday < 4 ? 'Смотреть все' : 'Скрыть'
    const wishesLength = userProfile?.wishes?.length
    const wichIsShowWish = showMoreWishCard ? wishesLength : 3
    const whichTextWish = wichIsShowWish < 4 ? 'Смотреть все' : 'Скрыть'
    const giftLength = userProfile?.gifts?.length
    const wichIsShowGift = showMoreCharityCard ? giftLength : 3
    const whichIsTextGift = wichIsShowGift < 4 ? 'Смотреть все' : 'Скрыть'

    const isBlockUser = userProfile.isBlock ? 'Разблокировать' : 'Блокировать'
    const blockOrUnBlockUser = userProfile.isBlock
        ? toUnBlockUserHandler
        : toBlockUserHandler
    const pathTranslate = {
        users: 'Пользователи',
        [userId]: `${userProfile?.firstName} ${userProfile.lastName}`,
    }
    return (
        <ContainerDiv>
            <div>
                <RouteTitle>
                    <RouteNameTitle>
                        <BreadCrumbs translate={pathTranslate} />
                    </RouteNameTitle>
                </RouteTitle>
            </div>
            <ContentDiv>
                <DivWrap>
                    <StyledCard>
                        <StyledCardMedia
                            image={userProfile?.photo}
                            alt="green iguana"
                        />
                        <CardContent>
                            <UserName>
                                <StyledTypography>
                                    {userProfile?.firstName}{' '}
                                </StyledTypography>
                                <StyledTypography>
                                    {userProfile?.lastName}
                                </StyledTypography>
                            </UserName>
                        </CardContent>
                        <StyledCardActions>
                            <a href={userProfile?.userInfo?.facebookLink}>
                                {userProfile?.userInfo?.facebookLink ? (
                                    <Facebook />
                                ) : (
                                    <GrayFacebook />
                                )}
                            </a>{' '}
                            <a href={userProfile?.userInfo?.instagramLink}>
                                {userProfile?.userInfo?.instagramLink ? (
                                    <Instagram />
                                ) : (
                                    <GrayInstagram />
                                )}
                            </a>
                            <a href={userProfile?.userInfo?.telegramLink}>
                                {userProfile?.userInfo?.telegramLink ? (
                                    <Telegram />
                                ) : (
                                    <GrayTelegram />
                                )}
                            </a>
                            <a href={userProfile?.userInfo?.vkLink}>
                                {userProfile?.userInfo?.vkLink ? (
                                    <Wk />
                                ) : (
                                    <WkFriendProfile />
                                )}
                            </a>
                        </StyledCardActions>
                    </StyledCard>
                </DivWrap>
                <InfoDiv>
                    <MainTitle>Основная информация</MainTitle>

                    {userProfile?.userInfo?.city ? (
                        <div>
                            <GrayTitle>Город:</GrayTitle>
                            <StyledTitle>
                                {userProfile?.userInfo?.city}
                            </StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}

                    {userProfile?.email ? (
                        <div>
                            <GrayTitle>Email:</GrayTitle>
                            <StyledTitle>{userProfile?.email}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userProfile?.userInfo?.dateOfBirth ? (
                        <div>
                            <GrayTitle>Дата рождения:</GrayTitle>
                            <StyledTitle>
                                {userProfile?.userInfo?.dateOfBirth}
                            </StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userProfile?.userInfo?.phoneNumber ? (
                        <div>
                            <GrayTitle>Номер телефона:</GrayTitle>
                            <StyledTitle>
                                {userProfile?.userInfo?.phoneNumber}
                            </StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                </InfoDiv>
                <InfoDiv>
                    {userProfile?.userInfo?.hobby ? (
                        <div>
                            <MainTitle>Интересы, хобби</MainTitle>
                            <GrayTitle>Интересы, хобби:</GrayTitle>
                            <StyledTitle>
                                {userProfile?.userInfo?.hobby}
                            </StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userProfile?.userInfo?.clothingSize ||
                    userProfile?.userInfo?.shoeSize ||
                    userProfile?.userInfo?.importantNote ? (
                        <MainTitle>Дополнительное информация</MainTitle>
                    ) : (
                        ''
                    )}
                    {userProfile?.userInfo?.clothingSize ? (
                        <div>
                            <GrayTitle>Размер одежды:</GrayTitle>
                            <StyledTitle>
                                {userProfile?.userInfo?.clothingSize}
                            </StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userProfile?.userInfo?.shoeSize ? (
                        <div>
                            <GrayTitle>Размер обуви:</GrayTitle>
                            <StyledTitle>
                                {userProfile?.userInfo?.shoeSize}
                            </StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userProfile?.userInfo?.importantNote ? (
                        <div>
                            <GrayTitle>Важно знать:</GrayTitle>
                            <StyledTitle>
                                {userProfile?.userInfo?.importantNote}
                            </StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    <WrapperButton>
                        <Button onClick={blockOrUnBlockUser}>
                            {isBlockUser}
                        </Button>
                    </WrapperButton>
                </InfoDiv>
            </ContentDiv>
            {userProfile?.wishes?.length > 0 ? (
                <MainCardTitle>Желаемые подарки</MainCardTitle>
            ) : (
                ''
            )}
            {wishesLength <= 3 ? (
                ''
            ) : (
                <StyledShowMoreDiv onClick={isShowMoreWishHandler}>
                    <p>{whichTextWish}</p>
                </StyledShowMoreDiv>
            )}
            <StyledCardDiv>
                {userProfile?.wishes?.slice(0, wichIsShowWish).map((el) => {
                    return (
                        <Div status={el.wish.isBlock} key={el.wish.wishId}>
                            <GiftCard
                                variant="board"
                                id={el.wish?.wishId}
                                nameGift={el.wish?.wishName}
                                image={el.wish?.photo}
                                avatarBooked={el?.bookedUser?.photo}
                                holiday={el.wish?.holiday?.name}
                                date={el.wish?.wishDate}
                                isBooked={el?.bookedUser}
                                navigation={
                                    el.wish.isBlock
                                        ? unBlockWishOption
                                        : blockWishOption
                                }
                            />
                        </Div>
                    )
                })}
            </StyledCardDiv>
            {userProfile?.holidays?.length > 0 ? (
                <MainCardTitle>Праздники</MainCardTitle>
            ) : (
                ''
            )}
            {holidayLength <= 3 ? (
                ''
            ) : (
                <StyledShowMoreDiv onClick={isShowMoreHandler}>
                    <p>{whichTextHoliday}</p>
                </StyledShowMoreDiv>
            )}
            <Wrapper>
                {userProfile?.holidays
                    ?.slice(0, wichIsShowHoliday)
                    .map((el) => {
                        return (
                            <WrapperHolidayCard key={el.id}>
                                <MyHolidaysCard
                                    key={el.id}
                                    id={el.id}
                                    date={el.holidayDate}
                                    title={el.name}
                                    img={el.photo}
                                />
                            </WrapperHolidayCard>
                        )
                    })}
            </Wrapper>
            {userProfile?.gifts?.length > 0 ? (
                <MainCardTitle>Благотворительность</MainCardTitle>
            ) : (
                ''
            )}
            {giftLength <= 3 ? (
                ''
            ) : (
                <StyledShowMoreDiv onClick={isShowMoreGiftHandler}>
                    <p>{whichIsTextGift}</p>
                </StyledShowMoreDiv>
            )}
            <div>
                <StyledCardDiv>
                    {userProfile?.gifts?.slice(0, wichIsShowGift).map((el) => {
                        return (
                            <BookedGiftsCard
                                status={el.gift.isBlock}
                                id={el.gift?.giftId}
                                key={el.gift?.giftId}
                                nameGift={el.gift?.name}
                                image={el.gift?.photo}
                                avatarBooked={el.bookedUser?.photo}
                                holiday={el.gift?.status}
                                date={el.gift?.createdAt}
                                isBooked={el?.bookedUser}
                                navigation={
                                    el.gift.isBlock
                                        ? unBlockGiftOption
                                        : blockGiftOption
                                }
                            />
                        )
                    })}
                </StyledCardDiv>
            </div>
        </ContainerDiv>
    )
}

export default UserProfilePage
const WrapperButton = styled('div')`
    margin-left: 100%;
`
const ContainerDiv = styled('div')`
    width: 97%;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 30px;
    margin-top: 110px;
`
const RouteTitle = styled('p')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #b4b4b4;
`
const RouteNameTitle = styled('span')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
`
const ContentDiv = styled('div')`
    background-color: white;
    width: 1118px;
    height: 464px;
    display: grid;
    grid-template-columns: 230px 290px 300px;
    border-radius: 10px;
    position: sticky;
`
const UserName = styled('div')`
    display: flex;
    justify-content: space-around;
`
const MainCardTitle = styled('div')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: bolder;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.2px;
    margin-top: 54px;
    color: #020202;
`
const MainTitle = styled('p')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    letter-spacing: 0.2px;
    color: #8639b5;
`

const GrayTitle = styled('span')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    margin-top: 6px;
    display: flex;
    align-items: center;
    color: #5c5c5c;
    padding: 5px 0;
`
const StyledTitle = styled('span')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
`

const StyledShowMoreDiv = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin-top: -34px;
    margin-right: 50px;
    & p {
        display: inline;
        color: blue;
        cursor: pointer;
        border-bottom: 1px solid blue;
    }
`

const StyledCardDiv = styled('div')`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    padding-bottom: 20px;
`
const Wrapper = styled('div')`
    display: flex;
    flex-wrap: wrap;
`
const WrapperHolidayCard = styled('div')`
    margin: 1%;
    width: 30%;
    margin-top: 20px;
    padding-bottom: 20px;
`
const Div = styled('div')`
    opacity: ${(props) => (props.status === true ? '0.5' : '1')};
    margin: 1%;
    width: 30%;
    margin-top: 20px;
    padding-bottom: 20px;
`
const DivWrap = styled('div')`
    margin-top: 10px;
`
const StyledCard = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const StyledCardMedia = styled(CardMedia)`
    width: 187px;
    height: 190px;
    border-radius: 8px;
    border: 1px solid gray;
`
const StyledTypography = styled(Typography)`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.2px;
    color: #020202;
    margin-bottom: 24px;
    margin-right: 10px;
`

const StyledCardActions = styled(CardActions)`
    width: 197px;
    display: flex;
    justify-content: space-evenly;
`
const InfoDiv = styled('div')`
    width: 284px;
    margin-top: 47px;
    margin-left: 40px;
`
