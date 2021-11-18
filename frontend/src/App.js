import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { Init, Main } from './components'

function App () {
  const [isLogin, setIsLogin] = useState(false)
  const [timeTable, setTimeTable] = useState(null)

  // check login logic
  // validate sessionId stored browser & sessionId in server
  // When verification is complete, set isLogin to true and get the timetable value
  // userId, sessionId => msg, timeTable
  // Login is determined by msg, timeTable is json format data
  useEffect(() => {
    if(sessionStorage.getItem('sessionId') != null){
      axios.post('http://172.30.1.14:4000/user/isLogin',
      {
        'userId': sessionStorage.getItem('userId'), 
        'sessionId': sessionStorage.getItem('sessionId')
      },
      {
        withCredentials: true
      })
      .then(res => {
        if(res.data.msg === undefined){
          setIsLogin(true)
          setTimeTable(res.data.timeTable);
        } else {
          alert(res.data.msg)
          sessionStorage.removeItem('id')
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

    // return init
    return <Init />;
  }
  else{

    // If you are logged in, wait until the timeTable is all loaded, then put the timetable on the main page and open it.
    if (!timeTable) return <div>Loading...</div>

    // select css file
    document.getElementById('style-direction').href = '/css/main.css'

    // add body class
    document.getElementById('root').className = 'text-center';

    // return main
    return <Main timeTable={timeTable}/>;
  }

}

export default App;
