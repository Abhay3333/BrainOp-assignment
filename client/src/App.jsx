import React from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import SignupScreen from './pages/SignupScreen'
import LoginScreen from './pages/LoginScreen'
import PostListScreen from './pages/PostScreen'
import Private from './Route/PrivateRoute'
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
   <>
   <Router>
    <Routes>
    <Route path='/register' element={<SignupScreen/>}/>
    <Route path='/login' element={<LoginScreen/>}/>
   <Route path='/' element={<Private/>}>
    <Route path='/post' element={<PostListScreen/>}/>
   </Route>
    </Routes>
   </Router>
   </>
  )
}

export default App