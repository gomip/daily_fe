import * as React from "react"
import {Route, Switch, useRouteMatch} from "react-router-dom"
import {QusPage} from "../page/qus/QusPage"
/**
 * 2021.03.11 | gomip | created
 * @constructor
 */

export const QusRoute: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const {path} = useRouteMatch()
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Switch>
       <Route exact path={`${path}/question`}>
         <QusPage />
       </Route>
    </Switch>
  )
}

export default QusRoute
