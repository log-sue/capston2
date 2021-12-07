import React, {useState} from 'react';
import {Main} from '.';
import axios from 'axios';

function BookRecord(){
    //Main(bookList)에서 받은 data가 있는 경우 -> bookRecord 양식에 data를 표현해서 display
    //받은 data가 없는 경우(onClickNewBook에 의해서 실행되는 경우) -> 가능하도록 만듬
    
    const [state, setState]=useState('')
    let bookAuthor;
    let bookStar;
    let bookName;
    let bookContent;


    const [bookImage, setbookImage] = useState(null);

    const handleInputImage = (e) => {
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setbookImage(imageUrl)
    }

    const handleInputAuthor = (e) =>{
        //값을 받아서 변수에 저장
        bookAuthor = e.target.value
    }

    const handleInputStar = (e) =>{
        //값을 받아서 변수에 저장
        bookStar = e.target.value
    }

    const handleInputName = (e) =>{
        //값을 받아서 변수에 저장
        bookName = e.target.value
    }

    const handleInputContent = (e) =>{
        //값을 받아서 변수에 저장
        bookContent = e.target.value
    }



    const onClickmakePDF = () =>{
        //PDF를 만드는 API연동
    }

    const onClickBookImage = () =>{
        //앨범에서 가지고 오는 경우
        //카메라를 사용하는 경우 -> 바코드 API를 이용(국립중앙도서관API) or 책 이미지를 직접찍음
        //DB에 이미지 저장
    }

    const onClickSave = () =>{
        //book
        axios.post('http://localhost:4000/user/save', 
        {
            'bookImage': bookImage,
            'bookName': bookName,
            'bookAuthor' : bookAuthor,
            'bookStar' : bookStar,
            'bookContent' : bookContent
        }, 
        {
            withCredentials: true
        })
        .then(res => {
            if(res.data.msg === undefined){
                alert('saved')
                document.location.href = '/'
            } else {
                alert(res.data.msg)
            }
            
        })
        .catch()
    }


    const onclickgoBack = () =>{
       //sessionId를 data와 함께 보냄
       setState('main')
    }

    if(state==='main'){
        return(
            <Main/>
        )
    }else{
        return(
            <section>
                <div class="form-container align-self-center">
                <div class="row">
                    <div class="col-sm-4">
                        <img src={bookImage} class="img-thumbnail" id="bookImage"></img>
                    </div>
                    <div class="col-sm-8 align-self-center">
                        <form method="post">
                            <div class="mb-3"></div>
                            <input class="form-control" type="file" onChange={handleInputImage} />
                            <input class="form-control" type="text" onChange={handleInputAuthor} placeholder="작가"/>
                            <input class="form-control" type="text" onChange={handleInputName} placeholder="제목"/>
                            <input class="form-control" type="text" onChange={handleInputStar}placeholder="평가"/>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                            <div class="mb-3"></div>
                        </form>
                    </div>
                </div>
                </div>

                <textarea class="form-control" rows="7" onChange={handleInputContent}></textarea>
                <button class="w-100 btn btn-lg btn-primary" type='button' onClick={onClickSave}> 저장 </button>
                <button class="w-100 btn btn-lg btn-primary" type='button'> 뒤로가기 </button>
            </section>

        )
    }
}
    

export default BookRecord;