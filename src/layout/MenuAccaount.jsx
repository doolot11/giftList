import React, { useState } from 'react'

import styled from '@emotion/styled'
import Menu from '@mui/material/Menu'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as Exit } from '../assets/icons/ExitIcon.svg'
import { ReactComponent as Profile } from '../assets/icons/Profile.svg'
import { ReactComponent as ProfileIcon } from '../assets/icons/ProfileIcon.svg'
import { ReactComponent as Vector } from '../assets/icons/Vector.svg'
import { profileGet } from '../store/slices/ProfileActions'

import LogoutModal from './LogoutModal'

const MenuAccaunt = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [logoutState, setLogoutState] = useState(false)
    const logoutHandler = () => {
        setLogoutState(true)
    }
    const neLogoutHandler = () => {
        setLogoutState(false)
    }

    const { role, firstName, photo, lastName } = useSelector(
        (state) => state.authSlice.user
    )

    const profileNavigate = () => {
        navigate('/myprofile')
        dispatch(profileGet())
    }

    return (
        <AccauntProfile>
            {logoutState && <LogoutModal neLogoutHandler={neLogoutHandler} />}
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <>
                        <MenuMui
                            variant="contained"
                            {...bindTrigger(popupState)}
                        >
                            <span>
                                {photo ? (
                                    <MenuImg src={photo} alt="" />
                                ) : (
                                    <Profile />
                                )}
                            </span>
                            <p>
                                {firstName} {lastName}
                            </p>
                            <p>
                                <Vector />
                            </p>
                        </MenuMui>
                        <Menu {...bindMenu(popupState)}>
                            {role !== 'ADMIN' && (
                                <MenuItem onClick={popupState.close}>
                                    <p>
                                        <ProfileIcon />
                                    </p>
                                    <p onClick={profileNavigate}>Профиль</p>
                                </MenuItem>
                            )}
                            <MenuItem onClick={popupState.close}>
                                <p>
                                    <Exit />
                                </p>

                                <p onClick={logoutHandler}>Выйти</p>
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </PopupState>
        </AccauntProfile>
    )
}

export default MenuAccaunt

const AccauntProfile = styled('div')`
    display: flex;
    cursor: pointer;
`
const MenuMui = styled('div')`
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 24px;
    cursor: pointer;
    p {
        margin-left: 6px;
    }
`
const MenuItem = styled('div')`
    display: flex;
    width: 120px;
    height: 44px;
    font-family: 'Inter', sans-serif;
    align-items: center;
    cursor: pointer;
    p {
        margin-left: 10px;
        font-family: 'Inter', sans-serif;
    }
`
const MenuImg = styled('img')`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`
