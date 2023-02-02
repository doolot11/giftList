import { useState } from 'react'

import styled from 'styled-components'

import charityIcon from '../assets/icons/charityIcon.svg'
import facebook from '../assets/icons/facebook.svg'
import heart from '../assets/icons/heart.svg'
import insta from '../assets/icons/insta.svg'
import like from '../assets/icons/like.svg'
import vkontakte from '../assets/icons/vkontakte.svg'
import charity from '../assets/images/charity.png'
import designer from '../assets/images/designer.png'
import developer from '../assets/images/developer.png'
import device from '../assets/images/device.png'
import director from '../assets/images/director.png'
import editor from '../assets/images/editor.png'
import manager from '../assets/images/manager.png'
import market from '../assets/images/market.png'
import SignUp from '../components/authorization/SignUp'
import Button from '../components/ui/Button'

import AboutProject from './landingPage_components/AboutProject'
import AdvantagePage from './landingPage_components/AdvantagePage'
import CharityMain from './landingPage_components/CharityMain'
import HelloPage from './landingPage_components/HelloPage'
import Statistic from './landingPage_components/Statistics'
import Member from './landingPage_components/Team'

export const LandingPage = () => {
    const [signupState, setSignupState] = useState(false)
    const signupHandler = () => {
        setSignupState(true)
    }
    return (
        <div>
            <PurpleSection>
                <Content>
                    <Section>
                        <p onClick={aboutScroll}>О проекте</p>
                        <Title>
                            <strong>gift list</strong>
                        </Title>
                        <p onClick={charityScroll}>Благотворительность</p>
                    </Section>
                    <ThreeColumns>
                        <HelloPage signupHandler={signupHandler} />
                    </ThreeColumns>
                </Content>
            </PurpleSection>
            <WhiteSection>
                <Content>
                    <Div>
                        <Statistic number="100К+" name="Пользователей" />
                        <Statistic number="10 К+" name="Размещенных подарков" />
                        <Statistic number="15 К+" name="Подаренных подарков" />
                        <Statistic
                            number="9 К+"
                            name="Благотворительной помощи"
                        />
                    </Div>
                    <AdvantagePage advant={advant} />
                    <Btn>
                        <Button onClick={signupHandler} variant="contained">
                            Зарегистрироваться
                        </Button>
                        {signupState && (
                            <SignUp setSignupState={setSignupState} />
                        )}
                    </Btn>
                </Content>
            </WhiteSection>
            <PurpleSection>
                <Content>
                    <CharityMain charity={charity} />
                </Content>
            </PurpleSection>
            <WhiteSection>
                <Content>
                    <AboutProject device={device} />
                    <Member team={team} />
                </Content>
            </WhiteSection>
            <Footer>
                <Content>
                    <section>
                        <Contacts>
                            <h2 onClick={toTop}>GIFT LIST</h2>
                            <p>Социальная сеть нового поколения</p>
                            <div>
                                <a href="https://www.facebook.com/">
                                    <img src={facebook} alt="landing" />
                                </a>
                                <a href="https://vk.com/">
                                    <img src={vkontakte} alt="landing" />
                                </a>
                                <a href="https://www.instagram.com/">
                                    <img src={insta} alt="landing" />
                                </a>
                            </div>
                        </Contacts>
                        <Navigation>
                            <strong>Навигация</strong>
                            <p onClick={aboutScroll}>О проекте</p>
                            <p onClick={charityScroll}>Благотворительность</p>
                        </Navigation>
                    </section>
                </Content>
            </Footer>
            <Content>
                <Peaksoft>Peaksoft © 2022 Все права защищены</Peaksoft>
            </Content>
        </div>
    )
}
const team = [
    { job: 'Катя, ведущий дизайнер TailGroup', photo: designer },
    { job: 'Марина, маркетолог Headers Market', photo: market },
    { job: 'Сава, PR-менеджер Central Media', photo: manager },
    { job: 'Паша, основатель LeadCompany', photo: director },
    { job: 'Саша, главный редактор Just Journal', photo: editor },
    { job: 'Лёня, ведущий разработчик Ymail', photo: developer },
]

const heartAd = [
    'Находи своих близких',
    'Просматривай их списки желаний',
    'Узнавай о ближайших мероприятиях',
]
const likeAd = [
    'Создавай неограниченное количество желаний',
    'Добавляй подарки которые ты действительно хочешь',
    'Делись своими желаниями с другими',
]
const charAd = [
    'Дари благотворительные подарки',
    'Делись своими вещами',
    'Помогай другим приобрести необходимое',
]
const advant = [
    {
        title: 'Дари то, что необходимо',
        icon: heart,
        li: heartAd,
    },
    {
        title: 'Удобство в использовании',
        icon: like,
        li: likeAd,
    },
    {
        title: 'Твори добро',
        icon: charityIcon,
        li: charAd,
    },
]
const aboutScroll = () => {
    window.scrollTo({
        top: 2100,
        behavior: 'smooth',
    })
}
const charityScroll = () => {
    window.scrollTo({
        top: 1450,
        behavior: 'smooth',
    })
}
const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

const Peaksoft = styled.p`
    height: 14px;
    color: #020202;
    font-family: 'Inter';
    padding: 10px 0;
`
const Navigation = styled.div`
    display: flex;
    align-items: left;
    flex-direction: column;
    width: 255px;
    height: 120px;
    & p {
        margin-top: 5px;
        cursor: pointer;
    }
`
const Footer = styled.footer`
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    padding-bottom: 50px;
    padding-top: 50px;
    margin-top: 100px;
    & section {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #353a5a;
    }
`
const Contacts = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: left;
    flex-direction: column;
    width: 255px;
    & h2 {
        font-family: 'Inter';
        font-size: 24px;
        cursor: pointer;
        margin: 0px;
    }
    & p {
        padding-bottom: 10px;
        width: 300px;
        height: 18px;
    }
    & div {
        display: flex;
        justify-content: space-between;
        width: 116px;
        height: 22px;
        & img {
            cursor: pointer;
        }
    }
`
const WhiteSection = styled.div``
const Btn = styled.div`
    display: flex;
    justify-content: center;
    padding: 70px;
    text-align: center;
    & button {
        width: 291px;
    }
`
const Div = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 50px;
`
const Content = styled.div`
    margin: 0px auto;
    width: 1170px;
`
const PurpleSection = styled.div`
    padding-bottom: 100px;
    width: 100%;
    background-color: #8639b5;
`
const ThreeColumns = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Title = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin-top: 31px;
    text-transform: uppercase;
    color: #ffffff;
`
const Section = styled.section`
    display: flex;
    justify-content: space-between;
    & p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        color: #fdfdfd;
        line-height: 100%;
        margin-top: 31px;
        cursor: pointer;
    }
`
