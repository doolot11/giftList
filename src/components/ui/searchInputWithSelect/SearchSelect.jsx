import React, { useState, useEffect } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'

const SearchSelect = ({ options, category, onChange, labelKey, valueKey }) => {
    const [values, setValues] = useState('')
    const [text, settext] = useState(false)
    const [px, setPx] = useState('')

    const handleChange = (event) => {
        setValues(event.target.value)
        onChange(event.target.value)
        settext(true)
    }
    useEffect(() => {
        if (category.length === 6) {
            setPx(category.length * 14)
        } else if (category.length >= 12) {
            setPx(category.length * 11)
        } else if (category.length < 12) {
            setPx(category.length * 12)
        }
    }, [category])

    return (
        <Sel text={text} widthPx={px}>
            <FormControl>
                {values === '' ? (
                    <TextPlaceholder
                        disableAnimation
                        shrink={false}
                        focused={false}
                        id="item_type_label"
                    >
                        {category}
                    </TextPlaceholder>
                ) : null}
                <Select
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                bgcolor: 'white',
                                '& .MuiMenuItem-root': {
                                    paddingBottom: '10px',
                                    paddingTop: '10px',
                                },
                                '& .Mui-selected ': {
                                    backgroundColor: 'rgba(134, 57, 181, 0.4)',
                                },
                                '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                                    padding: '0px',
                                },
                            },
                        },
                    }}
                    value={values}
                    onChange={handleChange}
                >
                    {options.map((elem) => {
                        return (
                            <MenuOptions
                                value={elem[valueKey]}
                                key={elem[valueKey]}
                            >
                                {elem[labelKey]}
                            </MenuOptions>
                        )
                    })}
                </Select>
            </FormControl>
        </Sel>
    )
}

export default SearchSelect
const TextPlaceholder = styled(InputLabel)`
    height: 20px;
    width: 120px;
    text-align: center;
    margin-top: -13.7px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #8d949e;
`
const Sel = styled('div')`
    & .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
        padding: 0;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #020202;
    }
    & .css-1nrlq1o-MuiFormControl-root {
        width: ${(props) => props.text || `${props.widthPx}px`};
        padding-left: 25px;
        margin-right: -30px;
    }
    & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: none;
        width: auto;
    }
`
const MenuOptions = styled(MenuItem)`
    background-color: white;
    :hover {
        background-color: rgba(134, 57, 181, 0.2);
    }
    .Mui-selected {
        background: rgba(134, 57, 181, 0.4);
    }
`
