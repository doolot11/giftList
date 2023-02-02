import React, { useState, useEffect } from 'react'

import styled from '@emotion/styled'
import { InputLabel } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'

import facebook from '../../assets/icons/FacebookUser.svg'
import instagram from '../../assets/icons/grayInstagram.svg'
import telegram from '../../assets/icons/grayTelegram.svg'
import vkontakte from '../../assets/icons/VKUser.svg'
import BreadCrumbs from '../../components/ui/breadCrumbs/BreadCrumbs'
import Button from '../../components/ui/Button'
import ViewsDatePicker from '../../components/ui/datePicker/ViewsDatePicker'
import ImagePicker from '../../components/ui/ImagePicker'
import Input from '../../components/ui/Input'
import SizePopup from '../../components/ui/SizePopup'
import Textarea from '../../components/ui/Textarea'
import { profileActions, profileGet } from '../../store/slices/ProfileActions'
import { optionsSize, options } from '../../utils/constants/constants'

const Profile = () => {
    const dispatch = useDispatch()
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const { email, firstName, lastName, userInfo } = useSelector(
        (state) => state.authSlice.user
    )
    const [basicInformation, setBasicInformation] = useState({
        firstName,
        lastName,
        city: userInfo?.city,
        email,
        phoneNumber: userInfo?.phoneNumber,
        clothingSize: userInfo?.clothingSize,
        shoeSize: userInfo?.shoeSize,
        hobby: userInfo?.hobby,
        importantNote: userInfo?.importantNote,
        facebookLink: userInfo?.facebookLink,
        telegramLink: userInfo?.telegramLink,
        vkLink: userInfo?.vkLink,
        instagramLink: userInfo?.instagramLink,
        photo: null,
    })
    const navigate = useNavigate()
    const popupValueHandler = (data) => {
        if (data > 0) {
            setBasicInformation({ ...basicInformation, clothingSize: data })
        }
    }
    const popupChangeHandler = (data) => {
        setBasicInformation({ ...basicInformation, shoeSize: data })
    }
    const onChangePhoto = (photo) => {
        setBasicInformation({ ...basicInformation, photo })
    }

    const allValueHandler = (e) => {
        setBasicInformation({
            ...basicInformation,
            [e.target.name]: e.target.value,
        })
    }
    const dateChangeHandler = (date) => {
        setDateOfBirth(date)
    }
    useEffect(() => {
        dispatch(profileGet())
            .unwrap()
            .then((res) => {
                console.log(res)
            })
    }, [])
    const img = basicInformation.photo?.name ? null : basicInformation?.photo
    const navigateOtmen = () => {
        navigate('/myprofile')
    }
    const submitHandler = async (e) => {
        e.preventDefault()

        const result = await dispatch(
            profileActions({
                basicInformation,
                dateOfBirth,
            })
        )
        if (result) {
            navigate('/myprofile')
        }
    }
    const pathTranslate = {
        myprofile: 'Профиль',
        profile: 'Рассказать о себе',
    }
    return (
        <div>
            <BreadCrumbsDiv>
                <BreadCrumbs translate={pathTranslate} />
            </BreadCrumbsDiv>
            <ProfileContainer onSubmit={submitHandler}>
                <div>
                    <ImagePicker
                        newFile={img}
                        onChange={onChangePhoto}
                        id="profile"
                    />
                </div>
                <ProfileDiv>
                    <SizeText>Основная информация</SizeText>
                    <InputsDiv>
                        <InputLabel>
                            Имя
                            <Input
                                defaultValue={firstName}
                                name="firstName"
                                onChange={allValueHandler}
                                type="text"
                                width="396px"
                                height="35px"
                                placeholder="Имя"
                            />
                        </InputLabel>
                        <InputLabel>
                            Фамилия
                            <Input
                                defaultValue={lastName}
                                name="lastName"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                type="text"
                                placeholder="Фамилия"
                            />
                        </InputLabel>
                    </InputsDiv>
                    <InputsDiv>
                        <InputLabel>
                            Город
                            <Input
                                name="city"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                type="text"
                                placeholder="Город"
                                defaultValue={userInfo?.city}
                            />
                        </InputLabel>
                        <InputLabel>
                            Дата рождения
                            <ViewsDatePicker
                                placeholder="Укажите дату рождения"
                                value={dateOfBirth}
                                onChange={dateChangeHandler}
                            />
                        </InputLabel>
                    </InputsDiv>
                    <InputsDiv>
                        <InputLabel>
                            Email
                            <Input
                                value={email}
                                name="email"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                placeholder={email}
                                type="email"
                                disabled
                            />
                        </InputLabel>
                        <InputLabel>
                            Номер телефона
                            <Input
                                name="phoneNumber"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                type="number"
                                placeholder="Введите номер телефона"
                                defaultValue={userInfo?.phoneNumber}
                            />
                        </InputLabel>
                    </InputsDiv>
                    <div>
                        <SizeText>Размеры</SizeText>
                        <SelectDiv>
                            <WrapperSelect>
                                <p>Размер одежды</p>
                                <SizePopup
                                    valueHandler={popupValueHandler}
                                    options={optionsSize}
                                    placeholder={
                                        userInfo?.clothingSize ||
                                        'Выберите размер одежды'
                                    }
                                />
                            </WrapperSelect>

                            <WrapperSelect2>
                                <p>Размер обуви</p>
                                <SizePopup
                                    valueHandler={popupChangeHandler}
                                    options={options}
                                    placeholder={
                                        userInfo?.shoeSize ||
                                        'Выберите размер обуви'
                                    }
                                />
                            </WrapperSelect2>
                        </SelectDiv>
                    </div>
                    <div>
                        <SizeText>Интересы, хобби</SizeText>
                        <DivTextArea>
                            <InputLabel style={style}>
                                Расскажите о своих интересах и хобби
                            </InputLabel>

                            <Textarea
                                defaultValue={userInfo?.hobby}
                                name="hobby"
                                onChange={allValueHandler}
                                placeholder="Пример: плавание, бег, танцы, чтение художественной литературы..."
                            />
                        </DivTextArea>
                    </div>
                    <div>
                        <SizeText>Важно знать</SizeText>
                        <DivTextArea>
                            <InputLabel style={style}>
                                О чем важно знать?
                            </InputLabel>

                            <Textarea
                                defaultValue={userInfo?.importantNote}
                                name="importantNote"
                                onChange={allValueHandler}
                                placeholder="Пример: аллергия на синтетические материалы, непереносимость лактозы..."
                            />
                        </DivTextArea>
                    </div>

                    <SizeText>Социальные сети</SizeText>
                    <DivSocial>
                        <div>
                            <IconText>Фейсбук</IconText>
                            <SocialDiv>
                                <img src={facebook} alt="" />
                                <Input
                                    defaultValue={userInfo?.facebookLink}
                                    name="facebookLink"
                                    onChange={allValueHandler}
                                    width="357px"
                                    height="35px"
                                    placeholder="Вставьте ссылку на фейсбук"
                                />
                            </SocialDiv>
                        </div>
                        <div>
                            <IconText>В контакте </IconText>
                            <SocialDiv>
                                <img src={vkontakte} alt="" />
                                <Input
                                    name="vkLink"
                                    defaultValue={userInfo?.vkLink}
                                    onChange={allValueHandler}
                                    width="357px"
                                    height="35px"
                                    placeholder="Вставьте ссылку на В контакте "
                                />
                            </SocialDiv>
                        </div>
                    </DivSocial>
                    <DivSocial>
                        <div>
                            <IconText>Инстаграм</IconText>
                            <SocialDiv>
                                <img src={instagram} alt="" />
                                <Input
                                    name="instagramLink"
                                    onChange={allValueHandler}
                                    defaultValue={userInfo?.instagramLink}
                                    width="357px"
                                    height="35px"
                                    placeholder="Вставьте ссылку на инстаграм"
                                />
                            </SocialDiv>
                        </div>
                        <div>
                            <IconText>Телеграм </IconText>
                            <SocialDiv>
                                <img src={telegram} alt="" />
                                <Input
                                    name="telegramLink"
                                    onChange={allValueHandler}
                                    width="357px"
                                    defaultValue={userInfo?.telegramLink}
                                    height="35px"
                                    placeholder="Вставьте ссылку на телеграм "
                                />
                            </SocialDiv>
                        </div>
                    </DivSocial>
                    <Buttons>
                        <Button onClick={navigateOtmen} variant="outlined">
                            отмена
                        </Button>
                        <Button type="submit" variant="contained">
                            Сохранить
                        </Button>
                    </Buttons>
                </ProfileDiv>
            </ProfileContainer>
        </div>
    )
}

export default Profile

const style = {
    fontSize: '12px',
}
const BreadCrumbsDiv = styled('div')`
    margin-top: 100px;
    margin-left: 20px;
`
const ProfileContainer = styled('form')`
    width: 1086px;
    height: 1262px;
    background: #ffffff;
    border-radius: 10px;
    margin-left: 20px;
    padding: 12px;
    display: flex;
    margin-top: 20px;
`
const ProfileDiv = styled('div')`
    margin-top: -11px;
    padding-left: 10px;
    h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
    }
`
const InputsDiv = styled('div')`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    label {
        font-size: 12px;
        :last-child {
            margin-left: 10px;
        }
    }
`
const SizeText = styled('h1')`
    margin-top: 24px;
    margin-left: 8px;
`
const SocialDiv = styled('div')`
    display: flex;
    margin-left: 15px;

    img {
        padding-right: 7px;
        padding-left: 5px;
    }
`
const IconText = styled('p')`
    font-size: 12px;
    margin-left: 58px;
    margin-top: 2px;
`

const DivSocial = styled('div')`
    display: flex;
    margin-top: 14px;
`
const Buttons = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
    button {
        margin: 8px;
    }
`
const DivTextArea = styled('div')`
    margin-left: 8px;
`
const SelectDiv = styled('div')`
    display: flex;
`
const WrapperSelect = styled('div')`
    width: 390px;
    p {
        margin-left: 10px;
    }
`
const WrapperSelect2 = styled('div')`
    width: 390px;
    margin-left: 30px;
    p {
        margin-left: 10px;
    }
`
