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
import TextArea from '../../components/ui/Textarea'
import { editProfile, profileGet } from '../../store/slices/ProfileActions'
import { optionsSize, options } from '../../utils/constants/constants'

const UserProfile = () => {
    const dispatch = useDispatch()
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const { userInfo } = useSelector((state) => state.authSlice.user)

    const [basicInformation, setBasicInformation] = useState({
        firstName: '',
        lastName: '',
        city: '',
        email: '',
        phoneNumber: '',
        clothingSize: '',
        shoeSize: '',
        hobby: '',
        importantNote: '',
        facebookLink: '',
        telegramLink: '',
        vkLink: '',
        instagramLink: '',
        photo: null,
    })
    const navigate = useNavigate()
    const popupValueHandler = (data) => {
        setBasicInformation({ ...basicInformation, clothingSize: data })
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
        setDateOfBirth(date.toLocaleDateString())
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(profileGet()).unwrap()
            setBasicInformation({
                firstName: response?.firstName,
                lastName: response?.lastName,
                city: response?.userInfo.city,
                email: response?.email,
                phoneNumber: response?.userInfo.phoneNumber,
                clothingSize: response?.userInfo.clothingSize,
                shoeSize: response?.userInfo.shoeSize,
                hobby: response?.userInfo.hobby,
                importantNote: response?.userInfo.importantNote,
                facebookLink: response?.userInfo.facebookLink,
                telegramLink: response?.userInfo.telegramLink,
                vkLink: response?.userInfo.vkLink,
                instagramLink: response?.userInfo.instagramLink,
                photo: response?.photo,
            })
            setDateOfBirth(response?.userInfo.dateOfBirth)
        }
        fetchData()
    }, [])
    const navigateOtmen = () => {
        navigate('/myprofile')
    }
    const img = basicInformation.photo?.name ? null : basicInformation?.photo
    const submitHandler = (e) => {
        e.preventDefault()

        const navigateToProfile = () => {
            return navigate('/myprofile')
        }

        dispatch(
            editProfile({
                id: userInfo.id,
                basicInformation,
                dateOfBirth,
                navigate: navigateToProfile,
            })
        )
    }

    const pathTranslate = {
        myprofile: '??????????????',
        edit_profile: '???????????????????? ?? ????????',
    }
    return (
        <Div>
            <BreadCrumbsDiv>
                <BreadCrumbs translate={pathTranslate} />
            </BreadCrumbsDiv>
            <ProfileContainer onSubmit={submitHandler}>
                <div>
                    <ImagePicker
                        newFile={img}
                        id="editProfile"
                        onChange={onChangePhoto}
                    />
                </div>
                <ProfileDiv>
                    <SizeText>???????????????? ????????????????????</SizeText>
                    <InputsDiv>
                        <InputLabel>
                            ??????
                            <Input
                                value={basicInformation?.firstName}
                                name="firstName"
                                onChange={allValueHandler}
                                type="text"
                                width="396px"
                                height="35px"
                                placeholder="??????"
                            />
                        </InputLabel>
                        <InputLabel>
                            ??????????????
                            <Input
                                value={basicInformation?.lastName}
                                name="lastName"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                type="text"
                                placeholder="??????????????"
                            />
                        </InputLabel>
                    </InputsDiv>
                    <InputsDiv>
                        <InputLabel>
                            ??????????
                            <Input
                                name="city"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                type="text"
                                placeholder="??????????"
                                value={basicInformation?.city}
                            />
                        </InputLabel>
                        <InputLabel>
                            ???????? ????????????????
                            <ViewsDatePicker
                                placeholder="?????????????? ???????? ????????????????"
                                value={dateOfBirth}
                                onChange={dateChangeHandler}
                            />
                        </InputLabel>
                    </InputsDiv>
                    <InputsDiv>
                        <InputLabel>
                            Email
                            <Input
                                value={basicInformation?.email}
                                name="email"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                placeholder={basicInformation?.email}
                                type="email"
                                disabled
                            />
                        </InputLabel>
                        <InputLabel>
                            ?????????? ????????????????
                            <Input
                                name="phoneNumber"
                                onChange={allValueHandler}
                                width="396px"
                                height="35px"
                                type="number"
                                placeholder="?????????????? ?????????? ????????????????"
                                value={basicInformation?.phoneNumber}
                            />
                        </InputLabel>
                    </InputsDiv>
                    <div>
                        <SizeText>??????????????</SizeText>
                        <SelectDiv>
                            <WrapperSelect>
                                <p>???????????? ????????????</p>
                                <SizePopup
                                    valueHandler={popupValueHandler}
                                    options={optionsSize}
                                    placeholder={
                                        basicInformation?.clothingSize ||
                                        '???????????????? ???????????? ????????????'
                                    }
                                />
                            </WrapperSelect>

                            <WrapperSelect2>
                                <p>???????????? ??????????</p>
                                <SizePopup
                                    valueHandler={popupChangeHandler}
                                    options={options}
                                    placeholder={
                                        basicInformation?.shoeSize ||
                                        '???????????????? ???????????? ??????????'
                                    }
                                />
                            </WrapperSelect2>
                        </SelectDiv>
                    </div>
                    <div>
                        <SizeText>????????????????, ??????????</SizeText>
                        <DivTextArea>
                            <InputLabel style={style}>
                                ???????????????????? ?? ?????????? ?????????????????? ?? ??????????
                            </InputLabel>

                            <TextArea
                                defaultValue={basicInformation?.hobby}
                                name="hobby"
                                onChange={allValueHandler}
                                placeholder="????????????: ????????????????, ??????, ??????????, ???????????? ???????????????????????????? ????????????????????..."
                            />
                        </DivTextArea>
                    </div>
                    <div>
                        <SizeText>?????????? ??????????</SizeText>
                        <DivTextArea>
                            <InputLabel style={style}>
                                ?? ?????? ?????????? ???????????
                            </InputLabel>

                            <TextArea
                                defaultValue={basicInformation?.importantNote}
                                name="importantNote"
                                onChange={allValueHandler}
                                placeholder="????????????: ???????????????? ???? ?????????????????????????? ??????????????????, ?????????????????????????????? ??????????????..."
                            />
                        </DivTextArea>
                    </div>

                    <SizeText>???????????????????? ????????</SizeText>
                    <DivSocial>
                        <div>
                            <IconText>??????????????</IconText>
                            <SocialDiv>
                                <img src={facebook} alt="" />
                                <Input
                                    value={basicInformation?.facebookLink}
                                    name="facebookLink"
                                    onChange={allValueHandler}
                                    width="357px"
                                    height="35px"
                                    placeholder="???????????????? ???????????? ???? ??????????????"
                                />
                            </SocialDiv>
                        </div>
                        <div>
                            <IconText>?? ???????????????? </IconText>
                            <SocialDiv>
                                <img src={vkontakte} alt="" />
                                <Input
                                    name="vkLink"
                                    value={basicInformation?.vkLink}
                                    onChange={allValueHandler}
                                    width="357px"
                                    height="35px"
                                    placeholder="???????????????? ???????????? ???? ?? ???????????????? "
                                />
                            </SocialDiv>
                        </div>
                    </DivSocial>
                    <DivSocial>
                        <div>
                            <IconText>??????????????????</IconText>
                            <SocialDiv>
                                <img src={instagram} alt="" />
                                <Input
                                    name="instagramLink"
                                    onChange={allValueHandler}
                                    value={basicInformation?.instagramLink}
                                    width="357px"
                                    height="35px"
                                    placeholder="???????????????? ???????????? ???? ??????????????????"
                                />
                            </SocialDiv>
                        </div>
                        <div>
                            <IconText>???????????????? </IconText>
                            <SocialDiv>
                                <img src={telegram} alt="" />
                                <Input
                                    name="telegramLink"
                                    onChange={allValueHandler}
                                    width="357px"
                                    value={basicInformation?.telegramLink}
                                    height="35px"
                                    placeholder="???????????????? ???????????? ???? ???????????????? "
                                />
                            </SocialDiv>
                        </div>
                    </DivSocial>
                    <Buttons>
                        <Button onClick={navigateOtmen} variant="outlined">
                            ????????????
                        </Button>
                        <Button type="submit" variant="contained">
                            ??????????????????
                        </Button>
                    </Buttons>
                </ProfileDiv>
            </ProfileContainer>
        </Div>
    )
}

export default UserProfile
const Div = styled('div')`
    margin-top: 100px;
`
const style = {
    fontSize: '12px',
}
const BreadCrumbsDiv = styled('div')`
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
