import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ExamInterface from './components/Exam/ExamInterface'
import Results from './components/Results'


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/login" />
}


function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exam" element={
                <PrivateRoute>
                  <ExamInterface />
                </PrivateRoute>
              } 
            />

            <Route path="/results" element={
                <PrivateRoute>
                  <Results />
                </PrivateRoute>
              }
            />

            <Route path="/" element={<Navigate to="/login" />} /> 
            
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
