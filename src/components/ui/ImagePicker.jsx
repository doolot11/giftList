import React, { useRef, useState, useEffect } from 'react'

import styled, { css } from 'styled-components'

import File from '../../assets/icons/ImageFile.svg'

const ImagePicker = ({ onChange, newFile, id, ...otherProps }) => {
    const refs = useRef()
    const [icons, setIcons] = useState()
    useEffect(() => {
        if (newFile) {
            setIcons(newFile)
        }
    }, [newFile])
    const deleteImageHandler = (e) => {
        e.stopPropagation()
        e.preventDefault()
        refs.current.value = ''
        setIcons('')
    }
    const imageHandler = () => {
        const image = URL.createObjectURL(refs.current.files[0])
        if (refs.current.files[0].size < 1000000) {
            setIcons(image)
            onChange(refs.current.files[0])
        }
    }
    return (
        <ImagePickerContainer icons={icons}>
            <Label icons={icons} htmlFor={id} />
            <Input
                id={id}
                {...otherProps}
                ref={refs}
                onChange={imageHandler}
                type="file"
                value=""
                accept="image/jpeg,image/png,image/gif"
            />
            <DeleteButton onClick={deleteImageHandler}>Удалить</DeleteButton>
        </ImagePickerContainer>
    )
}
export default ImagePicker
const DeleteButton = styled.button`
    border: none;
    position: absolute;
    top: 87%;
    left: 60%;
    background-color: rgba(0, 0, 0, 0);
    bottom: 30px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: black;
    z-index: 10;
    display: none;
    cursor: pointer;
    display: none;
    &:hover {
        text-decoration: underline;
        opacity: 3;
        border-radius: 2px;
        font-family: 'Inter', sans-serif;
        align-items: center;
        margin-right: 3px;
        text-decoration: none;
    }
`
const ImagePickerContainer = styled.div`
    background-repeat: no-repeat;
    background-position: 50% 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 217px;
    height: 217px;
    background: #f6f6f9;
    border: 1px solid #dcdce4;
    border-radius: 8px;
    ${(props) =>
        props.icons &&
        css`
            background-image: url(${props.icons});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            &: after {
                display: none;
            }
            &:hover {
                align-items: flex-start;
            }
            &:hover > label {
                display: block;
            }
            &:hover > button {
                display: block;
            }
        `}
`
const Input = styled.input`
    display: none;
`
const Label = styled.label`
    background-image: url(${File});
    margin-left: 87px;
    display: block;
    margin-top: -40px;
    width: 200px;
    height: 30px;
    text-align: center;
    color: #8e8ea9;
    cursor: pointer;
    background-repeat: no-repeat;
    &::after {
        content: 'Нажмите для добавления фотографии';
        position: absolute;
        top: 50%;
        right: 4%;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 16px;
    }
    ${(props) =>
        props.icons &&
        css`
            background-image: none;
            display: none;
            &::after {
                content: 'Заменить';
                position: absolute;
                left: 50px;
                top: 88%;
                align-items: center;
                font-family: 'Inter', sans-serif;
                font-weight: 400;
                font-size: 18px;
                color: #000000;
                transform: translateX(-50%);
            }
            &:hover:after {
                text-decoration: underline;
                text-decoration: none;
                display: block;
                align-items: center;
                text-align: center;
                border-radius: 2px;
            }
        `}
`
