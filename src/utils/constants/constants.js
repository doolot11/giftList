import { ReactComponent as Bron } from '../../assets/icons/bron.svg'
import { ReactComponent as Charity } from '../../assets/icons/Charity.svg'
import { ReactComponent as Compolaints } from '../../assets/icons/complaintss.svg'
import { ReactComponent as Friends } from '../../assets/icons/friends.svg'
import { ReactComponent as Lenta } from '../../assets/icons/Lenta.svg'
import { ReactComponent as List } from '../../assets/icons/List.svg'
import { ReactComponent as MyHalidays } from '../../assets/icons/myPrazniki.svg'

export const RolePaths = {
    USER: [
        {
            pathName: 'Лента',
            path: '/lenta',
            icon: <Lenta />,
        },
        {
            pathName: 'Друзья',
            path: '/friends',
            icon: <Friends />,
        },
        {
            pathName: 'Список желаний',
            path: '/wish_list',
            icon: <List />,
        },
        {
            pathName: 'Забронированные',
            path: '/bookedPage',
            icon: <Bron />,
        },
        {
            pathName: 'Мои праздники',
            path: '/my_halidays',
            icon: <MyHalidays />,
        },
        {
            pathName: 'Благотворительность',
            path: '/charity',
            icon: <Charity />,
        },
    ],
    ADMIN: [
        {
            pathName: 'Пользователи',
            path: '/users',
            icon: <Friends />,
        },
        {
            pathName: 'Благотворительность',
            path: '/charityAdmin',
            icon: <Charity />,
        },
        {
            pathName: 'Жалобы',
            path: '/complaints',
            icon: <Compolaints />,
        },
    ],
}
export const DEFAULT_ROUTES = {
    INDEX: {
        PATH: '/',
        LABEL: 'Главная',
    },
    NOT_FOUND: {
        PATH: '*',
        LABEL: 'Страница не найдена',
    },
}
export const array = [
    { id: 'NEW', name: 'Новый' },
    { id: 'USED', name: 'Б/У' },
]
export const GIFTLIST_AUTH = 'GIFTLIST_AUTH'
export const GIFTLIST_REMEMBER = 'GIFTLIST_REMEMBER'

export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
}
export const options = [
    { text: '35', id: '35' },
    { text: '36', id: '36' },
    { text: '37', id: '37' },
    { text: '38', id: '38' },
    { text: '39', id: '39' },
    { text: '40', id: '40' },
    { text: '41', id: '41' },
    { text: '42', id: '42' },
    { text: '43', id: '43' },
    { text: '44', id: '44' },
]
export const optionsSize = [
    { text: 'XXS', id: 'XXS' },
    { text: 'XS', id: 'XS' },
    { text: 'S', id: 'S' },
    { text: 'M', id: 'M' },
    { text: 'L', id: 'L' },
    { text: 'XL', id: 'XL' },
    { text: 'XXL', id: 'XXL' },
    { text: 'XXXL', id: 'XXXL' },
]
