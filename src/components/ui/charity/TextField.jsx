import { InputLabel, TextField } from '@mui/material'

const TextFields = (props) => {
    return (
        <InputLabel style={props.style}>
            {props.label}
            <TextField
                placeholder={props.placeholder}
                autoComplete="off"
                value={props.value}
                onChange={props.onChange}
                variant="outlined"
                InputProps={{
                    style: props.propsstyle,
                }}
            />
        </InputLabel>
    )
}
export default TextFields
