import * as React from "react"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainPage} from "./page/main/MainPage"
import {Header} from "./component/Header"
import {QusRoute} from "./route/QusRoute"
/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

export const AppRouter: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const ComRoute = React.lazy(() => import('./route/ComRoute'))

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"><MainPage /></Route>
        <Route exact path="/qus"><QusRoute /></Route>
      </Switch>
    </Router>
  )
}
