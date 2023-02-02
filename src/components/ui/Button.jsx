import React from 'react'

import styled from '@emotion/styled'
import MuiButton from '@mui/material/Button'

const BUTTON_VARIANTS = {
    contained: {
        color: '#FFFFFF',
        backgroundColor: '#8639B5',
        height: '37px',
        width: '175px',
        '&:hover': {
            backgroundColor: '#8639B5',
        },
    },
    addButton: {
        color: '#FFFFFF',
        backgroundColor: '#8639B5',
        height: '39px',
        width: '224px',
        paddingLeft: '18.7px',
        paddingRight: '24px',
        '&:hover': {
            backgroundColor: '#8639B5',
        },
    },
    outlined: {
        color: '#8D949E',
        border: '1px solid #8D949E',
        width: '175px',
        height: '39px',
    },
    singUpButton: {
        color: '#FFFFFF',
        backgroundColor: '#8639B5',
        width: '482px',
        height: '37px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#8639B5',
        },
    },
    withGoogle: {
        color: '#23262F',
        background: '#F1F1F1',
        width: '482px',
        height: '37px',
        fontFamily: 'Inter, sans-serif',
    },
    singInButton: {
        color: '#FFFFFF',
        background: 'linear-gradient(225deg, #FA2B56 0%, #F91C3D 100%)',
        width: '291px',
        height: '39px',
    },
}

const Button = ({
    children,
    variant,
    type,
    onClick,
    startIcon,
    active,
    disabled,
    ...other
}) => {
    return (
        <StyledButton
            styles={BUTTON_VARIANTS[variant]}
            startIcon={startIcon}
            onClick={onClick}
            active={active}
            type={type}
            disabled={disabled}
            {...other}
        >
            {children}
        </StyledButton>
    )
}

Button.defaultProps = {
    variant: 'contained',
}

export default Button

const StyledButton = styled(MuiButton)`
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-family: 'Inter' sans-serif;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    border-radius: 6px;
    text-transform: none;
    &:active {
        ${(props) => props.active}
    }
    &:disabled {
        background: rgba(28, 27, 31, 0.12);
    }
    ${({ styles }) => ({ ...styles })}
`
