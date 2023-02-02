import React, { useState } from 'react'

import { styled } from '@mui/material'
import { useDispatch } from 'react-redux'

import Exit from '../../assets/icons/ExitModal.svg'
import { useInput } from '../../hooks/useInput'
import { passwordPost } from '../../store/slices/ProfileActions'

import BasicModal from './BasicModal'
import Button from './Button'
import InputPassword from './InputPassword'

const ChangePassword = ({ setChangePassword }) => {
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordIsValidHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.length >= 6)
    const {
        value: newPasswordValue,
        isValid: newPasswordIsValid,
        hasError: newPasswordIsValidHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler,
    } = useInput((value) => value.length >= 6)
    const {
        value: newPasswordValue2,
        isValid: newPasswordIsValid2,
        hasError: newPasswordIsValidHasError2,
        valueChangeHandler: newPasswordChangeHandler2,
        inputBlurHandler: newPasswordBlurHandler2,
    } = useInput((value) => value === newPasswordValue && value.length >= 6)

    const submitHandler = async () => {
        if (!passwordIsValid && !newPasswordIsValid && !newPasswordIsValid2) {
            return
        }
        const allPassword = {
            currentPassword: passwordValue,
            newPassword: newPasswordValue,
        }
        try {
            const result = await dispatch(passwordPost(allPassword)).unwrap()
            if (result) {
                setChangePassword(false)
            }
        } catch {
            setError('старый пароль  не правильный')
        }
    }
    return (
        <BasicModal open onClose={() => setChangePassword(false)}>
            <PasswordDiv>
                <ChangePasswordDiv>
                    <h3>Сменя пароля</h3>
                    <img
                        onClick={() => setChangePassword(false)}
                        src={Exit}
                        alt=""
                    />
                </ChangePasswordDiv>

                <InputsDiv>
                    <InputDiv>
                        <InputPassword
                            value={passwordValue}
                            error={passwordIsValidHasError}
                            name="oldPassword"
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            placeholder="Введите старый пароль"
                        />
                        {passwordIsValidHasError && (
                            <ErrorValidation>
                                пароль должен содержать не менее 6 символов
                            </ErrorValidation>
                        )}
                    </InputDiv>

                    <Inputs>
                        <InputDiv>
                            <InputPassword
                                value={newPasswordValue}
                                onChange={newPasswordChangeHandler}
                                name="newPassword"
                                onBlur={newPasswordBlurHandler}
                                placeholder="Введите новый пароль"
                            />
                            {newPasswordIsValidHasError && (
                                <ErrorValidation>
                                    пароль должен содержать не менее 6 символов
                                </ErrorValidation>
                            )}
                        </InputDiv>
                    </Inputs>
                    <InputDiv>
                        <InputPassword
                            value={newPasswordValue2}
                            onChange={newPasswordChangeHandler2}
                            name="newPassword2"
                            onBlur={newPasswordBlurHandler2}
                            placeholder="Повторите пароль"
                        />
                        {newPasswordIsValidHasError2 && (
                            <ErrorValidation>
                                пароль должен совпадать с предыдущим
                            </ErrorValidation>
                        )}
                        <ErrorValidation>{error}</ErrorValidation>
                    </InputDiv>

                    <ButtonDiv>
                        <Button onClick={submitHandler} variant="singUpButton">
                            Подвердите
                        </Button>
                    </ButtonDiv>
                </InputsDiv>
            </PasswordDiv>
        </BasicModal>
    )
}

export default ChangePassword
const PasswordDiv = styled('div')`
    width: 544px;
    height: 360px;
`
const ChangePasswordDiv = styled('div')`
    display: flex;
    img {
        margin-left: 300px;
    }
`
const InputsDiv = styled('div')`
    margin-left: 30px;
`
const Inputs = styled('div')`
    margin: 20px 0 20px 0;
`
const ButtonDiv = styled('div')`
    margin-top: 40px;
`
const ErrorValidation = styled('p')`
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #b40e0e;
    text-align: end;
`
const InputDiv = styled('div')`
    height: 40px;
`
