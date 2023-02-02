import styled from 'styled-components'

const CharityMain = (props) => {
    return (
        <Charity>
            <img src={props.charity} alt="charity" />
            <div>
                <h1>Благотворительность</h1>
                <p>
                    Благотворительность позволяет людям выполнить свое
                    предназначение. В нашем разобщенном обществе именно она
                    позволяет объединиться. Благодаря нашему сервису вы сможете
                    порадовать и дарить людям то в чем они нуждаются чтобы
                    сделать жизнь нуждающегося хотя бы чуточку веселее и ярче.
                </p>
            </div>
        </Charity>
    )
}
export default CharityMain
const Charity = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 80px 5px;
    & h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 46px;
        line-height: 120%;
        color: #fdfdfd;
    }
    & p {
        width: 570px;
        height: 192px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: #fdfdfd;
    }
    & img {
        width: 500px;
        height: 362px;
    }
`
