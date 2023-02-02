import React from 'react'

import styled from '@emotion/styled'

function Textarea({
    placeholder,
    id,
    name,
    onChange,
    label,
    defaultValue,
    htmlFor,
    ...props
}) {
    return (
        <div>
            <Label htmlFor={htmlFor}> {label}</Label>
            <TextArea
                {...props}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </div>
    )
}
export default Textarea
const TextArea = styled('textarea')`
    width: 808px;
    height: 111px;
    border-radius: 6px;
    border: 1px solid #bdbdbd;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    resize: none;
    outline: none !important;
    margin-top: 6px;
    padding: 8px 0 0 18px;
    &::placeholder {
        color: #bfc0c4;
        padding: 0;
    }
    &:focus {
        border: 1px solid #8639b5;
    }
`
const Label = styled('label')`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #464444;
`
