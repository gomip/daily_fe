import * as React from "react"
import "../static/style/main.scss"
import {useHistory, useLocation} from "react-router-dom"
import {useStoreActions, useStoreState} from "../store/hooks"

/**
 * 2021.03.10 | gomip | created
 * @constructor
 * 2021.03.15 | gomip | Daily 텍스트 클릭시 홈으로 이동
 */

const {useState, useEffect} = React
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

export const Header: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const uri = "http://localhost:3001/login"
  const history = useHistory()
  const location = useLocation()
  // const session = useStoreState(state => state.session.session)
  // const removeSession = useStoreActions(actions => actions.session.removeSession)
  const today = moment().format('YYYY-MM-DD')

  // LifeCycle ---------------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   if (session) {
  //     if (today.toString() !== moment.unix(session && session!.iat).format('YYYY-MM-DD')) {
  //       removeSession()
  //       setIsLoggedIn(false)
  //       history.push('')
  //     }
  //   }
  // }, [location])
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
                href={`http://localhost:5001?redirect_uri=${uri}`}
              >
                Login
              </a>
            </div>
        }
      </div>
    </header>
  )
}
