import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import NotHolidayImage from '../assets/icons/notHoliday.png'
import { ReactComponent as PlusIcon } from '../assets/icons/plusIcon.svg'
import Button from '../components/ui/Button'
import MyHolidaysCard from '../components/users/MyHolidaysCard'
import {
    deleteHoliday,
    getHoliday,
    getHolidayById,
} from '../store/slices/HolidayActions'

import AddHolidayModal from './AddHolidayModal'
import DeleteModal from './DeleteModal'
import EditHolidaysModal from './EditHolidaysModal'

const WITHMEATBALLS = 'withMeatBalls'
const Image = (props) => {
    const { alt, ...otherProps } = props

    return <img alt={alt} {...otherProps} />
}
const HolidaysPage = () => {
    const [params, setParams] = useSearchParams()
    const holiday = useSelector((state) => state.holiday)
    const [holidayById, setHolidayById] = useState(params.get('id'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const locationId = params.get('id')
    const { editHoliday, addHoliday, deleteHolidays } = Object.fromEntries([
        ...params,
    ])
    const navigateToInnerPage = (id) => {
        navigate(`${id}`)
    }
    const openEditModalHandler = (id) => {
        setParams({ editHoliday: true, id })
    }
    const openAddModalHandler = () => {
        setParams({ addHoliday: true })
    }
    const closeModalHandler = () => {
        setParams({})
    }
    const getItemChangehandler = (id) => {
        setHolidayById(id)
    }

    useEffect(() => {
        dispatch(getHoliday())
    }, [holiday.editmodal, dispatch])

    useEffect(() => {
        if (holidayById) {
            dispatch(getHolidayById(holidayById))
        }
    }, [holidayById, dispatch])

    const openDeleteModal = (id) => {
        setParams({ deleteHolidays: true, id })
    }
    const deleteHolidaysHandler = (id) => {
        dispatch(deleteHoliday({ id, onClose: closeModalHandler }))
    }
    return (
        <HolidayCardDiv>
            <TitleButtonWrapper>
                <NamePage>Мои праздники</NamePage>
                <Button
                    startIcon={<PlusIcon />}
                    variant="addButton"
                    onClick={openAddModalHandler}
                >
                    Добавить праздник
                </Button>
            </TitleButtonWrapper>
            <AddHolidayModal
                name="add"
                onOpen={openAddModalHandler}
                open={addHoliday === 'true'}
                onClose={closeModalHandler}
            />
            <DeleteModal
                openDeleteModal={openDeleteModal}
                open={deleteHolidays === 'true'}
                onClose={closeModalHandler}
                deleteHolidays={deleteHolidaysHandler}
                id={locationId}
            />
            {holiday.holiday.length ? (
                <CardDiv>
                    {holiday?.holiday?.map((el) => {
                        return (
                            <MyHolidaysCard
                                key={el.id}
                                id={el.id}
                                img={el.photo}
                                title={el.name}
                                date={el.holidayDate}
                                getId={getItemChangehandler}
                                onOpen={openEditModalHandler}
                                navigate={() => navigateToInnerPage(el.id)}
                                variant={WITHMEATBALLS}
                                openDeleteModal={openDeleteModal}
                            />
                        )
                    })}
                </CardDiv>
            ) : (
                <NotFound>
                    <Image src={NotHolidayImage} alt="photo" />
                    <p style={{ textAlign: 'center' }}>У вас нет праздников</p>
                </NotFound>
            )}
            {editHoliday === 'true' && (
                <EditHolidaysModal
                    name="edit"
                    locaionId={locationId}
                    onOpen={openEditModalHandler}
                    onClose={closeModalHandler}
                    open={editHoliday === 'true'}
                    data={holiday.getSingleHoliday}
                />
            )}
        </HolidayCardDiv>
    )
}

export default HolidaysPage

const NotFound = styled('p')`
    margin-top: 100px;
    text-align: center;
    margin: 0 auto;
    font-size: x-large;
    font-family: Inter;
`
const HolidayCardDiv = styled('div')`
    padding-top: 90px;
    margin-left: 20px;
    margin-right: 40px;
`
const CardDiv = styled('div')`
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 19px;
    grid-row-gap: 15px;
`
const TitleButtonWrapper = styled('div')`
    height: 39px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const NamePage = styled('h1')`
    margin: 0;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.2px;
    color: #020202;
`
