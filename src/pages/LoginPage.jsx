import React, { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const LoginPage = () => {
    const { user, handleUserLogin } = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredential] = useState({
        email: '',
        password: ''
    })
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])
    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setCredential({ ...credentials, [name]: value })
        console.log(credentials)
    }
    return (
        <div className='auth--container'>
            <div className='form--wrapper'>
                <form onSubmit={(e) => handleUserLogin(e, credentials)}>
                    <div className='field--wrapper'>
                        <label htmlFor="">Email:</label>
                        <input
                            type="email"
                            required
                            name='email'
                            placeholder='Enter your email ...'
                            value={credentials.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='field--wrapper'>
                        <label htmlFor="">Password:</label>
                        <input
                            type="password"
                            required
                            name='password'
                            placeholder='Enter your password ...'
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='field-wrapper'>
                        <input type='submit' className="btn btn--lg btn--main" value='submit' />
                    </div>

                </form>
                <p>
                    Don't have an account ? Register <Link to='/register'>here</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
