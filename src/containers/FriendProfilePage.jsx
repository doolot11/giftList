import { useState, useEffect } from 'react'

import {
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    styled,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { ReactComponent as Facebook } from '../assets/icons/facebookFriendProfilePage.svg'
import { ReactComponent as GrayFacebook } from '../assets/icons/grayFacebook.svg'
import { ReactComponent as GrayInstagram } from '../assets/icons/grayInstagram.svg'
import { ReactComponent as GrayTelegram } from '../assets/icons/grayTelegram.svg'
import { ReactComponent as GrayVk } from '../assets/icons/grayVk.svg'
import { ReactComponent as Instagram } from '../assets/icons/instagram.svg'
import { ReactComponent as Telegram } from '../assets/icons/telegram.svg'
import { ReactComponent as Vk } from '../assets/icons/vkFriendProfile.svg'
import BreadCrumbs from '../components/ui/breadCrumbs/BreadCrumbs'
import Button from '../components/ui/Button'
import ChangePassword from '../components/ui/ChangePassword'
import MyHolidays from '../components/users/MyHolidaysCard'
import {
    deleteFriendAction,
    addToFriendAction,
    getFriendProfileAction,
} from '../store/slices/friendProfileAction'
import {
    acceptRequestToFriendInnerPage,
    rejectRequestToFriendActionInnerPage,
} from '../store/slices/friendTabAction'

import FriendGiftCards from './FriendGiftCards'
import FriendWishCards from './FriendWishCards'

const FRIEND = 'FRIEND'
const NOT_FRIEND = 'NOT_FRIEND'
const REQUEST_TO_FRIEND = 'REQUEST_TO_FRIEND'
const WITHOUTMEATBALLS = 'withoutMeatBalls'

const FriendProfilePage = () => {
    const [showMoreWishCard, setShowMoreWishCard] = useState(false)
    const [showMoreHolidayCard, setShowMoreHolidayCard] = useState(false)
    const [showMoreCharityCard, setShowMoreCharityCard] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const idOfOwnerUser = useSelector((state) => state.authSlice.user.id)
    const { userId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { friend, userInfo, gifts, holidays, wishes } = useSelector(
        (state) => state.friend
    )
    const friendId = useSelector((state) => state.friend.friend.id)
    useEffect(() => {
        if (userId) {
            dispatch(getFriendProfileAction(userId))
        }
    }, [userId, dispatch])

    const addToFriendHandler = () => {
        dispatch(addToFriendAction({ friendId, userId, dispatch }))
    }
    const deleteFriendHandler = () => {
        dispatch(deleteFriendAction({ friendId, userId, dispatch }))
    }
    const acceptToFriendHandler = () => {
        dispatch(acceptRequestToFriendInnerPage({ userId, dispatch }))
    }
    const rejectRequestHandler = () => {
        dispatch(rejectRequestToFriendActionInnerPage({ userId, dispatch }))
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

    const editProfileHandler = () => {
        navigate('/myprofile/edit_profile')
    }
    const changePasswordHandler = () => {
        setChangePassword(true)
    }
    const holidayLength = holidays.length
    const wichIsShowHoliday = showMoreHolidayCard ? holidayLength : 3
    const whichTextHoliday = wichIsShowHoliday < 4 ? 'Смотреть все' : 'Скрыть'
    const wishesLength = wishes.length
    const wichIsShowWish = showMoreWishCard ? wishesLength : 3
    const whichTextWish = wichIsShowWish < 4 ? 'Смотреть все' : 'Скрыть'
    const giftLength = gifts.length
    const wichIsShowGift = showMoreCharityCard ? giftLength : 3
    const whichIsTextGift = wichIsShowGift < 4 ? 'Смотреть все' : 'Скрыть'

    const renderButtons = () => {
        if (friend.friendStatus === NOT_FRIEND && friend.id === idOfOwnerUser) {
            return (
                <ButtonDiv>
                    <Button variant="contained" onClick={editProfileHandler}>
                        Редактировать
                    </Button>
                    <Button variant="outlined" onClick={changePasswordHandler}>
                        Сменить пароль
                    </Button>
                </ButtonDiv>
            )
        }
        if (friend.friendStatus === FRIEND) {
            return (
                <ButtonDiv>
                    <Button variant="contained" onClick={deleteFriendHandler}>
                        Удалить из друзей
                    </Button>
                </ButtonDiv>
            )
        }
        if (friend.friendStatus === NOT_FRIEND) {
            return (
                <ButtonDiv>
                    <Button variant="contained" onClick={addToFriendHandler}>
                        Добавить в друзья
                    </Button>
                </ButtonDiv>
            )
        }
        if (friend.friendStatus === REQUEST_TO_FRIEND) {
            return (
                <ButtonDiv>
                    <Button variant="contained" onClick={acceptToFriendHandler}>
                        Принять заявку
                    </Button>
                    <Button variant="outlined" onClick={rejectRequestHandler}>
                        Отклонить
                    </Button>
                </ButtonDiv>
            )
        }

        return (
            <ButtonDiv>
                <Button variant="contained">Запрос отправлен</Button>
            </ButtonDiv>
        )
    }
    const pathTranslate = {
        friends: friend.friendStatus === FRIEND ? 'Друзья' : 'Запросы в друзья',
        [friendId]: `${friend?.firstName} ${friend?.lastName}`,
    }
    return (
        <ContainerDiv>
            {changePassword && (
                <ChangePassword setChangePassword={setChangePassword} />
            )}
            <RouteTitle>
                <BreadCrumbs translate={pathTranslate} />
                {/* {friend.friendStatus === FRIEND
                        ? 'Друзья'
                        : 'Запросы в друзья'}
                    <RouteNameTitle>/{friend?.firstName}</RouteNameTitle> */}
            </RouteTitle>

            <ContentDiv>
                <div>
                    <StyledCard>
                        <StyledCardMedia
                            image={friend?.photo}
                            alt="green iguana"
                        />
                        <CardContent>
                            <UserName>
                                <StyledTypography>
                                    {friend?.firstName}
                                </StyledTypography>
                                <StyledTypography>
                                    {friend?.lastName}
                                </StyledTypography>
                            </UserName>
                            {renderButtons()}
                        </CardContent>
                        <StyledCardActions>
                            <a href={userInfo?.facebookLink}>
                                {userInfo?.facebookLink ? (
                                    <Facebook />
                                ) : (
                                    <GrayFacebook />
                                )}
                            </a>{' '}
                            <a href={userInfo?.instagramLink}>
                                {userInfo?.instagramLink ? (
                                    <Instagram />
                                ) : (
                                    <GrayInstagram />
                                )}
                            </a>
                            <a href={userInfo?.telegramLink}>
                                {userInfo?.telegramLink ? (
                                    <Telegram />
                                ) : (
                                    <GrayTelegram />
                                )}
                            </a>
                            <a href={userInfo?.vkLink}>
                                {userInfo?.vkLink ? <Vk /> : <GrayVk />}
                            </a>
                        </StyledCardActions>
                    </StyledCard>
                </div>
                <InfoDiv>
                    <MainTitle>Основная информация</MainTitle>

                    {userInfo?.city ? (
                        <div>
                            <GrayTitle>Город:</GrayTitle>
                            <StyledTitle>{userInfo?.city}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}

                    {friend?.email ? (
                        <div>
                            <GrayTitle>Email:</GrayTitle>
                            <StyledTitle>{friend?.email}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userInfo?.dateOfBirth ? (
                        <div>
                            <GrayTitle>Дата рождения:</GrayTitle>
                            <StyledTitle>{userInfo?.dateOfBirth}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userInfo?.phoneNumber ? (
                        <div>
                            <GrayTitle>Номер телефона:</GrayTitle>
                            <StyledTitle>{userInfo?.phoneNumber}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                </InfoDiv>
                <InfoDiv>
                    {userInfo?.hobby ? (
                        <div>
                            <MainTitle>Интересы, хобби</MainTitle>
                            <GrayTitle>Интересы, хобби:</GrayTitle>
                            <StyledTitle>{userInfo?.hobby}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userInfo?.clothingSize ||
                    userInfo?.shoeSize ||
                    userInfo?.importantNote ? (
                        <MainTitle>Дополнительное информация</MainTitle>
                    ) : (
                        ''
                    )}
                    {userInfo?.clothingSize ? (
                        <div>
                            <GrayTitle>Размер одежды:</GrayTitle>
                            <StyledTitle>{userInfo?.clothingSize}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userInfo?.shoeSize ? (
                        <div>
                            <GrayTitle>Размер обуви:</GrayTitle>
                            <StyledTitle>{userInfo?.shoeSize}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                    {userInfo?.importantNote ? (
                        <div>
                            <GrayTitle>Важно знать:</GrayTitle>
                            <StyledTitle>{userInfo?.importantNote}</StyledTitle>
                        </div>
                    ) : (
                        ''
                    )}
                </InfoDiv>
            </ContentDiv>
            {wishes.length > 0 ? (
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
                {wishes.slice(0, wichIsShowWish).map((wishes) => {
                    return (
                        <FriendWishCards
                            key={wishes.wish?.wishId}
                            wishes={wishes}
                            idOfOwnerUser={idOfOwnerUser}
                        />
                    )
                })}
            </StyledCardDiv>
            {holidays.length > 0 ? (
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

            <StyledCardDiv>
                {holidays.slice(0, wichIsShowHoliday).map((el) => {
                    return (
                        <MyHolidays
                            key={el.id}
                            id={el.id}
                            date={el.holidayDate}
                            title={el.name}
                            img={el.photo}
                            variant={WITHOUTMEATBALLS}
                        />
                    )
                })}
            </StyledCardDiv>
            {gifts?.length > 0 ? (
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
                    {gifts?.slice(0, wichIsShowGift).map((gifts) => {
                        return (
                            <FriendGiftCards
                                key={gifts?.gift?.giftId}
                                gifts={gifts}
                                idOfOwnerUser={idOfOwnerUser}
                            />
                        )
                    })}
                </StyledCardDiv>
            </div>
        </ContainerDiv>
    )
}
export default FriendProfilePage

const ContainerDiv = styled('div')`
    width: 1086px;
    margin-top: 118px;
    /* margin: 0 auto; */
    padding: 0 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 60px;
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
const InfoDiv = styled('div')`
    width: 284px;
    margin-top: 47px;
    margin-left: 40px;
`
const RouteTitle = styled('div')`
    margin-bottom: 31px;
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
    & p {
        display: inline;
        color: blue;
        cursor: pointer;
        border-bottom: 1px solid blue;
    }
`

const StyledCardDiv = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 36px;
    grid-row-gap: 36px;
    padding-top: 20px;
    padding-bottom: 20px;
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
`

const StyledCardActions = styled(CardActions)`
    width: 197px;
    display: flex;
    justify-content: space-evenly;
`
const ButtonDiv = styled('div')`
    button {
        width: 197px;
        height: 39px;
        text-transform: none;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 16px;
    }
`
