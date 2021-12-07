import React , { useState } from 'react';
import { BookRecord, MonthlyList, Login } from '.';
import axios from 'axios';
//여기가 bookList.js

function Main(props) {

    //data를 전달받지 않은 경우(처음 실행하는 경우)에만 data에서 값을 받음.
    let today=new Date();

    let year=today.getFullYear();
    let month = today.getMonth();
    let date=today.getDate();

    const [state, setState] = useState(undefined);
    const [bookData, setBookdata] = useState(undefined);
    const [wtg, setWtg]=useState('main');

    const init = () =>{
        axios.post('http://172.30.1.14:4000/user/main', 
        {
            'id': sessionStorage.sessionId,
            'date': today
        }, 
        {
            withCredentials: true   //쿠키도 함께 서버로 req
        })
        .then(res => {
            if(res.data.msg != undefined){
                //res : bookImage, bookData 받기
                //성공적으로 받는경우 : 화면에 display
            } else {
                alert(res.data.msg)
            }
        })
        .catch()
    }

    const goMonthlyList = () =>{
        setWtg('monthlyList')
    }

    const onClickNewBook = () =>{
        setWtg('bookRecord')
    }
    const onclickListContent = () =>{
        //sessionId, bookId, bookData가 같이 전달되야함
        setWtg('bookRecord')
    }

    const onLogout = () => {
        sessionStorage.removeItem('sessionId');
        sessionStorage.removeItem('userEmail');

        setWtg('login')
    }

    if(wtg==='monthlyList'){
        return(
            <MonthlyList />
        )
    }else if(wtg==='bookRecord'){
        return(
            <BookRecord />
        )
    }else if(wtg==='login'){
        return(
            <Login/>
        )
    }else{
        return(
            //무조건 init이 먼저 실행되게 해야함. init에서 정보를 가지고 화면 표시
            <div>
                <button onClick={goMonthlyList}> M </button>
                <p align="center">
                    {year}.{month}. {date}
                </p>
                <table id="bookList" align="center" width="300px" height="500px">
                    <thead>
                        <tr>
                            <th align="center"> book list </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>
                            <table id="bookListContent" border="1">
                                <tbody>
                                    <tr>
                                        <td rowSpan="3" width="30%" height="99px">book image</td>
                                        <td height="33px"> book title</td>
                                    </tr>
                                    <tr>
                                        <td height="33px"> author</td>
                                    </tr>
                                    <tr>
                                        <td height="33px"> star</td>
                                    </tr>
                                </tbody>
                            </table>    
                        </td></tr>
                    </tbody>
                </table>
                <button onClick={onClickNewBook}>new book</button>
                <button onClick={onLogout}>logOut</button>
            </div>
        )
    }

}

export default Main;