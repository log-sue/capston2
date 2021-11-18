import React , {useState} from 'react';

import { Join, Login } from './';

function Init() {
    
    const [state, setState] = useState('init')

    // Change state to join when button is clicked
    const onClickJoin = () => {
        setState('join')
    }

    // Change state to login when button is clicked
    const onClickLogin = () => {
        setState('login')
    }

    if(state === 'join'){
        return <Join />;
    }
    else if(state === 'login'){
        return <Login />;
    }
    else{
        return(
            <main class="form-signin">
            <img class="mb-4" src="assets/login_logo.png" alt="" width="200" height="auto"/>
            <h1 class="h3 mb-3 fw-normal">Login or Join</h1>
            <button class="w-100 btn btn-lg btn-primary" onClick={onClickJoin}>Join</button>
            <button class="w-100 btn btn-lg btn-success" onClick={onClickLogin}>Login</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </main>
        )
    }
    
}
export default Init;