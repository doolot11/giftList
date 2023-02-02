import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
    deletecharity,
    toBookCharity,
    toCancelCharity,
} from '../../../store/slices/GiftActions'
import BreadCrumbs from '../breadCrumbs/BreadCrumbs'
import Button from '../Button'

const InnerPage = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = useSelector((state) => state.authSlice?.user.id)
    const link = () => {
        navigate(`/${props.data.gift.giftId}/edit_charity`)
    }
    const reserve = () => {
        dispatch(toBookCharity(props.data?.gift.giftId))
    }
    const deleteCharity = () => {
        dispatch(deletecharity(props.data?.gift.giftId))
        navigate('/charity')
    }
    const cancelBook = () => {
        dispatch(toCancelCharity(props.data?.gift.giftId))
    }
    const isBlocked = props.data?.gift?.isBlock
        ? 'Разблокировать'
        : 'Блокировать'
    const blockOrUnBlock = props.data?.gift?.isBlock
        ? () => props.onClickUnBlock(props.data?.gift?.giftId)
        : () => props.onClickBlock(props.data?.gift?.giftId)
    const styleForCard = {
        display: 'flex',
        marginLeft: '0px',
        maxWidth: 'auto',
        maxHeight: '871px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
    }
    const pathTranslate1 = {
        charity: 'Благотворительность',
        my: 'Мои подарки',
        [props?.data?.gift?.giftId]: props?.data.gift?.name,
    }
    const pathTranslate2 = {
        charityAdmin: 'Благотворительность',
        [props?.data?.gift?.giftId]: props?.data.gift?.name,
    }
    const adminOrUsers = props.admin ? pathTranslate2 : pathTranslate1
    return (
        <div>
            <BreadCrumbsDiv>
                <BreadCrumbs translate={adminOrUsers} />
            </BreadCrumbsDiv>
            <div style={styleForCard}>
                <Img src={props.data.gift?.photo} alt="image" />
                <WrapperDiv>
                    <User>
                        <StyledAvatar
                            src={props.data.ownerUser?.photo}
                            alt="avatar"
                        />
                        <UserName>
                            {props.data.ownerUser?.firstName}{' '}
                            {props.data.ownerUser?.lastName}
                        </UserName>

                        <ToBooking>
                            {' '}
                            {props.data.gift?.booking === null
                                ? 'в ожидании'
                                : 'забронирован'}
                        </ToBooking>
                    </User>
                    <StyledH1>{props.data.gift?.name}</StyledH1>
                    <Styledp>{props.data.gift?.description}</Styledp>
                    <WrapperNameGiftAndDate>
                        <NameGift>Категория:</NameGift>
                        <DateGift>Состояние:</DateGift>
                    </WrapperNameGiftAndDate>
                    <WrapperPropsGiftAndDate>
                        <NameGiftProps>
                            {props.data.gift?.category?.name}
                        </NameGiftProps>
                        <DateGiftProps>
                            {props.data.gift?.status === 'USED'
                                ? 'Б/У'
                                : 'Новый'}
                        </DateGiftProps>
                    </WrapperPropsGiftAndDate>
                    <WrapperNameGiftAndDate>
                        <NameGift>Подкатегория:</NameGift>
                        <DateGift>Дата добавления:</DateGift>
                    </WrapperNameGiftAndDate>
                    <WrapperPropsGiftAndDate>
                        <NameGiftProps>
                            {props.data.gift?.subCategory?.name}
                        </NameGiftProps>
                        <DateGiftProps>
                            {props.data?.gift?.createdAt}
                        </DateGiftProps>
                    </WrapperPropsGiftAndDate>
                    {/* --------------------------------------------- */}
                    <WrapperButtons>
                        {props.my && (
                            <ButtonsDiv>
                                <ButtonBorderNone
                                    onClick={deleteCharity}
                                    variant="outlined"
                                >
                                    Удалить
                                </ButtonBorderNone>
                                <Button onClick={link}>Редактировать</Button>
                            </ButtonsDiv>
                        )}
                        {props.notMy && (
                            <But>
                                {props.data?.gift?.booking === null && (
                                    <Button onClick={reserve}>
                                        Забронировать
                                    </Button>
                                )}
                                {props.data?.bookedUser?.userId === id && (
                                    <Button onClick={cancelBook}>
                                        Отменить бронь
                                    </Button>
                                )}
                                {props.data?.gift?.booking !== null && ''}
                            </But>
                        )}
                        {props.admin && (
                            <Button onClick={blockOrUnBlock}>
                                {isBlocked}
                            </Button>
                        )}
                    </WrapperButtons>
                </WrapperDiv>
            </div>
        </div>
    )
}
export default InnerPage

const BreadCrumbsDiv = styled.div`
    margin-top: 60px;
    margin-bottom: 30px;
    margin-left: 20px;
`
const But = styled.div`
    & button {
        width: auto;
    }
`

const Img = styled('img')`
    width: 343px;
    height: 343px;
    border-radius: 8px;
`
const WrapperDiv = styled('div')`
    padding-left: 20px;
`
const User = styled('div')`
    align-items: center;
    display: grid;
    grid-template-columns: 48px 450px 140px;
    margin-bottom: 14px;
    width: 93%;
`
const StyledAvatar = styled(Avatar)`
    width: 36px;
    height: 36px;
`
const UserName = styled('h2')`
    box-sizing: border-box;
    margin: 0;
`
const ToBooking = styled('p')`
    display: flex;
    justify-content: flex-end;
    color: #3774d0;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
`
const WrapperNameGiftAndDate = styled('div')`
    display: grid;
    grid-template-columns: 211px 472px;
    margin-bottom: 6px;
    width: 95%;
`
const NameGift = styled('div')`
    color: #5c5c5c;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    width: 95%;
`
const DateGift = styled('div')`
    color: #5c5c5c;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    width: 95%;
`
const WrapperPropsGiftAndDate = styled('div')`
    display: grid;
    grid-template-columns: 211px 472px;
    margin-bottom: 20px;
    width: 95%;
`
const NameGiftProps = styled('div')`
    color: #0ba360;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 130%;
    width: 95%;
`
const DateGiftProps = styled('div')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 130%;
`
const StyledH1 = styled('h1')`
    width: 0;
    color: #3774d0;
    font-size: 24px;
    font-weight: 500;
    width: 95%;
`
const Styledp = styled('h1')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 50px;
    width: 90%;
`
const WrapperButtons = styled('div')`
    display: flex;
    padding-top: 40px;
    padding-right: 0px;
    margin-right: 40px;
    justify-content: flex-end;
    align-items: center;
`
const ButtonsDiv = styled.div`
    /* padding-right: 20px; */
    display: flex;
    /* justify-content: space-between; */
    /* width: 380px; */
`
const ButtonBorderNone = styled(Button)`
    border: none;
`
