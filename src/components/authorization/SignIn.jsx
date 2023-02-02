import React, { useState } from 'react'

import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import Exit from '../../assets/icons/ExitModal.svg'
import Google from '../../assets/icons/google.svg'
import { useInput } from '../../hooks/useInput'
import { googleAuthorization } from '../../store/slices/GoogleAuthorization'
import { singInActions } from '../../store/slices/SignInActions'
import BasicModal from '../ui/BasicModal'
import Button from '../ui/Button'
import Input from '../ui/Input'
import InputPassword from '../ui/InputPassword'

const SingIn = ({ setSignInState }) => {
    const [memorize, setMemorize] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const signInHandler = () => {
        setSignInState(false)
    }

    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailIsValidHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => value.includes('@'))
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordIsValidHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim() !== '')
    const submitHandler = async (e) => {
        e.preventDefault()
        if (!emailIsValid && !passwordIsValid) {
            // eslint-disable-next-line no-useless-return
            return
        }
        if (emailValue.trim() !== '' && passwordValue.trim() !== '') {
            const userData = {
                email: emailValue,
                password: passwordValue,
            }
            dispatch(singInActions({ userData, setError, memorizee: memorize }))
        }
    }

    const googleHandler = () => {
        dispatch(googleAuthorization(memorize))
    }

    return (
        <BasicModal open onClose={signInHandler}>
            <SignInForm onSubmit={submitHandler}>
                <InputDiv>
                    <h4>Вход</h4>
                    <img onClick={signInHandler} src={Exit} alt="" />
                </InputDiv>
                <InputDivForm>
                    <Div>
                        <Input
                            error={emailIsValidHasError}
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            type="email"
                            placeholder="Email"
                        />
                        <ErrorValidation>{error}</ErrorValidation>
                        {emailIsValidHasError && (
                            <ErrorValidation>
                                введите действительную электронную почту
                            </ErrorValidation>
                        )}
                    </Div>
                    <Div>
                        <InputPassword
                            error={passwordIsValidHasError}
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Div>

                    <DivRemember onClick={() => setMemorize(!memorize)}>
                        <input type="checkbox" />
                        <p>Запомнить меня</p>
                    </DivRemember>
                </InputDivForm>
                <div>
                    <Button type="submit" variant="singUpButton">
                        Войти
                    </Button>
                </div>
                <div>
                    <ForgotPassword>Забыли пароль?</ForgotPassword>
                    <OrDiv>
                        <Line1 />
                        <Or>или</Or>
                        <Line2 />
                    </OrDiv>
                    <GoogleDiv onClick={googleHandler}>
                        <img src={Google} alt="" /> Продолжить с Google
                    </GoogleDiv>
                    <ToComeInDiv>
                        <p>Нет аккаунта?</p>
                        <button>Зарегистрироваться</button>
                    </ToComeInDiv>
                </div>
            </SignInForm>
        </BasicModal>
    )
}

export default SingIn
const SignInForm = styled('form')`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`

const InputDiv = styled('div')`
    display: flex;
    width: 482px;
    justify-content: space-between;
    height: 32px;
    h4 {
        margin-top: 0px;
        font-family: 'Inter', sans-serif;
    }
`
const InputDivForm = styled('div')`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
`
const DivRemember = styled('div')`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #87898e;
    font-family: 'Inter', sans-serif;
    flex: none;
    order: 1;
    flex-grow: 0;
    display: flex;
`
const OrDiv = styled('div')`
    display: flex;
`

const Or = styled('div')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    font-family: 'Inter', sans-serif;
    color: #23262f;
    text-align: center;
    margin-top: 5px;
`
const Line1 = styled('hr')`
    border: 1px solid #f1f1f1;
    width: 206.5px;
    height: 0px;
`
const Line2 = styled('hr')`
    border: 1px solid #f1f1f1;
    width: 206.5px;
    height: 0px;
`
const ForgotPassword = styled('p')`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-align: center;

    color: #3772ff;

    flex: none;
    order: 0;
    flex-grow: 0;
`
const GoogleDiv = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 19px;
    margin-top: 15px;

    width: 482px;
    height: 39px;
    border: none;
    background: #f1f1f1;
    border-radius: 6px;

    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;

    color: #23262f;
    cursor: pointer;
`
const ToComeInDiv = styled('div')`
    display: flex;
    justify-content: center;
    margin-top: 14px;
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
    }
    button {
        border: none;
        background: none;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #3772ff;
    }
`
const ErrorValidation = styled('p')`
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #b40e0e;
    text-align: end;
`
const Div = styled('div')`
    height: 40px;
`
