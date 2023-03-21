import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const RegisterForm = () => {
    const { registerUser } = useContext(AuthContext)
    const [RegisterForm, setRegisterForm] = useState(
        {
            username: '',
            password: '',
            c_password: ''
        })
    // const history = useHistory()
    const { username, password, c_password } = RegisterForm
    const [alert, setAlert] = useState(null)
    const onChangerRegisterForm = event =>
        setRegisterForm({ ...RegisterForm, [event.target.name]: event.target.value })
    const Register = async event => {
        event.preventDefault()
        if (password !== c_password) {
            setAlert({ type: 'danger', message: 'Password not match' })
            setTimeout(() => {
                setAlert(null)

            }, 2000);
            return null
        }
        try {
            const registerData = await registerUser(RegisterForm)
            console.log(registerData)
            if (registerData.success) {
                // history.push('/dashboard')
                console.log('thanh cong')
            }
            else {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 2000)

            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <Form className='my-4' onSubmit={Register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control type='text' placeholder='Username' name='username' required value={username} onChange={onChangerRegisterForm}></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Control type='password' placeholder='Password' name='password' required value={password} onChange={onChangerRegisterForm}></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Control type='password' placeholder='Confirm Password' name='c_password' required value={c_password} onChange={onChangerRegisterForm}></Form.Control>
                </Form.Group>
                <br></br>
                <Button variant='success' type='submit'>Register</Button>
                <br></br>
                <br></br>
                <p>Already have an account?
                    &nbsp;
                    <Link to='/login'>
                        <Button variant='info' size='sm' className='ml-2'>To Login</Button>
                    </Link>
                </p>
            </Form>
        </>
    )
}

export default RegisterForm