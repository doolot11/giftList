import styled from 'styled-components'

import Advantages from './Advantages'

const AdvantagePage = (props) => {
    return (
        <Advantage>
            {props.advant.map((el) => (
                <Advantages
                    key={el.title}
                    title={el.title}
                    icon={el.icon}
                    li={el.li}
                />
            ))}
        </Advantage>
    )
}

export default AdvantagePage
const Advantage = styled.div`
    display: flex;
    justify-content: space-around;
    padding-top: 100px;
    height: 191px;
`
