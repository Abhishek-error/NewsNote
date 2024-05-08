import React, { useState } from 'react'
import NoteState from './Components/context/notes/NoteState';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar'
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Alert from './Components/Alert';
 
const App = (props)=> {

  const [progress, setProgress] = useState(0)
const [alert, setAlert] = useState(null)
const  pageSize = 5;
const showAlert = (message, type) =>{
  setAlert({
    msg: message,
    type: type
  })
  setTimeout(()=>{
    setAlert(null)
  }, 3000)
}
    return (
 <>
  <NoteState>
 <BrowserRouter>
 <Navbar/>
 <Alert alert={alert}/> 
 <LoadingBar
 height="3px"
 color='red'
 progress={progress}/>
 <Routes>
 
 <Route exact path='/'    element={<News key='' setProgress={setProgress} pageSize={pageSize} category="" country="in"/>} />
 <Route exact path='/general'    element={<News key='general' setProgress={setProgress} pageSize={pageSize} category="general" country="in"/>}/>
 <Route exact path='/health'    element={<News key='health' setProgress={setProgress} pageSize={pageSize} category="health" country="in"/>}/>
 <Route exact path='/business'    element={<News key='business' setProgress={setProgress} pageSize={pageSize} category="business" country="in"/>}/>
 <Route exact path='/entertainment'    element={<News key='entertainment' setProgress={setProgress} pageSize={pageSize} category="entertainment" country="in"/>}/>
 <Route exact path='/science'    element={<News key='science' setProgress={setProgress} pageSize={pageSize} category="science" country="in"/>}/>
 <Route exact path='/sports'    element={<News key='sports' setProgress={setProgress} pageSize={pageSize} category="sports" country="in"/>}/>
 <Route exact path='/technology'   element={<News key='technology' setProgress={setProgress} pageSize={pageSize} category="technology" country="in"/>}/>


<Route exact path='/note'  element={<Home showAlert={showAlert}/>}/>
<Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
<Route exact path='/signup'  element={<Signup showAlert={showAlert}/>}/>

 </Routes>
 
 </BrowserRouter>
 </NoteState>
</>
    )
  
}

export default App
