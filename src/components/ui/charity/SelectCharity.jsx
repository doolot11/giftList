import { MenuItem, Select } from '@mui/material'

export default function SelectCharity(props) {
    return (
        <Select
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            style={textFieldstyle}
            displayEmpty
            renderValue={
                props.value !== '' ? undefined : () => `${props.placeholder}`
            }
        >
            {props.data &&
                props.data?.map((el) => (
                    <MenuItem
                        onClick={() => props.onClick && props.onClick(el.id)}
                        key={el.id}
                        value={el.id}
                    >
                        {el.name}
                    </MenuItem>
                ))}
        </Select>
    )
}
const textFieldstyle = {
    width: '396px',
    height: '35px',
    color: '#8D949E',
    padding: '8px 18px',
    borderRadius: '6px',
    margin: '5px 0',
}
