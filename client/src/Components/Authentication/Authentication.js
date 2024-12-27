import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import './Authentication.css';


const Authentication = ()=> {
    let navigate = useNavigate();
    const [loginBtn, setLoginBtn] = useState("login")
    
    const [name, setName] = useState('')
    const renderUserName = ()=> {
        return(
            <>
                <label htmlFor='username' className='label'>
                    User Name
                </label>
                <input placeholder='Enter Your Name' 
                    id='username'
                    type='text' 
                    className='user-input'
                    onChange={(e)=> setName(e.target.value)}
                    value={name}>
                </input>
            </>
        )
    };

    const [email, setEmail] = useState('')
    const renderEmail = ()=> {
        return(
            <>
                <label className='label' htmlFor='email'>
                    Email
                </label>
                <input id='email'
                    type='email'
                    placeholder='Enter Your Email'
                    className='user-input'
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    >
                </input>
            </>
        )
    };

    const [phoneNumber, setPhoneNumber] = useState('')
    const renderPhoneNumber = ()=> {
        return(
            <>
                <label htmlFor='mobile' className='label'>Phone Number</label>
                <input id='mobile' 
                    type='text'
                    placeholder='Enter Mobile Number' 
                    className='user-input'
                    onChange={(e)=> setPhoneNumber(e.target.value)}
                    value={phoneNumber}>
                </input>
            </>
        )
    }

    const [gender, setGender] = useState('')
    const renderGender = ()=> {
        return(
            <>
                <label className='label' htmlFor='gender'>Gender</label>
                <input id='gender'
                    type='text'
                    placeholder='Enter Your Gender'
                    className='user-input'
                    onChange={(e)=> setGender(e.target.value)}
                    value={gender}>
                </input>
            </>
        )
    };

    const [jobDesignation, setJobDesignation] = useState('')
    const renderJobDesignation = ()=> {
        return(
            <>
                <label className='label' htmlFor='designation'>Job Designation</label>
                <input id='designation'
                    type='text'
                    placeholder='Enter Your Job Designation'
                    className='user-input'
                    onChange={(e)=> setJobDesignation(e.target.value)}
                    value={jobDesignation}>

                </input>
            </>
        )
    };

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const renderPassword = ()=> {
        return(
            <>
                <label className='label' htmlFor='pwd'>Password</label>
                <div className='d-flex justify-content-between align-items-center user-pwd-container'>
                    <div>
                        <input id='pwd'
                            className='user-pwd-input'
                            type={showPassword? 'text' : 'password'}
                            placeholder='Enter Your Password'
                            onChange={(e)=> setPassword(e.target.value)}
                            value={password}>
                        </input>
                    </div>
                    <div>
                        <button onClick={(()=>setShowPassword(!showPassword))} className='eye-btn' type='button'>
                            {showPassword? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                </div>
            </>
        )
    };

    const [errorMsg, setErrorMsg] = useState('')
    const [showSubmitError, setShowSubmitError] = useState(false)
    const onSubmitUserData = async (event)=> {
        event.preventDefault();

        if(loginBtn === 'login'){
            //login api call
            const url = "http://localhost:4005/auth/login"
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            };
            const response = await fetch(url, options)
            const data = await response.json()
            // console.log(data)
            if(response.ok === true){
                Cookies.set('jwtToken', data.token)
                navigate('/')
            }else{
                setShowSubmitError(true)
                setErrorMsg(data.message)
            }
        }
        else{
            //signup api
            if(password.length >= 8 && password.length <=16){
                const url = "http://localhost:4005/auth/signup"
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber,
                        gender: gender,
                        password: password,
                        designation: jobDesignation
                    })
                };
                const response = await fetch(url, options)
                const data = await response.json()
                if(response.ok === true){
                    setLoginBtn('login')
                    setErrorMsg('')
                }else{
                    setShowSubmitError(true)
                    setErrorMsg(data.message)
                }
            }
            else{
                setShowSubmitError(true)
                setErrorMsg('Password must contains 8 to 16 chars')
            }
        }
        setName('')
        setEmail('')
        setPhoneNumber('')
        setGender('')
        setPassword('')
        setJobDesignation('')
    }

    useEffect(()=> {
        let token = Cookies.get('jwtToken')
        // console.log(token)
        if(token !== undefined){
            navigate("/")
        }
    }, []);
    

    return(
        <div className='auth-container'>
            <div className='card-container'>
                <div className='website-logo-container'>
                    <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website logo' className='website-logo'></img>
                </div>
                <div className='text-center'>
                    <button className={loginBtn==='login'? 'main-btns' : 'main-btns btn-off'} onClick={()=> setLoginBtn('login')}>
                        Login
                    </button>
                    <button className={loginBtn==='signup'? 'main-btns': 'main-btns btn-off'} onClick={()=> setLoginBtn('signup')}>
                        SignUp
                    </button>
                </div>
                <form className='form-container' onSubmit={onSubmitUserData}>
                    <div className='input-container'>{ loginBtn==='signup'? renderUserName() : '' }</div>
                    <div className='input-container'>{ renderEmail() }</div>
                    <div className='input-container'>{ loginBtn === 'signup'? renderPhoneNumber() : '' }</div>
                    <div className='input-container'>{ loginBtn === 'signup'? renderGender() : '' }</div>
                    <div className='input-container'>{ renderPassword() }</div>
                    <div className='input-container'>{ loginBtn === 'signup'? renderJobDesignation() : ''}</div>
                    <div className='text-center my-3'>
                        <button type='submit' className='login-btn'>{loginBtn === 'login'? 'Login' : 'SignUp'}</button>
                    </div>
                    {showSubmitError && <p className='error-msg'>{errorMsg}</p>}
                </form>
            </div>
        </div>
    )
};

export default Authentication;