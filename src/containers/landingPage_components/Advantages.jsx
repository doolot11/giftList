import styled from 'styled-components'

const Advantages = (props) => {
    return (
        <Advantage>
            <h3>
                <img src={props.icon} alt="like icon" />
                {props.title}
            </h3>
            <ul>
                {props.li.map((el) => (
                    <li key={el}>{el}</li>
                ))}
            </ul>
        </Advantage>
    )
}
export default Advantages
const Advantage = styled.div`
    & h3 {
        display: flex;
        align-items: center;
        /* width: 288px; */
        height: 30px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 150%;
        & img {
            padding: 0 15px;
            width: 50px;
            /* height: 18px; */
        }
    }
    & ul {
        width: 288px;
        font-family: 'Inter';
        & li {
            padding: 5px;
        }
    }
`
