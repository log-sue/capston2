import React, { useState } from 'react';
import axios from 'axios';

function Join() {
    const [inputEmail, setInputEmail] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputName, setInputName] = useState('');

    const handleInputName = (e) => {
        setInputName(e.target.value)
    }
 
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
    // id, passwd = > msg
    // Success or failure errors are determined as msg
    const onClickJoin = () => {
        console.log("join됨")
        axios.post('http://localhost:4000/user/join', 
        {
            'email': inputEmail,
            'passwd': inputPw,
            'name' : inputName
        }, 
        {
            withCredentials: true
        })
        .then(res => {
            if(res.data.msg === undefined){
                alert('Success')
                document.location.href = '/'
            } else {
                alert(res.data.msg)
            }
            
        })
        .catch()
    }
 
    return(

        <main class="form-signin">
            <form>
                <input hidden="hidden" />
                <img class="mb-4" src="assets/login_logo.png" alt="" width="200" height="auto"/>
                <h1 class="h3 mb-3 fw-normal">Join</h1>
                <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name='input_id' value={inputEmail} onChange={handleInputEmail}/>
                <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name='input_pw' value={inputPw} onChange={handleInputPw}/>
                <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating">
                <input type="text" class="form-control" id="floatingName" placeholder="name" name='input_name' value={inputName} onChange={handleInputName}/>
                <label for="floatingPassword">Name</label>
                </div>
                <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" onClick={onClickJoin}>Join</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
        </main>
    )
}

export default Join;