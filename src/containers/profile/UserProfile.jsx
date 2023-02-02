import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as FacebookProf } from '../../assets/icons/facebookProf.svg'
import { ReactComponent as Facebook } from '../../assets/icons/FacebookUser.svg'
import { ReactComponent as Instagram } from '../../assets/icons/grayInstagram.svg'
import { ReactComponent as GrayTelegram } from '../../assets/icons/grayTelegram.svg'
import { ReactComponent as InstagtamProf } from '../../assets/icons/instagramProf.svg'
import ProfileIcon from '../../assets/icons/Profile.svg'
import { ReactComponent as TelegramProf } from '../../assets/icons/telegramProf.svg'
import { ReactComponent as VkProf } from '../../assets/icons/vkProf.svg'
import { ReactComponent as Vk } from '../../assets/icons/VKUser.svg'
import Button from '../../components/ui/Button'
import ChangePassword from '../../components/ui/ChangePassword'
import { profileGet } from '../../store/slices/ProfileActions'

const EditProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [changePassword, setChangePassword] = useState(false)

    const { email, photo, firstName, lastName, userInfo } = useSelector(
        (state) => {
            return state.authSlice.user
        }
    )
    const changePasswordHandler = () => {
        setChangePassword(true)
    }
    const navigateState = () => {
        navigate('/myprofile/edit_profile')
    }
    const myProfile = () => {
        navigate('/myprofile/profile')
    }
    useEffect(() => {
        const fetch = async () => {
            await dispatch(profileGet())
        }
        fetch()
    }, [])
    return (
        <EditContainer>
            <h4>Профиль</h4>
            {changePassword && (
                <ChangePassword setChangePassword={setChangePassword} />
            )}

            <EditWrapper>
                <ImageButtonsDiv>
                    <Img src={photo || ProfileIcon} alt="" />
                    <FirstNameLastName>
                        {firstName} {lastName}
                    </FirstNameLastName>
                    {userInfo ? (
                        <Button onClick={navigateState} variant="contained">
                            Редактировать
                        </Button>
                    ) : (
                        <Button onClick={myProfile} variant="contained">
                            Расскажите о себе
                        </Button>
                    )}

                    <Button variant="outlined" onClick={changePasswordHandler}>
                        Сменить пароль
                    </Button>
                    <LinkA href={userInfo?.facebookLink || ''}>
                        {userInfo?.facebookLink ? (
                            <FacebookProf />
                        ) : (
                            <Facebook />
                        )}
                    </LinkA>
                    <LinkA href={userInfo?.instagramLink || ''}>
                        {userInfo?.instagramLink ? (
                            <InstagtamProf />
                        ) : (
                            <Instagram />
                        )}
                    </LinkA>
                    <LinkA href={userInfo?.telegramLink || ''}>
                        {userInfo?.telegramLink ? (
                            <TelegramProf />
                        ) : (
                            <GrayTelegram />
                        )}
                    </LinkA>
                    <LinkA href={userInfo?.vkLink || ''}>
                        {userInfo?.vkLink ? <VkProf /> : <Vk />}
                    </LinkA>
                </ImageButtonsDiv>

                <InformationDiv>
                    {userInfo?.city ||
                    userInfo?.dateOfBirth ||
                    email ||
                    userInfo?.phoneNumber ? (
                        <>
                            <Text>Основная информация</Text>
                            <UniverDiv>
                                {userInfo?.city && (
                                    <div>
                                        <KeyText>Город:</KeyText>
                                        <ContentText>
                                            {userInfo?.city}
                                        </ContentText>
                                    </div>
                                )}
                                {userInfo?.dateOfBirth && (
                                    <div>
                                        <KeyText>Дата рождения:</KeyText>
                                        <ContentText>
                                            {userInfo?.dateOfBirth}
                                        </ContentText>
                                    </div>
                                )}
                            </UniverDiv>
                            <UniverDiv>
                                {email && (
                                    <div>
                                        <KeyText>Email:</KeyText>
                                        <ContentText>{email}</ContentText>
                                    </div>
                                )}
                                {userInfo?.phoneNumber && (
                                    <div>
                                        <KeyText>Номер телефона:</KeyText>
                                        <ContentText>
                                            {userInfo?.phoneNumber}
                                        </ContentText>
                                    </div>
                                )}
                            </UniverDiv>
                        </>
                    ) : (
                        ''
                    )}
                    {userInfo?.hobby || userInfo?.importantNote ? (
                        <>
                            <Text>Интересы, хобби</Text>
                            <UniverDiv>
                                {userInfo?.hobby && (
                                    <div>
                                        <KeyText>Интересы, хобби:</KeyText>
                                        <ContentText>
                                            {userInfo?.hobby}
                                        </ContentText>
                                    </div>
                                )}
                                {userInfo?.importantNote && (
                                    <div>
                                        <KeyText>Важно знать:</KeyText>
                                        <ContentText>
                                            {userInfo?.importantNote}
                                        </ContentText>
                                    </div>
                                )}
                            </UniverDiv>
                        </>
                    ) : (
                        ''
                    )}
                    {userInfo?.clothingSize || userInfo?.shoeSize ? (
                        <>
                            <Text>Доп. инфа</Text>
                            <UniverDiv>
                                {userInfo?.clothingSize && (
                                    <div>
                                        <KeyText>Размер одежды:</KeyText>
                                        <ContentText>
                                            {userInfo?.clothingSize}
                                        </ContentText>
                                    </div>
                                )}
                                {userInfo?.shoeSize && (
                                    <div>
                                        <KeyText>Размер обуви:</KeyText>
                                        <ContentText>
                                            {userInfo?.shoeSize}
                                        </ContentText>
                                    </div>
                                )}
                            </UniverDiv>
                        </>
                    ) : (
                        ''
                    )}
                </InformationDiv>
            </EditWrapper>
        </EditContainer>
    )
}

export default EditProfile
const EditContainer = styled('div')`
    width: 1086px;
    height: 938px;
    margin-left: 20px;
    margin-top: 100px;
`

const EditWrapper = styled('div')`
    width: 1086px;
    height: 855px;
    padding: 13px;
    background: #ffffff;
    border-radius: 10px;
    display: flex;
`
const FirstNameLastName = styled('h4')`
    text-align: center;
`
const ImageButtonsDiv = styled('div')`
    button {
        width: 206px;
        height: 37px;
        margin: 6px;
        margin-top: 10px;
    }
`

const InformationDiv = styled('div')`
    width: 730px;
    margin-left: 34px;
    margin-top: 30px;
`
const UniverDiv = styled('div')`
    display: flex;
`

const KeyText = styled('h5')`
    font-family: 'Inter';
    color: #5c5c5c;
    margin-top: 0;
`
const Text = styled('h3')`
    font-family: 'Inter';
    font-style: normal;
    font-size: 18px;
    line-height: 22px;

    display: flex;
    align-items: center;
    letter-spacing: 0.2px;

    color: #8639b5;
`

const Img = styled('img')`
    width: 187px;
    height: 190px;
    border-radius: 5px;
    margin-left: 17px;
`
const LinkA = styled('a')`
    margin-left: 15px;
`
const ContentText = styled('p')`
    width: 470px;
    font-family: 'Inter';
    font-style: normal;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-top: -12px;
    color: #000000;
`
