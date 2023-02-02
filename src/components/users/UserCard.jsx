import { styled, Avatar } from '@mui/material'

import MeatBalls from '../ui/meatBall/components/meatBalls'

const UserCard = ({
    amountWishes,
    img,
    lastName,
    firstName,
    id,
    onClick,
    option,
    status,
}) => {
    return (
        <StyledContainer status={status} id={id} onClick={onClick}>
            <StyledAvatar src={img} alt="photo" />
            <StyledNameOfFriend>
                {firstName} {lastName}
            </StyledNameOfFriend>
            <StyledDiv>
                <div>
                    <StyledNumberSpan>{amountWishes}</StyledNumberSpan>
                    <StyledTitle>желаемых</StyledTitle>
                    <StyledTitle>подарков</StyledTitle>
                </div>
            </StyledDiv>
            <WrapperMeatBalls onClick={(e) => e.stopPropagation()}>
                <MeatBalls navigations={option} id={id} />
            </WrapperMeatBalls>
        </StyledContainer>
    )
}
export default UserCard

const StyledContainer = styled('div')(({ status }) => ({
    ...(status === true && {
        opacity: '0.4',
    }),
    borderRadius: '8px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '22%',
    height: '270px',
    background:
        'linear-gradient(to bottom, rgba(134, 57, 181, 0.2) 30%, white 30% 100%)',
    margin: '1% 2% 1% 0%',
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
    margin: 10px 0 10px 0;
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
    line-height: 5px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
    color: #606060;
`
const StyledDiv = styled('div')`
    display: flex;
    justify-content: space-between;
    text-align: center;
`
const WrapperMeatBalls = styled('div')`
    position: relative;
    bottom: 6%;
    left: 35%;
`
