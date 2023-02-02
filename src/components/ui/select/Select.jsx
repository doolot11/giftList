import { useState, useEffect } from 'react'

import { createTheme, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/system'

export default function SelectFilter(props) {
    const [name, settext] = useState('')
    const handleChange = (event) => {
        settext(event.target.value)
    }
    useEffect(() => {
        if (props?.holidayName) {
            settext(props?.holidayName)
        }
    }, [props?.holidayName])
    return (
        <div>
            <ThemeProvider
                theme={createTheme({
                    palette: {
                        primary: { main: '#8639B5' },
                        action: {
                            hover: 'rgba(134, 57, 181, 0.2)',
                        },
                        '&.MuiTouchRipple-root': {
                            backgroundColor: '#8639B5',
                        },
                    },
                    components: {
                        MuiMenuItem: {
                            styleOverrides: {
                                root: {
                                    '&.Mui-selected': {
                                        backgroundColor:
                                            'rgba(134, 57, 181, 0.4)',
                                    },
                                },
                            },
                        },
                    },
                })}
            >
                <Box>
                    <FormControl fullWidth>
                        <Label>{props.label}</Label>
                        {name === '' ? (
                            <StyledInputLabel
                                shrink={false}
                                focused={false}
                                id="item_type_label"
                            >
                                {props.placeholder}
                            </StyledInputLabel>
                        ) : null}
                        <Select
                            sx={{
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                                minWidth: 120,
                                height: 35,
                            }}
                            value={name}
                            onChange={handleChange}
                        >
                            {props?.options?.map((i) => (
                                <MenuItem
                                    onClick={() => {
                                        props.getValue(i)
                                    }}
                                    value={i.name}
                                    key={i.id}
                                >
                                    {i.name}
                                </MenuItem>
                            ))}
                            {props.additionalOption}
                        </Select>
                    </FormControl>
                </Box>
            </ThemeProvider>
        </div>
    )
}
const StyledInputLabel = styled(InputLabel)`
    padding: 10px 0 8px 0;
    color: #bfc0c4;
`
const Label = styled('label')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #464444;
    margin-bottom: 6px;
`
