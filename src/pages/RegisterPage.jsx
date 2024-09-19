import React, { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
const RegisterPage = () => {
    const { handleUserRegister } = useAuth()
    const [credentials, setCredential] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })
    const handleInputChange = (e) => {

        let name = e.target.name
        let value = e.target.value
        setCredential({ ...credentials, [name]: value })
        console.log(credentials)
    }
    return (
        <div className='auth--container'>
            <div className='form--wrapper'>
                <form onSubmit={(e) => handleUserRegister(e, credentials)}>
                    <div className='field--wrapper'>
                        <label htmlFor="">Name:</label>
                        <input
                            type="text"
                            required
                            name='name'
                            placeholder='Enter your name...'
                            value={credentials.name}
                            onChange={handleInputChange}
                        />
                    </div>
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
                            name='password1'
                            placeholder='Enter your password ...'
                            value={credentials.password1}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='field--wrapper'>
                        <label htmlFor="">Confirm Password:</label>
                        <input
                            type="password"
                            required
                            name='password2'
                            placeholder='Enter your password again...'
                            value={credentials.password2}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='field-wrapper'>
                        <input type='submit' className="btn btn--lg btn--main" value='submit' />
                    </div>

                </form>
                <p>
                    Already have an account ? Login <Link to='/login'>here</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage
