import { useState, useEffect } from 'react'

import styled from '@emotion/styled'
import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import {
    getCategory,
    getSingleCharityById,
    getSubCategory,
    putCharity,
} from '../../../store/slices/GiftActions'
import { showErrorMessage } from '../../../utils/helpers'
import Button from '../Button'
import ImagePicker from '../ImagePicker'

export default function EditMyCharity() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { editId } = useParams()
    const [category, setCategory] = useState()
    const [subCategory, setSubCategory] = useState()
    const state = useSelector((state) => state.addCharity.single)

    const [allvalue, setallvalue] = useState({
        name: '',
        photo: '',
        categoryId: '',
        subCategoryId: '',
        status: '',
        description: '',
    })
    useEffect(() => {
        const fetch = async () => {
            dispatch(getCategory(setCategory))
            const res = await dispatch(getSingleCharityById(editId)).unwrap()
            setallvalue({
                name: res?.gift.name,
                photo: res?.gift.photo,
                categoryId: res?.gift.category.id,
                subCategoryId: res?.gift.subCategory.id,
                status: res?.gift.status,
                description: res?.gift.description,
            })
            dispatch(
                getSubCategory({
                    id: res?.gift?.category.id,
                    setSubCategory,
                })
            )
        }
        fetch()
    }, [])
    const submitHandler = (e) => {
        e.preventDefault()
        const fetch = async () => {
            try {
                await dispatch(
                    putCharity({ id: state?.gift.giftId, ...allvalue })
                ).unwrap()
                navigate('/charity')
            } catch (error) {
                showErrorMessage('Не удалось изменить!')
            }
        }
        fetch()
    }
    const getsubcategory = (id) => {
        dispatch(getSubCategory({ id, setSubCategory }))
    }
    const img = state?.gift.photo?.name ? null : state?.gift.photo
    return (
        <div style={styleForCard}>
            <Anketa onSubmit={submitHandler}>
                {state && (
                    <ImagePicker
                        onChange={(file) => {
                            setallvalue({
                                ...allvalue,
                                photo: file,
                            })
                        }}
                        id={allvalue?.name}
                        newFile={img}
                    />
                )}
                <Container>
                    <Title>Редактировать </Title>
                    <Questionaire>
                        <div>
                            <InputLabel style={InputLabelstyle}>
                                Название подарка
                                <TextField
                                    value={allvalue.name}
                                    onChange={(e) => {
                                        setallvalue({
                                            ...allvalue,
                                            name: e.target.value,
                                        })
                                    }}
                                    variant="outlined"
                                    InputProps={{
                                        style: textFieldstyle,
                                    }}
                                />
                            </InputLabel>
                            <InputLabel>Категория</InputLabel>
                            <Select
                                value={allvalue.categoryId}
                                onChange={(e) => {
                                    setallvalue({
                                        ...allvalue,
                                        categoryId: e.target.value,
                                    })
                                }}
                                style={textFieldstyle}
                            >
                                {category?.map((el) => (
                                    <MenuItem
                                        onClick={() => {
                                            getsubcategory(el.id)
                                        }}
                                        key={el.id}
                                        value={el.id}
                                    >
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        {/* ------------------------------------------------------------ */}
                        <div>
                            <InputLabel>Состояние</InputLabel>
                            <Select
                                value={allvalue.status}
                                onChange={(e) => {
                                    setallvalue({
                                        ...allvalue,
                                        status: e.target.value,
                                    })
                                }}
                                style={textFieldstyle}
                            >
                                <MenuItem value="USED">Б/У</MenuItem>
                                <MenuItem value="NEW">Новое</MenuItem>
                            </Select>
                            <InputLabel>Подкатегория</InputLabel>
                            <Select
                                value={allvalue.subCategoryId}
                                onChange={(e) => {
                                    setallvalue({
                                        ...allvalue,
                                        subCategoryId: e.target.value,
                                    })
                                }}
                                style={textFieldstyle}
                            >
                                {subCategory &&
                                    subCategory.map((el) => (
                                        <MenuItem key={el.id} value={el.id}>
                                            {el.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </div>
                        {/* --------------------------------  --------------------- */}
                    </Questionaire>
                    <InputLabel style={TextAreaStyle}>
                        Описание подарка
                        <TextField
                            value={allvalue.description}
                            onChange={(e) => {
                                setallvalue({
                                    ...allvalue,
                                    description: e.target.value,
                                })
                            }}
                            InputProps={{
                                style: styles,
                            }}
                            variant="outlined"
                        />
                    </InputLabel>
                    {/* -------------------------  --------------------- */}
                    <Buttons>
                        <Button
                            onClick={() => window.history.back()}
                            variant="outlined"
                        >
                            Отмена
                        </Button>
                        <Button type="submit">Сохранить</Button>
                    </Buttons>
                </Container>
            </Anketa>
        </div>
    )
}
const styleForCard = {
    margin: '120px 30px 0 0',
}
const Questionaire = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 808px;
    border-radius: 10px;
`
const Container = styled('div')`
    height: auto;
    width: 808px;
`
const Buttons = styled('div')`
    display: flex;
    width: inherit;
    justify-content: right;
    margin-top: 50px;
    & button {
        margin: 10px;
    }
`
const textFieldstyle = {
    width: '396px',
    height: '35px',
    color: '#000',
    padding: '8px 18px',
    borderRadius: '6px',
    margin: '5px 0',
}
const InputLabelstyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '70px',
}
const TextAreaStyle = {
    display: 'flex',
    flexDirection: 'column',
}
const Anketa = styled('form')`
    display: flex;
    justify-content: space-around;
    max-width: 1086px;
    border-radius: 10px;
    margin: 30px 20px;
    padding: 20px;
    height: 871px;
    background-color: white;
`
const Title = styled('h1')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    align-items: center;
    letter-spacing: 0.2px;
`
const styles = {
    width: 'auto',
    height: '111px',
    borderRadius: '6px',
    alignItems: 'flex-start',
    padding: '8px 8px',
}
