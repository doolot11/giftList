import { useState } from 'react'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import styled from 'styled-components'

import balls from '../../../../assets/images/Vector (4).png'

export default function MeatBalls(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div style={{ width: '30px' }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src={balls} alt="balls" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {props.navigations?.map((el) => (
                    <MenuItem
                        key={el.id}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleClose()
                            el.clickItem(props.id)
                        }}
                    >
                        <Img src={el.icon} alt="navigation items" />
                        {el.title}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}
const Img = styled.img`
    margin-right: 10px;
    width: 16px;
    height: auto;
`
