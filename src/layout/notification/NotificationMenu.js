import styled from '@emotion/styled'
import Menu from '@mui/material/Menu'
import { useDispatch } from 'react-redux'

import asReadIcon from '../../assets/icons/asReadIcon.svg'
import MeatBalls from '../../components/ui/meatBall/components/meatBalls'
import { asReadActions } from '../../store/slices/NotificationsAction'

import ListNotification from './ListNotification'

const NotificationMenu = ({ anchorEl, handleClose, open, menuItems }) => {
    const dispatch = useDispatch()
    const arrayAsRead = [
        {
            icon: asReadIcon,
            title: 'Отметить все как прочитанные',
            id: '1',
            clickItem: asReadHandler,
        },
    ]
    function asReadHandler() {
        dispatch(asReadActions())
    }
    return (
        <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <Div>
                <StyledTitle>Уведомления</StyledTitle>
                {menuItems.length ? (
                    <WrapperMeatballs>
                        <MeatBalls navigations={arrayAsRead}> </MeatBalls>
                    </WrapperMeatballs>
                ) : (
                    <StyledTitle> Нет новых уведомление</StyledTitle>
                )}
            </Div>

            {menuItems.map((el) => (
                <ListNotification
                    onClose={handleClose}
                    userId={el.userId}
                    read={el.read}
                    key={el.notificationId}
                    createdAt={el.createdAt}
                    wishOrGiftOrHolidayName={el.wishOrGiftOrHolidayName}
                    userLastName={el.userLastName}
                    userFirstName={el.userFirstName}
                    photo={el.photo}
                    notificationStatus={el.notificationStatus}
                />
            ))}
        </StyledMenu>
    )
}

export default NotificationMenu

const Div = styled('div')`
    display: flex;
    justify-content: space-between;
    padding: 0 20px 0 20px;
`
export const StyledMenu = styled(Menu)`
    .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
        width: 410px;
        background: #ffff;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        margin-top: 20px;
    }
`
const StyledTitle = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const WrapperMeatballs = styled('div')`
    transform: rotate(90deg);
    margin-bottom: 25px;
`
