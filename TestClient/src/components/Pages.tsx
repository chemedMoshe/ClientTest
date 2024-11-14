import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import DispatchRoom from './ControlRoom'
import IdfRoom from './IdfRoom'

export default function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/controlroom" element={<DispatchRoom />} />
        <Route path="/idfroom" element={<IdfRoom />} />


      </Routes>
    </>
  )
}
