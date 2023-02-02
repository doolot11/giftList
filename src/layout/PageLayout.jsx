import React from 'react'

import { styled } from '@mui/material'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { NavLink, Outlet } from 'react-router-dom'

import { RolePaths } from '../utils/constants/constants'

import { Header } from './Header'

export const PageLayout = () => {
    const { role } = useSelector((state) => state.authSlice.user)
    return (
        <ContainerWrapper>
            <Layout>
                <NavbarWrapper>
                    <SideBar>
                        <TextGift>GIFT LIST</TextGift>
                        <NavWrapper>
                            {RolePaths[role]?.map((item) => {
                                return (
                                    <NavbarLink
                                        key={item.pathName}
                                        to={item.path}
                                    >
                                        <div>
                                            <span> {item.icon} </span>
                                            <span> {item.pathName}</span>
                                        </div>
                                    </NavbarLink>
                                )
                            })}
                        </NavWrapper>
                    </SideBar>
                </NavbarWrapper>
                <Box>
                    <Header />
                    <ContentWrapper>
                        <Outlet />
                    </ContentWrapper>
                    {/* <Content>{children}</Content> */}
                </Box>
            </Layout>
        </ContainerWrapper>
    )
}
const ContainerWrapper = styled('div')`
    width: 100%;
    margin: 0 auto;
`
const ContentWrapper = styled('div')`
    margin-top: 30px;
    /* min-height: 50vh; */
`
const Box = styled('div')`
    position: relative;
    margin: 0 auto;
    width: 100%;
`
const Layout = styled('div')`
    display: grid;
    grid-template-columns: 293px auto;
`
const SideBar = styled('div')`
    background: linear-gradient(180deg, #8639b5 0%, #092056 100%);
    position: fixed;
    width: 294px;
    height: 100%;
    box-sizing: border-box;
    text-align: start;
    z-index: 99;
`
const TextGift = styled('h2')`
    text-align: center;
    color: white;
    font-family: 'Inter', sans-serif;
    margin-bottom: 34px;
`

const NavbarWrapper = styled('div')``
const NavWrapper = styled('nav')`
    color: white;
    font-size: 18px;
`
const NavbarLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    display: flex;
    margin-left: 15px;
    letter-spacing: 0.01em;
    width: 254px;
    height: 50px;
    padding-left: 9px;
    font-family: 'Inter', sans-serif;
    align-items: center;
    margin-top: 4px;
    div {
        display: flex;
        align-items: center;
        font-family: 'Inter', sans-serif;
        & :first-of-type {
            align-self: center;
        }
        & :last-child {
            margin-left: 15px;
        }
    }
    &.active {
        display: flex;
        letter-spacing: 0.01em;
        background-color: rgba(255, 255, 255, 0.1);
        width: 254px;
        height: 50px;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
        border-radius: 8px;
        position: relative;
        z-index: 10;
        div {
            display: flex;
            color: white;
        }
    }
`
