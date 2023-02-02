import styled from 'styled-components'

const Statistic = (props) => {
    return (
        <Numbers>
            <h2>{props.number}</h2>
            <p>{props.name}</p>
        </Numbers>
    )
}
export default Statistic
const Numbers = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & h2 {
        width: 177px;
        height: 54px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 54px;
        color: #8639b5;
        padding: 30px;
        margin: 0px;
    }
    & p {
        width: 168px;
        height: 17px;
        font-family: 'Inter';
        font-style: normal;
        text-align: center;
        font-weight: 400;
        font-size: 14px;
        line-height: 120%;
        color: #353a5a;
        padding: 0px;
        margin: 0px;
    }
`
