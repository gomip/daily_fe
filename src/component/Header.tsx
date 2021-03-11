import * as React from "react"
import {Nav, Navbar} from "react-bootstrap"
import "../static/style/main.scss"

/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React

export const Header: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <header id="header">
      <Navbar expand="md" className="header-container">
        <Navbar.Brand className="logo">Daily</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {
          isLoggedIn ?
            <Nav className="header-menu">
              <Nav.Link href="#" className="header-loggedin">로그인됨</Nav.Link>
              <Nav.Link href="#" className="header-loggedin">로그인됨</Nav.Link>
              <Nav.Link href="#" className="header-loggedin">로그인됨</Nav.Link>
              <Nav.Link href="#" className="header-loggedin">로그인됨</Nav.Link>
            </Nav>
            :
            <Nav className="header-menu">
              <Nav.Link
                href="#"
              >
                로그인
              </Nav.Link>
            </Nav>
        }
      </Navbar>
    </header>
  )
}
