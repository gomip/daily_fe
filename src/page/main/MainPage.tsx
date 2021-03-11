import * as React from "react"
import {Button} from "react-bootstrap"
import {BasePage} from "../../component/BasePage"

/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

export const MainPage: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <BasePage>
      <div className="title-container">
        <Button>Sign up</Button>
      </div>
    </BasePage>
  )
}
