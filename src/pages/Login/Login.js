import React, {useState} from 'react'
import './index.css'

const Login = () => {
    //hardcoded login
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        console.log(e.target.id)
        if (e.target.id === 'user'){
        setUser(e.target.value);
        } else {
        setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user === '123' && password === '123'){
        console.log('Logged in');
        } else {
        console.log('Invalid credentials');
        }
    }

  return (
    <>
        <section>
            <div className=''>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >
                <label htmlFor={"user"}>
                    <input id='user' type='text' placeholder='Username' value={user} onChange={handleChange}/>
                </label>
                <label htmlFor={"password"}>
                    <input id='password' type='password' placeholder='Password' style={{ "-webkit-text-security": "square" }} value={password} onChange={handleChange}/>
                </label>
                <div>
                    <input type='submit' value='Login'/>
                </div>
            </form>
            </div>
        </section>
    </>
  )
}

export default Login