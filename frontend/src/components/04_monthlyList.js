import React, {useState} from 'react';
import { BookStatic, Main } from '.';
import axios from 'axios';

function MonthlyList() {

    const [bookMode, setBookMode] = useState('image');
    const [wtg, setWtg] = useState('monthlyList');

    let today = new Date();

    const init = () =>{
        axios.post('http://172.30.1.14:4000/user/monthlyList', 
        {
            'id': sessionStorage.sessionId,
            'date': today
        }, 
        {
            withCredentials: true   //쿠키도 함께 서버로 req
        })
        .then(res => {
            if(res.data.msg != undefined){
                //res : {[bookimage]}
                //성공적으로 받는경우 : 화면에 display
            } else {
                alert(res.data.msg)
            }
        })
        .catch()
    }

    const onClickChangeMode = () =>{
        if(bookMode==='number'){
            //DB에서 date.month에 해당하는 bookimage를 로드해서 화면에 display
            setBookMode('image');
        }else if(bookMode==='image'){
            //DB에서 date에 해당하는 book을 count해서 date에 맞게 display
            setBookMode('number');
        }
    }

    const onClickBookStatic = () =>{
        setWtg('bookStatic');
    }

    const onClickBookGoal = () =>{
        //일단 bookGoal 페이지는 없음
        //popup(alert)으로 해결할 수 있다면 그렇게하는게 좋을듯.
        //DB action : bookGoal 값을 insert or update
        setWtg('bookGoal');
    }

    const onClickDate = () => {
        //sessionId, date를 함께 보냄
        //해당 date의 날짜의 data를 띄워줌
        setWtg('Main');
    }

    if(wtg==='bookStatic'){
        return(
            <BookStatic />
        )
    }else if(wtg==='bookGoal'){
        return(
            <div>
                goodGoal
            </div>
        )
    }else if(wtg==='Main'){
        return(
            <Main />
        )
    }else{
        return(
            <div>
                "MonthlyList"
            </div>   
        )
    }
    
}

export default MonthlyList;