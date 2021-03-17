import * as React from "react"
import {Nav, Navbar} from "react-bootstrap"
import "../static/style/main.scss"

/**
 * 2021.03.10 | gomip | created
 * @constructor
 * 2021.03.15 | gomip | Daily 텍스트 클릭시 홈으로 이동
 */

const {useState, useEffect} = React

export const Header: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <header id="header">
      <div className="header-container">
        <div className="logo">
          <a href="/#">Daily</a>
        </div>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {
          isLoggedIn ?
            <div className="header-menu">
              <a href="/qus/question" className="header-loggedin">Question</a>
              <a href="/#" className="header-loggedin">Dashboard</a>
              <a href="/#" className="header-loggedin">Job</a>
              <a href="/#" className="header-loggedin">My Page</a>
            </div>
            :
            <div className="header-menu">
              <a
                href="/#"
              >
                Login
              </a>
            </div>
        }
      </div>
    </header>
  )
}
