import { styled, Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'

import {
    rejectRequestToFriendAction,
    acceptRequestToFriend,
} from '../../store/slices/friendTabAction'
import Button from '../ui/Button'

const REQUESTTOFRIENDS = 'REQUESTTOFRIENDS'

const FriendsCard = ({
    wishCount,
    photo,
    name,
    holidayCount,
    id,
    onClick,
    variant,
}) => {
    const dispatch = useDispatch()
    const acceptRequestHandler = (event) => {
        event.stopPropagation()
        dispatch(acceptRequestToFriend({ dispatch, id }))
    }
    const rejectRequestHandler = (event) => {
        dispatch(rejectRequestToFriendAction({ id, dispatch }))
        event.stopPropagation()
    }
    return (
        <StyledContainer id={id} variant={variant} onClick={onClick}>
            <StyledAvatar src={photo} alt={name} />
            <StyledNameOfFriend>{name}</StyledNameOfFriend>
            <StyledDiv>
                <div>
                    <StyledNumberSpan>{wishCount}</StyledNumberSpan>
                    <StyledTitle>Желаний</StyledTitle>
                </div>
                <div>
                    <StyledNumberSpan>{holidayCount}</StyledNumberSpan>
                    <StyledTitle>Праздников</StyledTitle>
                </div>
            </StyledDiv>
            {variant === REQUESTTOFRIENDS && (
                <StyledDiv1>
                    <Button onClick={acceptRequestHandler}>
                        Принять заявку
                    </Button>
                    <Button variant="outlined" onClick={rejectRequestHandler}>
                        Отклонить
                    </Button>
                </StyledDiv1>
            )}
        </StyledContainer>
    )
}
export default FriendsCard

const StyledDiv1 = styled('div')`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 1px;
    grid-row-gap: 12px;
    button {
        width: 225px;
        height: 35px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }
`

const StyledContainer = styled('div')(({ variant }) => ({
    borderRadius: '8px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '260px',
    height: '256px',
    cursor: 'pointer',
    background:
        'linear-gradient(to bottom, rgba(134, 57, 181, 0.2) 30%, white 30% 100%)',
    ...(variant === 'requestToFriends' && {
        width: '260px',
        height: '357px',
        display: 'flex',
        flexDirection: 'column',
        background:
            'linear-gradient(to bottom, rgba(134, 57, 181, 0.2) 21.5%, white 21.5% 100%)',
    }),
}))
const StyledAvatar = styled(Avatar)`
    width: 130px;
    height: 130px;
    margin-top: 16px;
`
const StyledNameOfFriend = styled('p')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: #020202;
    margin-top: 18px;
`
const StyledNumberSpan = styled('span')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.02em;
    color: #020202;
`
const StyledTitle = styled('p')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
    color: #606060;
`
const StyledDiv = styled('div')`
    width: 150px;
    display: flex;
    justify-content: space-between;
    text-align: center;
`
