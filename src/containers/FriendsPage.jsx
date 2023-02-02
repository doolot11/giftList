import { useEffect } from 'react'

import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import FriendTabs from '../components/users/FriendTabs'
import {
    getFriendsAction,
    requestsToFriendAction,
} from '../store/slices/friendTabAction'

export const FriendsPage = () => {
    const dispatch = useDispatch()

    const friends = useSelector((state) => state.friends.friends)
    const requestToFriend = useSelector(
        (state) => state.requestToFriend.requestToFriend
    )

    useEffect(() => {
        dispatch(getFriendsAction()).unwrap()
    }, [])

    useEffect(() => {
        dispatch(requestsToFriendAction()).unwrap()
    }, [])

    return (
        <MainDiv>
            <StyledMainTitle>Друзья</StyledMainTitle>
            <StyledDivTab>
                {friends && (
                    <FriendTabs
                        friends={friends}
                        requestToFriend={requestToFriend}
                    />
                )}
            </StyledDivTab>
            {friends?.length <= 0 && requestToFriend?.length <= 0 && (
                <NotFoundH4>У вас еще нет друзей</NotFoundH4>
            )}
        </MainDiv>
    )
}

const MainDiv = styled('div')`
    height: 1224px;
    margin-top: 118px;
    margin-left: 20px;
    background-color: #f4f6f6;
`

const StyledMainTitle = styled('span')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
    color: #020202;
    margin-bottom: 33px;
`
const StyledDivTab = styled('div')`
    margin-left: 10px;
`
const NotFoundH4 = styled('h4')`
    display: flex;
    justify-content: center;
`
