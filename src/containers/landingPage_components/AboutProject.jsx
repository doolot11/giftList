import styled from 'styled-components'

const AboutProject = (props) => {
    return (
        <Device>
            <div>
                <h1>О проекте</h1>
                <p>
                    Найти удачный подарок, который принесёт радость, не всегда
                    простая задача. Благодаря нашему сервису у вас есть
                    возможность не только обрадовать подарком, но и помочь
                    другим приобрести необходимые им вещи. В разделе
                    благотворительность вы можете найти список опубликованных
                    вещей, забронировав, вы связываетесь с их обладателем.
                </p>
            </div>
            <img src={props.device} alt="device" />
        </Device>
    )
}
export default AboutProject
const Device = styled.div`
    padding: 100px 5px;
    display: flex;
    justify-content: space-between;
    & h1 {
        width: 234px;
        height: 46px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 46px;
        line-height: 100%;
        color: #020202;
    }
    & img {
        width: 542px;
        height: 318px;
    }
    & p {
        width: 500px;
        height: 182px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #020202;
    }
`
