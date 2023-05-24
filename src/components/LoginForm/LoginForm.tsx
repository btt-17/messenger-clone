import './LoginForm.css';
import React, {useState} from 'react';
import {ReactComponent as MessengerLogo} from '../assests/facebook-messenger-logo-svgrepo-com.svg'
import api from '../api';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';

function LoginForm() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || "false"));
    const navigate = useNavigate();


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await api.post('/api/login', {
            mail: userEmail,
            password: userPassword,
            withCredentials: true,
        })

        let userData = JSON.parse(res.data.data);


        if (res.data.status === "successfully") {
            setUserEmail("");
            setUserPassword("");
            setAuthenticated("true");
            
            localStorage.setItem("authenticated","true");
            localStorage.setItem("userid", userData[0].id);
            localStorage.setItem("username", userData[0].username);
            
            console.log(localStorage.getItem("userid"));
            console.log(localStorage.getItem("username"));
            navigate("/");
        }
    }

    return (
        <div className='login-page'>
            <h1 className='app-name'>
                < MessengerLogo className='app-logo'/>
                Messenger
            </h1>
            <form className="login-form" onSubmit={handleSubmit}> 
                <h2>Sign in to your account</h2>

                <div className="form-outline">
                    <div>Your email</div>
                    <input type="email" placeholder='youremail@gmail.com' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required></input>
                </div>

                <div className="form-outline">
                    <div>Your password</div>
                    <input type="password" placeholder='********' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}required></input>
                </div>

                <div className="container">
                    <div className="remember-check">
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>
                    <div>
                        <a href="">Forgot password?</a>
                    </div>
                        
                </div>

             
                <button type="submit" className="login-button">
                    Login
                </button>
          

                <div className="signup-link"> 
                    Don't have an account yet? &nbsp; 
                    <a href="">Sign up</a>
                </div>

            </form>
      
        </div>
  
    )
}

export default LoginForm;
