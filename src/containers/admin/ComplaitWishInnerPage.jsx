import { useEffect } from 'react'

import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BreadCrumbs from '../../components/ui/breadCrumbs/BreadCrumbs'
import Button from '../../components/ui/Button'
import {
    getWishAction,
    toBlockWishAction,
    unBlockWishAction,
} from '../../store/slices/admin/complaintsAction'

const ComplaintWishInnerPage = () => {
    const { wishId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWishAction(wishId))
    }, [wishId])

    const complaintWish = useSelector(
        (state) => state.complaintWish.complaintWish
    )
    const { wish } = complaintWish
    const { ownerUser } = complaintWish
    const { bookedUser } = complaintWish

    const avatarBookedUser = () => {
        if (bookedUser) {
            return bookedUser.photo
        }

        return null
    }

    const titleIsBooked = () => {
        if (bookedUser) {
            return 'Забронирован'
        }

        return 'В ожидании'
    }

    function complaint() {
        if (wish?.complaints) {
            return wish?.complaints.map((el) => {
                return (
                    <div key={el?.complaintId}>
                        <StyledAvatar
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

    const toBlockWishHandler = (id) => {
        dispatch(toBlockWishAction(id))
    }
    const unBlockWishHandler = (id) => {
        dispatch(unBlockWishAction(id))
    }

    const isBlockHandler = (wishId) => {
        if (wish?.isBlock === false) {
            return (
                <Button onClick={() => toBlockWishHandler(wishId)}>
                    Блокировать
                </Button>
            )
        }
        if (wish?.isBlock === true) {
            return (
                <Button onClick={() => unBlockWishHandler(wishId)}>
                    Разблокировать
                </Button>
            )
        }
        return null
    }
    const pathTranslate = {
        complaints: 'Жалобы',
        wish: 'Желания',
        [wishId]: wish?.wishName,
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <RouteTitle>
                <BreadCrumbs translate={pathTranslate} />
            </RouteTitle>
            <div style={styleForCard}>
                <Img src={wish?.photo} alt={wish?.wishName} />
                <WrapperDiv>
                    <User>
                        <StyledAvatar
                            src={ownerUser?.photo}
                            alt={ownerUser?.firstName}
                        />
                        <UserName>
                            <span> {ownerUser?.firstName}</span>
                            <span>{ownerUser?.lastName}</span>
                        </UserName>
                        <StyledToBookUserDiv>
                            <ToBookUserAvatar
                                src={avatarBookedUser()}
                                alt="avatar"
                            />
                            <ToBooking>{titleIsBooked()}</ToBooking>
                        </StyledToBookUserDiv>
                    </User>
                    <StyledH1>{wish?.wishName}</StyledH1>
                    <Styledp>{wish?.description}</Styledp>
                    <WrapperNameGiftAndDate>
                        <DateGift>Дата добавления:</DateGift>
                    </WrapperNameGiftAndDate>
                    <WrapperPropsGiftAndDate>
                        <DateGiftProps>{wish?.wishDate}</DateGiftProps>
                    </WrapperPropsGiftAndDate>
                    <WrapperButtons>
                        {complaint()}
                        <div>{isBlockHandler(wishId)}</div>
                    </WrapperButtons>
                </WrapperDiv>
            </div>
        </div>
    )
}
export default ComplaintWishInnerPage

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
    width: 40px;
    height: 40px;
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
