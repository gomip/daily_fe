import * as React from "react"
import "../../static/style/main.scss"
import {useHistory, useLocation} from "react-router-dom"
import {useStoreActions, useStoreState} from "../../store/hooks"
import {isValidSession} from "../../store/Session/model"
import service from "./Auth/service"

/**
 * 2021.03.10 | gomip | created
 * @constructor
 * 2021.03.15 | gomip | Daily 텍스트 클릭시 홈으로 이동
 */

const {useState, useEffect} = React
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

export const Header: React.FC = () => {
  // Store State -------------------------------------------------------------------------------------------------------
  const session = useStoreState(state => state.session.session)
  const isDictLoaded = useStoreState(state => state.dictionary.isLoaded)

  // Store Action ------------------------------------------------------------------------------------------------------
  const removeSession = useStoreActions(actions => actions.session.removeSession)
  const fetchDictionary = useStoreActions(actions => actions.dictionary.fetchDictionary)

  // State -------------------------------------------------------------------------------------------------------------
  const uri = "http://localhost:3001/login"
  const history = useHistory()
  const location = useLocation()
  const today = moment().format('YYYY-MM-DD')
  const [isLoggedIn, setIsLoggedIn] = useState(isValidSession(session))

  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (session) {
      if (today.toString() !== moment.unix(session && session.iat).format('YYYY-MM-DD')) {
        removeSession()
        setIsLoggedIn(false)
        history.push('')
      }
    }
  }, [location])

  useEffect(() => {
    if (isLoggedIn) {
      if (!isDictLoaded) {
        fetchDictionary()
      }
    } else {
      // eslint-disable-next-line no-unused-expressions
      isValidSession(session) ? getVerify() : setIsLoggedIn(false)
    }
  }, [session, isLoggedIn])
  // Function ----------------------------------------------------------------------------------------------------------
  const getVerify = async () => {                                                                                       // 유효한 토큰인지 확
    const isVerify = await service.verifyTokenUsingGET(
      session && session.token,
      session && session.token
    )
    const res = isVerify.data === 'Y'
    setIsLoggedIn(res)
  }

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <header id="header">
      <div className="header-container">
        <div className="logo">
          <a href="/dashboard">Daily</a>
        </div>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {
          isLoggedIn ?
            <div className="header-menu">
               <a href="/qus/question" className="header-loggedin">Question</a>
              {/* <a href="/#" className="header-loggedin">Job</a> */}
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
