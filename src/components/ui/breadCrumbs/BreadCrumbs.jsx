import { Breadcrumbs, Typography, Link, styled } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

const BreadCrumbs = ({ translate, ...props }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)
    const updatedPathnames = pathnames.map((path) => translate[path] || path)

    return (
        <LayoutBreadcrumbs aria-label="breadcrumb">
            {updatedPathnames.map((element, index) => {
                const toUpperPathName =
                    element[0].toUpperCase() + element.slice(1)
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
                const isLast = index === updatedPathnames.length - 1
                return isLast ? (
                    <Title
                        key={toUpperPathName}
                        color={props.color}
                        fontSize={props.fontSize}
                    >
                        {toUpperPathName}
                    </Title>
                ) : (
                    <LinkStyle
                        key={toUpperPathName}
                        onClick={() => navigate(routeTo)}
                    >
                        {toUpperPathName}
                    </LinkStyle>
                )
            })}
        </LayoutBreadcrumbs>
    )
}
export default BreadCrumbs
const LayoutBreadcrumbs = styled(Breadcrumbs)`
    display: flex;
    align-items: center;
    & .css-4pdmu4-MuiBreadcrumbs-ol {
        display: flex;
        align-items: center;
        line-height: 17px;
        height: 18px;
    }
    & .css-1wuw8dw-MuiBreadcrumbs-separator {
        margin-left: 6px;
        margin-right: 6px;
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        color: #c4c4c4;
        margin-top: 0;
        margin-bottom: 0;
    }
`
const Title = styled(Typography)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    color: #000000;
    font-size: ${(props) => props.fontSize || '14px'};
    line-height: 17px;
`
const LinkStyle = styled(Link)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    font-size: ${(props) => props.fontSize || '14px'};
    text-decoration: none;
    cursor: pointer;
    color: ${(props) => props.colorlink || '#b4b4b4'};
`
