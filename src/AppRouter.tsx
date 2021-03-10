import * as React from "react"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainPage} from "./page/main/MainPage"
import {Header} from "./component/Header"
/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

export const AppRouter: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const ComRoute = React.lazy(() => import('./route/COMRoute'))

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"><MainPage /></Route>
      </Switch>
    </Router>
  )
}