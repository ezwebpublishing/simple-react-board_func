import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import { useParams, useNavigate} from "react-router-dom";


const View = ()=>{
  const [board, setBoard] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(()=>{
    console.log('useEffect 실행');
    Axios.get(`http://localhost:8000/detail?id=${id}`)
    .then((res) => {
      const {data} = res;  
      console.log(data);
      setBoard({
        title:data[0].BOARD_TITLE,
        content: data[0].BOARD_CONTENT,
        image : data[0].IMAGE_PATH
      });
    })
    .catch((e)=> {
      // 에러 핸들링
      console.log(e);
    });     
  },[id]);

  console.log(board);

  if(!board) return <div>Loading...</div>;

  return(
    <div>
      <h2>{board.title}</h2>
      <h2>본문</h2>      
      {board.content}
      <img src={`http://localhost:8000/${board.image}`} style={{maxWidth:'300px'}}/>
      <hr/>
      <Button variant="secondary" onClick={()=>{navigate(-1)}}>목록</Button>  
    </div> 
  )
}
export default View;
