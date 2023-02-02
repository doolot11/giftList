import React from 'react'

import styled from '@emotion/styled'
import { Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import LogoutIcon from '../assets/icons/Logout.svg'
import Button from '../components/ui/Button'
import { logout } from '../store/slices/AuthSlice'

const LogoutModal = ({ neLogoutHandler }) => {
    const navigate = useNavigate()

    return (
        <Modal open onClose={neLogoutHandler}>
            <LogoutDiv>
                <img src={LogoutIcon} alt="" />
                <Text>Вы уверены что хотите выйти?</Text>
                <ButtonsDiv>
                    <Button onClick={neLogoutHandler} variant="outlined">
                        Отмена
                    </Button>

                    <Button
                        onClick={() => logout(navigate)}
                        variant="singInButton"
                    >
                        Выйти
                    </Button>
                </ButtonsDiv>
            </LogoutDiv>
        </Modal>
    )
}

export default LogoutModal
const LogoutDiv = styled('div')`
    width: 544px;
    height: 245px;
    background: #fcfcfd;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px 32px;
    gap: 12px;
    margin: 0 auto;
    align-items: center;
    margin-top: 200px;
`
const Text = styled('p')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;

    color: #23262f;
`
const ButtonsDiv = styled('div')`
    button {
        margin: 5px;
        width: 232px;
        height: 37px;
    }

    display: flex;
`
