import React, { useState, useMemo } from 'react'

import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import cancelBooking from '../assets/icons/cancelBooking.svg'
import complaintIcon from '../assets/icons/complaintss.svg'
import toBookIcon from '../assets/icons/toBook.svg'
import CharityCards from '../components/users/CharityCards'
import ReportModal from '../components/users/ReportModal'
import {
    copmlainToGift,
    cancelBookingGift,
    toBookGift,
} from '../store/slices/friendProfileAction'
import { showErrorMessage } from '../utils/helpers'

function FriendGiftCards({ gifts, idOfOwnerUser }) {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const [title, setTitle] = useState('')
    const [complaintId, setcomplaintId] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const { bookedUser } = gifts

    const options = useMemo(() => checkOwnBook(), [userId])

    function checkOwnBook() {
        const toBookGift = [
            {
                icon: toBookIcon,
                title: 'Забронировать',
                id: '1',
                clickItem: (id) => toBookGiftHandler(id),
            },
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        const cancelBookingGift = [
            {
                icon: cancelBooking,
                title: 'Снять бронь',
                id: '2',
                clickItem: (id) => cancelBookingGiftHandler(id),
            },
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        const complainGift = [
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        if (bookedUser === null) {
            return toBookGift
        }
        if (bookedUser?.userId === idOfOwnerUser) {
            return cancelBookingGift
        }
        if (bookedUser?.userId !== idOfOwnerUser) {
            return complainGift
        }
        return toBookGift
    }

    function cancelBookingGiftHandler(id) {
        dispatch(cancelBookingGift({ id, dispatch, userId }))
    }
    function toBookGiftHandler(id) {
        dispatch(toBookGift({ dispatch, id, userId }))
    }

    const sendComplainToGiftHandler = async () => {
        try {
            await dispatch(copmlainToGift({ complaintId, title })).unwrap()
            setOpenModal(false)
        } catch (error) {
            showErrorMessage('Не удалось отправить')
        }
    }
    function openModalHandler(id) {
        setcomplaintId(id)
        setOpenModal((prev) => !prev)
    }
    const titleChangeHandler = (e) => {
        setTitle(e.title)
    }
    const closeModalHandler = () => {
        setOpenModal(false)
    }
    return (
        <div>
            {openModal && (
                <ReportModal
                    open={openModal}
                    onClose={closeModalHandler}
                    onChange={titleChangeHandler}
                    onClick={sendComplainToGiftHandler}
                />
            )}
            <div>
                <CharityCards
                    id={gifts?.gift?.giftId}
                    key={gifts?.gift?.giftId}
                    variant="board"
                    nameGift={gifts?.gift?.name}
                    image={gifts?.gift?.photo}
                    avatarBooked={gifts?.bookedUser?.photo}
                    holiday={gifts?.gift?.status}
                    date={gifts?.gift?.createdAt}
                    isBooked={gifts?.bookedUser}
                    idOfOwnerUser={idOfOwnerUser}
                    navigation={options}
                />
            </div>
        </div>
    )
}

export default FriendGiftCards
