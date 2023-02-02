import styled from '@emotion/styled'

import BasicModal from '../ui/BasicModal'
import Button from '../ui/Button'
import Radio from '../ui/Radio'

const ReportModal = ({ open, onClose, onChange, onClick }) => {
    const radio = [
        { title: 'Жестокость и шокирующий контент', id: '1' },
        { title: 'Проявление ненависти', id: '2' },
        {
            title: 'Нелегальные действия или регламентированные товары',
            id: '3',
        },
        { title: 'Спам', id: '4' },
        { title: 'Призывы к насилию, опасные действия', id: '5' },
        { title: 'Сцены порнографического характера', id: '6' },
        { title: 'Прочее', id: '7' },
    ]
    const getValue = (e) => {
        onChange(e)
    }
    return (
        <BasicModal open={open} onClose={onClose}>
            <Wrapper>
                <Report>Пожаловаться</Report>
                <ReportSpan>
                    Почему вы хотите пожаловаться на эту публикацию?
                </ReportSpan>
                <Div>
                    {radio.map((el) => (
                        <Radio
                            onChange={() => getValue(el)}
                            key={el.id}
                            label={el.title}
                        />
                    ))}
                </Div>
                <WrapperButton>
                    <Button variant="outlined" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button variant="contained" onClick={onClick}>
                        Отправить
                    </Button>
                </WrapperButton>
            </Wrapper>
        </BasicModal>
    )
}
export default ReportModal

const WrapperButton = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    button {
        width: 232px;
        height: 37px;
        border-radius: 10px;
    }
`

const Wrapper = styled('div')`
    min-width: 480px;
`

const Report = styled('h1')`
    font-family: 'Inter' sans-serif;
    font-style: normal;
    font-weight: 550;
    font-size: 24px;
`

const ReportSpan = styled('span')`
    font-family: 'Inter' sans-serif;
    font-style: normal;
    font-weight: 550;
    font-size: 14px;
`

const Div = styled('div')`
    display: flex;
    flex-direction: column;
`
