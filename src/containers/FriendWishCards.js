import React, { useState, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import addInMyGiftIcon from '../assets/icons/addInMyGifts.svg'
import cancelBooking from '../assets/icons/cancelBooking.svg'
import complaintIcon from '../assets/icons/complaintss.svg'
import toBookIcon from '../assets/icons/toBook.svg'
import GiftCard from '../components/users/GiftCard'
import ReportModal from '../components/users/ReportModal'
import {
    toBookWish,
    addtoMyWish,
    copmlainToWish,
    cancelBookingWish,
} from '../store/slices/friendProfileAction'
import { showErrorMessage } from '../utils/helpers'

function FriendWishCards({ wishes, idOfOwnerUser }) {
    const dispatch = useDispatch()
    const { bookedUser } = wishes
    const { wish } = wishes
    const { userId } = useParams()
    const [title, setTitle] = useState('')
    const [complaintId, setcomplaintId] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const friendId = useSelector((state) => state.friend.friend.id)

    const options = useMemo(() => checkOwnBook(), [bookedUser])

    function checkOwnBook() {
        const isIWillBookAddAndComplainByMe = [
            {
                icon: toBookIcon,
                title: 'Забронировать',
                id: '1',
                clickItem: (id) => toBookWishHandler(id),
            },
            {
                icon: addInMyGiftIcon,
                title: 'Добавить в мои подарки',
                id: '2',
                clickItem: (id) => addToMyWishHandler(id),
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

        const isIWillCancelBookAddAndComplainByMe = [
            {
                icon: cancelBooking,
                title: 'Снять бронь',
                id: '1',
                clickItem: (id) => cancelBookingWishHandler(id),
            },
            {
                icon: addInMyGiftIcon,
                title: 'Добавить в мои подарки',
                id: '2',
                clickItem: (id) => addToMyWishHandler(id),
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
        const isIWillCancelBookandComplainByMe = [
            {
                icon: cancelBooking,
                title: 'Снять бронь',
                id: '2',
                clickItem: (id) => cancelBookingWishHandler(id),
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
        const isIWillBookAndComplainByMe = [
            {
                icon: toBookIcon,
                title: 'Забронировать',
                id: '1',
                clickItem: (id) => toBookWishHandler(id),
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

        const isIWillAddAndComplainByMe = [
            {
                icon: addInMyGiftIcon,
                title: 'Добавить в мои подарки',
                id: '2',
                clickItem: (id) => addToMyWishHandler(id),
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

        const isIWillComplainByMe = [
            {
                icon: complaintIcon,
                title: 'Пожаловаться',
                id: '3',
                clickItem: (id) => {
                    openModalHandler(id)
                },
            },
        ]
        if (bookedUser === null && wish?.addWishStatus === 'NOT_ADD') {
            return isIWillBookAddAndComplainByMe
        }
        if (bookedUser === null && wish?.addWishStatus === 'ADDED') {
            return isIWillBookAndComplainByMe
        }
        if (
            bookedUser?.userId === idOfOwnerUser &&
            wish?.addWishStatus === 'NOT_ADD'
        ) {
            return isIWillCancelBookAddAndComplainByMe
        }
        if (
            bookedUser?.userId === idOfOwnerUser &&
            wish?.addWishStatus === 'ADDED'
        ) {
            return isIWillCancelBookandComplainByMe
        }
        if (
            bookedUser?.userId !== idOfOwnerUser &&
            wish?.addWishStatus === 'NOT_ADD'
        ) {
            return isIWillAddAndComplainByMe
        }
        if (
            bookedUser?.userId !== idOfOwnerUser &&
            wish?.addWishStatus === 'ADDED'
        ) {
            return isIWillComplainByMe
        }
        return isIWillBookAddAndComplainByMe
    }

    function toBookWishHandler(id) {
        dispatch(toBookWish({ id, userId, dispatch }))
    }

    function cancelBookingWishHandler(id) {
        dispatch(cancelBookingWish({ id, friendId, dispatch }))
    }
    const addToMyWishHandler = (id) => {
        dispatch(addtoMyWish({ id, userId, dispatch }))
    }
    const sendComplainToWishHandler = async () => {
        try {
            await dispatch(copmlainToWish({ complaintId, title })).unwrap()
            setOpenModal(false)
        } catch (error) {
            showErrorMessage('Не удалось отправить')
        }
    }

    function openModalHandler(id) {
        setcomplaintId(id)
        setOpenModal(!openModal)
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
                    onClick={sendComplainToWishHandler}
                />
            )}
            <div>
                <GiftCard
                    key={wishes.wish?.wishId}
                    variant="board"
                    id={wishes.wish?.wishId}
                    nameGift={wishes.wish?.wishName}
                    image={wishes?.wish?.photo}
                    avatarBooked={wishes?.bookedUser?.photo}
                    holiday={wishes.wish?.holiday?.name}
                    date={wishes.wish?.wishDate}
                    isBooked={wishes?.bookedUser}
                    idOfOwnerUser={idOfOwnerUser}
                    navigation={options}
                />
            </div>
        </div>
    )
}

export default FriendWishCards
