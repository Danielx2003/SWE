import React, {useState} from "react"
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Splash from "./pages/Splash.jsx"
import Login from "./pages/Login.jsx"
import Main from "./pages/Main.jsx"
import Forgot from "./pages/Forgot.jsx"

import Admin from './pages/Admin.jsx'
import QRCreate from './pages/QRCreate.jsx'
import Congrats from "./pages/Congrats.jsx"

//components
import Nav from "./components/Nav.jsx"

function App() {
  const [redirectQR, setRedirectQR] = useState({qr:false, route:"/main"})

  return (
    <div className="site-wrapper">
      <div className="spacer"></div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Splash />}
          />
          <Route
            path="/login"
            element={<Login 
              redirectQR={redirectQR}
            />}
          />
          <Route
            path="/main"
            element={<Main />}
          />
          <Route
            path="/forgot"
            element={<Forgot />}
          />
          <Route
              path="/admin"
              element={< Admin />}
          />
          <Route
              path="/admin/create"
              element={< QRCreate />}
              />
          <Route 
            path="/qr"
            element={<Congrats
              setRedirectQR={setRedirectQR}
            />}
          />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;