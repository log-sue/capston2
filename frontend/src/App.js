import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { Init, Login, Main } from './components'

function App () {
  //app.js에서 사용하는 isLogin state 선언
  const [isLogin, setIsLogin] = useState(false);
  
  // check login logic
  // validate sessionId stored browser & sessionId in server
  // When verification is complete, set isLogin to true and get the timetable value
  // userId, sessionId => msg, timeTable
  // Login is determined by msg, timeTable is json format data
  useEffect(() => {
    if(sessionStorage.getItem('sessionId') != null){
      axios.post('http://localhost:4000/user/isLogin',
      {
        //서버에 저장된 userId와 sessionId를 불러옴
        'userEmail': sessionStorage.getItem('userEmail'), 
        'sessionId': sessionStorage.getItem('sessionId')
      },
      {
        withCredentials: true
      })
      .then(res => {
        if (res.data.msg===undefined){
          setIsLogin(true)
        }else{
          alert(res.data.msg)
          sessionStorage.removeItem('sessionId')
        }
      })
      .catch(
        //error logic
      )
    }
  },[])

  // If login is not successful, the init page is displayed.
  if (!isLogin) {

    // select css file
    document.getElementById('style-direction').href = '/css/init.css'

    // add body class
    document.getElementById('root').className = 'text-center';

    // return login page
    return <Login />;
  }
  else{

    // select css file
    document.getElementById('style-direction').href = '/css/main.css'

    // add body class
    document.getElementById('root').className = 'text-center';

    // return main
    return <Main />;
  }

}

export default App;
