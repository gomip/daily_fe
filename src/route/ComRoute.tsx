import * as React from "react"
import {Route, Switch, useRouteMatch} from "react-router-dom"
import {MainPage} from "../page/main/MainPage"
import {Dashboard} from '../page/com/dashboard/Dashboard'
/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

export const ComRoute: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const {path} = useRouteMatch()
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Switch>
      <Route path="/">
        <MainPage />
      </Route>
    </Switch>
  )
}

export default ComRoute
