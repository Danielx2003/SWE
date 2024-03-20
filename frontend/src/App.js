import React, {useEffect, useState, createContext} from "react"

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import Splash from "./pages/Splash.jsx"
import Login from "./pages/Login.jsx"
import Logout from "./pages/Logout.jsx"
import Main from "./pages/Main.jsx"
import Forgot from "./pages/Forgot.jsx"
import Leaderboard from "./pages/Leaderboard.jsx"
import Admin from './pages/Admin.jsx'
import QRCreate from './pages/QRCreate.jsx'
import Congrats from "./pages/Congrats.jsx"
import Friends from "./pages/Friends.jsx"
import FriendRequests from "./pages/FriendRequests.jsx"
import FriendSearch from "./pages/FriendSearch.jsx"


//components
import Nav from "./components/Nav.jsx"

export const IPContext = createContext()

function App() {
  const [redirectQR, setRedirectQR] = useState({qr:false, route:"/main"})

  return (
    <div className="site-wrapper">
      <div className="spacer"></div>
      <BrowserRouter>
      <IPContext.Provider value={'localhost'}>
      <Nav/>
        <Routes>
          <Route
            path="/"
            element={<Splash />}
          />
          <Route
            path="/main"
            element={<Main />}
          />
          <Route
            path="/login"
            element={<Login redirectQR={redirectQR} />}
          />
          <Route
            path="/logout"
            element={<Logout/>}
          />
          <Route
            path="/forgot"
            element={<Forgot />}
          />
          <Route
            path="/leaderboard"
            element={<Leaderboard />}
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
            element={<Congrats setRedirectQR={setRedirectQR}/>}
          />
          <Route
            path="friends"
            element={<Friends/>}
          />
          <Route
            path="pending-friend-requests"
            element={<FriendRequests/>} FriendSearch
          />
          <Route
            path="friend-search"
            element={<FriendSearch/>}
          />
        </Routes>
        </IPContext.Provider>
      </BrowserRouter>
    </div>
  )
}
export default App;