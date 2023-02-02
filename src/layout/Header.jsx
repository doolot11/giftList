import React, { useEffect, useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { ReactComponent as NotifIsRead } from '../assets/icons/NotifIsRead.svg'
import { ReactComponent as WarningIcon } from '../assets/icons/warning.svg'
import MainSearchInput from '../components/ui/MainSearchInput'
import SearchInputWithSelect from '../components/ui/searchInputWithSelect/SearchInputWithSelect'
import {
    getAdminCharitiesWithFilter,
    getCategories,
    getCharitiesWithFilter,
    getSubCategories,
} from '../store/slices/admin/charityAction'
import {
    mainSearchAction,
    mainSearchInAdminAction,
} from '../store/slices/mainSearchAction'
import { getAllNotifications } from '../store/slices/NotificationsAction'
import { array } from '../utils/constants/constants'

import MenuAccaunt from './MenuAccaount'
import NotificationMenu from './notification/NotificationMenu'

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [categoryId, setIdCategory] = useState()
    const { options, optionsAdmin } = useSelector((state) => state.users)
    const { searching, notification } = useSelector((state) => state)
    const { role } = useSelector((state) => state.authSlice.user)

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getAdminCharitiesWithFilter('search=all'))
        dispatch(getCharitiesWithFilter('search=a'))
        dispatch(getAllNotifications())
    }, [])

    useEffect(() => {
        if (location.pathname === '/charityAdmin') {
            dispatch(getAdminCharitiesWithFilter(searchParams.toString()))
        }
        dispatch(getCharitiesWithFilter(searchParams.toString()))
    }, [searchParams.toString()])

    const valueChangeHandler = (e) => {
        setValue(e.target.value)
        if (role !== 'ADMIN') {
            dispatch(mainSearchAction(e.target.value))
        } else {
            dispatch(mainSearchInAdminAction(e.target.value))
        }
    }
    const searchResultOptionSelecHandler = (id) => {
        if (role !== 'ADMIN') {
            navigate(`/friends/${id}`)
        } else {
            navigate(`/users/${id}`)
        }
        setValue('')
    }
    const a = [{ name: 'пусто' }]
    const stopPropagationHandler = (event) => {
        event.stopPropagation()
    }
    const getIdCategory = (e) => {
        if (e.state) {
            setSearchParams({ ...searchParams, status: e.state })
            searchParams.status = e.state
        }
        if (e.category) {
            setSearchParams({ ...searchParams, categoryId: e.category })
            searchParams.categoryId = e.category
            dispatch(getSubCategories(e.category))
            setIdCategory(e.category)
            dispatch(getSubCategories(e.category))
        }
        if ((e.category, e.subCategory)) {
            setSearchParams({ ...searchParams, subCategoryId: e.subCategory })
            searchParams.subCategoryId = e.subCategory
        }
    }
    const arrauSelect = searching.categories.length ? searching.categories : a
    const isWishSearchHandler = () => {
        if (location.pathname === '/charityAdmin') {
            return (
                <SearchInputWithSelect
                    showSubCategory={categoryId}
                    onChange={getIdCategory}
                    categories={arrauSelect}
                    stateOption={array}
                    subCategories={searching.subCategories}
                />
            )
        }
        if (location.pathname === '/charity') {
            return (
                <SearchInputWithSelect
                    showSubCategory={categoryId}
                    onChange={getIdCategory}
                    categories={arrauSelect}
                    stateOption={array}
                    subCategories={searching.subCategories}
                />
            )
        }
        if (role !== 'ADMIN') {
            return (
                <MainSearchInput
                    options={options}
                    onChange={valueChangeHandler}
                    value={value}
                    onClick={searchResultOptionSelecHandler}
                    stopPropagationHandler={stopPropagationHandler}
                />
            )
        }
        if (role === 'ADMIN') {
            return (
                <MainSearchInput
                    options={optionsAdmin}
                    onChange={valueChangeHandler}
                    value={value}
                    onClick={searchResultOptionSelecHandler}
                    stopPropagationHandler={stopPropagationHandler}
                />
            )
        }
        return location.pathname
    }
    const [anchorEl, setanchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handelClick = (e) => {
        setanchorEl(e.currentTarget)
    }
    const onClose = () => {
        setanchorEl(null)
    }
    return (
        <Headers>
            <InputDiv>{isWishSearchHandler()}</InputDiv>
            <WarningSpan>
                <NotificationMenu
                    menuItems={notification.allNotification}
                    handleClose={onClose}
                    open={open}
                    anchorEl={anchorEl}
                />
                {notification.allNotification.length ? (
                    <NotifIsRead
                        style={styleWarningIcon}
                        onClick={handelClick}
                    />
                ) : (
                    <WarningIcon
                        style={styleWarningIcon}
                        onClick={handelClick}
                    />
                )}
            </WarningSpan>
            <MenuAccaunt />
        </Headers>
    )
}
export default Header

const Headers = styled('header')`
    width: 1220px;
    height: 86px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    position: fixed;
    top: 0;
    background: #ffffff;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.03);
    z-index: 2;
`
const WarningSpan = styled('span')`
    margin-left: 30px;
`
const InputDiv = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const styleWarningIcon = {
    cursor: 'pointer',
}
