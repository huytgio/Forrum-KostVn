import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
    const { loginUser } = useContext(AuthContext)
    const [LoginForm, setLoginForm] = useState(
        {
            username: '',
            password: ''
        })
    // const history = useHistory()
    const { username, password } = LoginForm
    const [alert, setAlert] = useState(null)
    const onChangerLoginForm = event =>
        setLoginForm({ ...LoginForm, [event.target.name]: event.target.value })
    const Login = async event => {
        event.preventDefault()
        try {
            const loginData = await loginUser(LoginForm)
            console.log(loginData)
            if (loginData.success) {
                // history.push('/dashboard')
                console.log('thanh cong')
            }
            else {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 2000)

            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <Form className='my-4' onSubmit={Login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control type='text'
                        placeholder='Username'
                        name='username' required
                        value={username}
                        onChange={onChangerLoginForm}></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Control type='password'
                        placeholder='Password'
                        name='password' required
                        value={password}
                        onChange={onChangerLoginForm}></Form.Control>
                </Form.Group>
                <br></br>
                <Button variant='success' type='submit'>Login</Button>
                <br></br>
                <br></br>
                <p>Don't have an account?
                    &nbsp;
                    <Link to='/register'>
                        <Button variant='info' size='sm' className='ml-2'>Register Now!</Button>
                    </Link>
                </p>
            </Form>
        </>

    )
}

export default LoginForm