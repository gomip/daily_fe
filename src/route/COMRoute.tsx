import * as React from "react"
import {Switch, useRouteMatch} from "react-router-dom"
import {MainPage} from "../page/main/MainPage"
/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

export const COMRoute: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const {path} = useRouteMatch()
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Switch>
      {/* <PrivateRoute> */}
        <MainPage />
      {/* </PrivateRoute> */}
    </Switch>
  )
}

export default COMRoute
