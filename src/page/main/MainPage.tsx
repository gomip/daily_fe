import * as React from "react"
import {Button} from "react-bootstrap"
import {useHistory} from "react-router-dom"
import {BasePage} from "../../component/BasePage"
import {Header} from "../../component/Google/Header"
import {isValidSession} from "../../store/Session/model"
import {useStoreState} from "../../store/hooks"
import {Dashboard} from "../com/dashboard/Dashboard"
/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React
export const MainPage: React.FC = () => {
  // Store State -------------------------------------------------------------------------------------------------------
  const session = useStoreState(state => state.session.session)
  // State -------------------------------------------------------------------------------------------------------------
  const history = useHistory()
  const uri = "http://localhost:3001/login"
  const [isLoggedIn, setIsLoggedIn] = useState(isValidSession(session))
  // Function ----------------------------------------------------------------------------------------------------------
  // const handleGoogleSignUp = () => {
  //   const path = '/auth/GOOGLE'
  //   history.push(path)
  // }
  // Dom ---------------------------------------------------------------------------------------------------------------
  console.log('isLoggedIn', isLoggedIn)
  return (
    <BasePage>
      {
        isLoggedIn ?
          <Dashboard />
          :
          <div className="title-container">
            <a href={`http://localhost:5001?redirect_uri=${uri}`}>구글 로그인</a>
          </div>
      }
    </BasePage>
  )
}
