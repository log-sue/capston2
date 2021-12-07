import React, { useState } from 'react';
import { Join, MonthlyList, Main } from '.';
import axios from 'axios';

// 함수의 리턴은 한 번에 하나만...
 
function Login() {
    const [inputEmail, setInputEmail] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [wtg, setWtg] = useState('login')
 
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    // id, passwd => msg, userId, sessionId
    // Success or failure errors are determined as msg, and the session ID and user ID are stored in the session storage, and used for user authentication.
    const onClickLogin = () => {
        axios.post('http://localhost:4000/user/login', 
        {
            //서버로 입력받은 id와 pw를 req
            'email': inputEmail,
            'userPw': inputPw
        }, 
        {
            withCredentials: true   //쿠키도 함께 서버로 req
        })
        .then(res => {
            if(res.data.msg === undefined){
                alert(res.data.userEmail + '님 환영합니다')
                sessionStorage.setItem('userEmail', res.data.userEmail)
                sessionStorage.setItem('sessionId', res.data.sessionId)
                setWtg('main')
            } else {
                alert(res.data.msg)
            }
        })
        .catch()
    }

    const onClickJoin = () =>{
        console.log("join 버튼 누름!!!");
        setWtg('join');
    }

    if(wtg === 'join'){
        return <Join />
    }else if(wtg==='main'){
        return <Main />
    } else {
        return(

            <main class="form-signin">
                <form>
                    <input hidden="hidden" />
                    <img class="mb-4" src="assets/login_logo.png" alt="" width="200" height="auto"/>
                    <h1 class="h3 mb-3 fw-normal">Login</h1>
                    <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='input_email' value={inputEmail} onChange={handleInputEmail}/>
                    <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='input_pw' value={inputPw} onChange={handleInputPw}/>
                    <label for="floatingPassword">Password</label>
                    </div>
                    <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickLogin}>Login</button>
                    <button class="w-100 btn btn-lg btn-primary" onClick={onClickJoin}>Join</button>
                    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        )
    }
}
    
 
export default Login;