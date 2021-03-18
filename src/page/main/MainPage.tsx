import * as React from "react"
import {Button} from "react-bootstrap"
import {useHistory} from "react-router-dom"
import {BasePage} from "../../component/BasePage"
/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

export const MainPage: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const history = useHistory()
  const uri = "http://localhost:3001/login"
  // Function ----------------------------------------------------------------------------------------------------------
  const handleGoogleSignUp = () => {
    const path = '/auth/GOOGLE'
    history.push(path)
  }
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <BasePage>
      <div className="title-container">
        <Button
          variant="primary"
          onClick={handleGoogleSignUp}
        >
          Sign up
        </Button>
        {/*<a href={"http://localhost:5001/oauth2/authorize/google?redirect_uri=" + uri}>구글 로그인</a>*/}
        <a href={"http://localhost:5001?redirect_uri=" + uri}>구글 로그인</a>
      </div>
    </BasePage>
  )
}
