import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BoardList from './BoardList';
import Write from './Write';
import View from './View';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App(){
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isComplete, setIsComplete] = useState(true);
  const [boardId, setBoardId] = useState(0);
  const [redirecToWrite, setRedirecToWrite] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleModify = (checkList) => {
    if (checkList.length === 0) {
      alert('수정할 게시글을 선택하세요');
    } else if (checkList.length > 1) {
      alert('하나의 게시글만 선택하세요');
    } else{
      setIsModifyMode(true);
      setBoardId(checkList[0]);
      setRedirecToWrite(true);
    }
  }

  const handleCancel = () => {
    setIsModifyMode(false);
    setIsComplete(false);
    setBoardId(0);
    setRedirectToHome(true);
  }

  useEffect(()=>{
    if(redirectToHome) setRedirectToHome(false);
    if(redirecToWrite) setRedirecToWrite(false);
  },[redirecToWrite,redirectToHome])

  return(
    <BrowserRouter>
      <div className="container">
        <h1>React Board</h1>
        {redirecToWrite && <Navigate to="/write"  />} 
        {redirectToHome && <Navigate to="/"  />} 
        <Routes>
          <Route path="/" element={<BoardList isComplete={isComplete} handleModify={handleModify} />} />
          <Route path="/write" element={<Write 
            isModifyMode={isModifyMode}
            boardId={boardId}
            handleCancel={handleCancel}
          />}
          />
          <Route path="/view/:id" element={<View/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App;