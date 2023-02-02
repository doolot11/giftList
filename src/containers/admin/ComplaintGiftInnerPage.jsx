import { useEffect } from 'react'

import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BreadCrumbs from '../../components/ui/breadCrumbs/BreadCrumbs'
import Button from '../../components/ui/Button'
import {
    getGiftAction,
    toBlockGiftAction,
    unBlockGiftAction,
} from '../../store/slices/admin/complaintsAction'

const ComplaintGiftInnerPage = () => {
    const { giftId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGiftAction(giftId))
    }, [giftId])

    const complaintGift = useSelector(
        (state) => state.complaintGift.complaintGift
    )

    const { gift } = complaintGift
    const giftOwnerUser = complaintGift?.ownerUser
    const giftBookeduser = complaintGift?.bookedUser

    const avatarBookedUser = () => {
        if (giftBookeduser) {
            return giftBookeduser.photo
        }
        return null
    }

    const titleIsBooked = () => {
        if (giftBookeduser) {
            return 'Забронирован'
        }
        return 'В ожидании'
    }

    function complaint() {
        if (gift?.complaints) {
            return gift?.complaints?.map((el) => {
                return (
                    <div key={el?.complaintId}>
                        <Avatar
                            src={el?.fromUser?.photo}
                            alt={el?.fromUser?.firstName}
                        />

                        <UserComplainedName>
                            <span>{el?.fromUser?.firstName}</span>
                            <span>{el?.fromUser?.lastName}</span>
                        </UserComplainedName>
                        <ComplainText>{el?.text}</ComplainText>
                    </div>
                )
            })
        }

        return null
    }

    function isUsedOrNew() {
        if (gift?.status === 'USED') {
            return 'Б/У'
        }
        if (gift?.status === 'NEW') {
            return 'Новый'
        }
        return null
    }

    const toBlockGiftHandler = (id) => {
        dispatch(toBlockGiftAction(id))
    }
    const unBlockGiftHandler = (id) => {
        dispatch(unBlockGiftAction(id))
    }

    const isBlockHandler = (giftId) => {
        if (gift?.isBlock === false) {
            return (
                <Button onClick={() => toBlockGiftHandler(giftId)}>
                    Блокировать
                </Button>
            )
        }
        if (gift?.isBlock === true) {
            return (
                <Button onClick={() => unBlockGiftHandler(giftId)}>
                    Разблокировать
                </Button>
            )
        }

        return null
    }
    const pathTranslate = {
        complaints: 'Жалобы',
        [giftId]: gift?.name,
    }
    return (
        <div style={{ marginTop: '118px' }}>
            <RouteTitle>
                <BreadCrumbs translate={pathTranslate} />
            </RouteTitle>
            <div style={styleForCard}>
                <Img src={gift?.photo} alt={gift?.wishName} />
                <WrapperDiv>
                    <User>
                        <StyledAvatar
                            src={giftOwnerUser?.photo}
                            alt={giftOwnerUser?.firstName}
                        />
                        <UserName>
                            <span> {giftOwnerUser?.firstName}</span>
                            <span>{giftOwnerUser?.lastName}</span>
                        </UserName>
                        <StyledToBookUserDiv>
                            <ToBookUserAvatar
                                src={avatarBookedUser()}
                                alt="avatar"
                            />
                            <ToBooking>{titleIsBooked()}</ToBooking>
                        </StyledToBookUserDiv>
                    </User>
                    <StyledH1>{gift?.wishName}</StyledH1>
                    <Styledp>{gift?.description}</Styledp>
                    <WrapperNameGiftAndDate>
                        {gift?.category ? (
                            <>
                                <NameGift>Категория:</NameGift>
                                <DateGift>Состояние:</DateGift>{' '}
                            </>
                        ) : (
                            ''
                        )}
                    </WrapperNameGiftAndDate>
                    <WrapperPropsGiftAndDate>
                        {gift?.category ? (
                            <>
                                <NameGiftProps>
                                    {gift?.category?.name}
                                </NameGiftProps>
                                {gift?.status ? (
                                    <DateGiftProps>
                                        {isUsedOrNew()}
                                    </DateGiftProps>
                                ) : (
                                    ''
                                )}
                            </>
                        ) : (
                            ''
                        )}
                    </WrapperPropsGiftAndDate>
                    <WrapperNameGiftAndDate>
                        {gift?.subCategory ? (
                            <NameGift>Подкатегория:</NameGift>
                        ) : (
                            ''
                        )}
                        <DateGift>Дата добавления:</DateGift>
                    </WrapperNameGiftAndDate>
                    <WrapperPropsGiftAndDate>
                        <NameGiftProps>{gift?.subCategory?.name}</NameGiftProps>
                        <DateGiftProps>{gift?.createdAt}</DateGiftProps>
                    </WrapperPropsGiftAndDate>
                    <WrapperButtons>
                        {complaint()}
                        <div>{isBlockHandler(giftId)}</div>
                    </WrapperButtons>
                </WrapperDiv>
            </div>
        </div>
    )
}
export default ComplaintGiftInnerPage

const styleForCard = {
    display: 'flex',
    margin: '30px',
    padding: '20px',
    width: '1086px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
}
const Img = styled('img')`
    width: 343px;
    height: 343px;
    border-radius: 8px;
`
const WrapperDiv = styled('div')`
    padding-left: 20px;
    padding-top: 50px;
    width: 683px;
`
const User = styled('div')`
    align-items: center;
    display: grid;
    grid-template-columns: 48px 500px 135px;
    margin-bottom: 14px;
`
const StyledAvatar = styled(Avatar)`
    width: 36px;
    height: 36px;
`

const UserComplainedName = styled('h2')`
    margin-left: 10px;
    margin-top: -4px;
    span {
        padding: 3px;
    }
`
const UserName = styled('h2')`
    box-sizing: border-box;
    margin: 0;
    span {
        padding: 3px;
    }
`
const ToBooking = styled('p')`
    display: flex;
    justify-content: flex-end;
    color: #3774d0;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    margin-top: 1px;
    margin-left: 5px;
`
const WrapperNameGiftAndDate = styled('div')`
    display: grid;
    grid-template-columns: 211px 472px;
    margin-bottom: 6px;
`
const NameGift = styled('div')`
    color: #5c5c5c;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
`
const DateGift = styled('div')`
    color: #5c5c5c;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
`
const WrapperPropsGiftAndDate = styled('div')`
    display: grid;
    grid-template-columns: 211px 472px;
    margin-bottom: 20px;
`
const NameGiftProps = styled('div')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
`
const DateGiftProps = styled('div')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 130%;
`
const StyledH1 = styled('h1')`
    font-size: 24px;
    font-weight: 500;
`
const Styledp = styled('h1')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 50px;
    width: 683px;
`
const ComplainText = styled('p')`
    color: #fd5200;
    width: 396px;
    margin-top: -21px;
    margin-left: 11px;
`
const WrapperButtons = styled('div')`
    h2 {
        margin-top: -38px;
        margin-left: 40px;
    }
    p {
        margin-left: 40px;
    }
    & button {
        margin-left: 550px;
    }
`
const ToBookUserAvatar = styled(Avatar)`
    height: 20px;
    width: 20px;
`
const StyledToBookUserDiv = styled('div')`
    display: flex;
`
const RouteTitle = styled('p')`
    margin-left: 30px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #b4b4b4;
`
