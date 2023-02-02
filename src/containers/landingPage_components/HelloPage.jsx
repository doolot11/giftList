import { useState } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import landingFacebook from '../../assets/icons/landingFacebook.svg'
import landingInstagram from '../../assets/icons/landingInstagram.svg'
import vk from '../../assets/icons/vk.svg'
import groupPhotoLeft from '../../assets/images/groupPhotoLeft.png'
import groupPhotoRight from '../../assets/images/groupPhotoRight.png'
import SingIn from '../../components/authorization/SignIn'
import Button from '../../components/ui/Button'
import { actionAuth } from '../../store/slices/AuthSlice'
import {
    GIFTLIST_AUTH,
    GIFTLIST_REMEMBER,
} from '../../utils/constants/constants'

const HelloPage = ({ signupHandler }) => {
    const [signInState, setSignInState] = useState(false)
    const dispatch = useDispatch()

    const signInHandler = () => {
        setSignInState(true)
        const user = localStorage.getItem(GIFTLIST_REMEMBER)
        const { jwt, id, firstName, lastName, role, email, checked } =
            JSON.parse(user)

        if (checked) {
            localStorage.setItem(
                GIFTLIST_AUTH,
                JSON.stringify({ jwt, id, firstName, lastName, role, email })
            )
            dispatch(
                actionAuth.baseAuth({
                    jwt,
                    id,
                    firstName,
                    lastName,
                    role,
                    email,
                })
            )
        }
    }
    const downPage = () => {
        window.scrollTo({
            top: 800,
            behavior: 'smooth',
        })
    }
    return (
        <>
            <First data-aos="zoom-in-right">
                <Icons>
                    <a href="https://www.facebook.com/">
                        <img src={landingFacebook} alt="landing" />
                    </a>
                    <a href="https://www.instagram.com/">
                        {' '}
                        <img src={vk} alt="landing" />
                    </a>
                    <a href="https://vk.com/">
                        <img src={landingInstagram} alt="landing" />
                    </a>
                </Icons>
                <img src={groupPhotoLeft} alt="landing" />
            </First>
            <Second data-aos="fade-up">
                <h1>Социальная сеть нового поколения</h1>
                <p>
                    Всегда подскажет, что подарить близким и осуществит твои
                    желания
                </p>
                <Button onClick={signInHandler} variant="singInButton">
                    Войти
                </Button>
                {signInState && <SingIn setSignInState={setSignInState} />}
                <Buton>
                    <Button onClick={signupHandler} variant="singUpButton">
                        Регистрация
                    </Button>
                </Buton>
            </Second>
            <Third data-aos="zoom-in-left">
                <img src={groupPhotoRight} alt="third" />
                <p onClick={downPage}>&#8592; Листай вниз </p>
            </Third>
        </>
    )
}
export default HelloPage
const Buton = styled.div`
    padding: 20px;
    & button {
        border: 1px solid #ffffff;
        width: 291px;
        background: rgba(255, 255, 255, 0.1);
    }
`
const First = styled.div`
    width: 270px;
    height: 560px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 50px;
`
const Icons = styled.div`
    width: 22px;
    height: 126px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    & img {
        cursor: pointer;
    }
`
const Second = styled.div`
    width: inherit;
    height: 353px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h1 {
        font-size: 54px;
        font-family: 'Inter';
        color: #ffffff;
        width: 542px;
        height: 130px;
        font-style: normal;
        font-weight: 500;
        line-height: 120%;
        text-align: center;
    }
    & p {
        font-size: 16px;
        color: #ffffff;
        font-family: 'Inter';
        width: 378px;
        height: 48px;
        padding-top: 30px;
        padding-bottom: 30px;
    }
`

const Third = styled.div`
    width: 270px;
    height: 560px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-top: 50px;

    & img {
        width: 270px;
        height: 330px;
    }
    & p {
        font-size: 20px;
        width: 150px;
        color: #ffffff;
        transform: rotate(-90deg);
        margin-left: 170px;
        font-family: 'Inter';
        cursor: pointer;
    }
`
