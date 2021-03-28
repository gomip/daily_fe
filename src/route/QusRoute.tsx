import * as React from "react"
import {Route, Switch, useRouteMatch} from "react-router-dom"
import {QusPage} from "../page/qus/QusPage"
import {QusDetail} from "../page/qus/QusDetail"
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
      <Route exact path={`${path}`}>
        <QusPage />
      </Route>
      <Route path={`${path}/:id`}>h
        <QusDetail />
      </Route>
    </Switch>
  )
}

export default QusRoute
