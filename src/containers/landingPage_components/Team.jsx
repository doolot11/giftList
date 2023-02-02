import styled from 'styled-components'

const Member = (props) => {
    return (
        <Team>
            {props.team.map((el) => (
                <p key={el.job}>
                    <img src={el.photo} alt="team" />
                    <strong>{el.job}</strong>
                </p>
            ))}
        </Team>
    )
}
export default Member
const Team = styled.div`
    display: flex;
    justify-content: space-between;
    & p {
        display: flex;
        flex-direction: column;
        & img {
            width: 170px;
            height: 170px;
        }
        & strong {
            width: 170px;
            height: 36px;
            font-family: 'Inter';
            padding-top: 10px;
        }
    }
`
