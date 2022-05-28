import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginRouter from "./pages/login"
import RegisterRouter from "./pages/register"
import SecretRouter from "./pages/secret"
import Header from "./components/header"
import { useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function App() {
  // const navigate = useNavigate();
  // const params = useLocation()
  // const [cookies, setCookie, removeCookie] = useCookies([])
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if(params.pathname == '/register' || params.pathname == '/login') return
  //     if(!cookies.jwt) {
  //       navigate("/login")
  //     } else {
  //       await fetch('http://localhost:9000/db/checkuser', {
  //       method: 'post',
  //       credentials: 'include'
  //     })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if(!res.status) {
  //         removeCookie("jwt")
  //         this.props.navigate("/login")
  //       } else {
  //         navigate("/main")
  //       }
  //     })
  //     .catch((err) => err)
  //     }
  //   }
  //   verifyUser();
  // }, [cookies, navigate, removeCookie]
  // )

  return (
    <>
    <Header />
      <Routes>
        <Route exact path="/register" element={<RegisterRouter />} />
        <Route exact path="/login" element={<LoginRouter />} />
        <Route exact path="/" element={<SecretRouter />} />
      </Routes>
    </>  
  )
}
