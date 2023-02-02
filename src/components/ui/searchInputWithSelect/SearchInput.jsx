import styled from 'styled-components'

import Union from '../../../assets/icons/Union.svg'

const SearchInput = ({ onChange }) => {
    return (
        <InputBlock>
            <IconSearch src={Union} alt="icon" />
            <StyleInput
                type="search"
                placeholder="Поиск"
                onChange={(event) =>
                    onChange('searchInput', event.target.value)
                }
            />
        </InputBlock>
    )
}

export default SearchInput

const InputBlock = styled.div`
    display: flex;
    align-items: center;
`
const IconSearch = styled.img`
    width: 20px;
    height: 20px;
    position: relative;
    left: 20px;
    margin: 0px;
`
const StyleInput = styled.input`
    border: none;
    outline: none;
    margin-left: 40px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #020202;

    &::placeholder {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.02em;
        color: #8d949e;
    }
`
