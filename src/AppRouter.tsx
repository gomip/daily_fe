import * as React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {MainPage} from "./page/main/MainPage"
import {Header} from "./component/Google/Header"
import {Dashboard} from "./page/com/dashboard/Dashboard"
/**
 * 2021.03.10 | gomip | created
 * @constructor
 * 2021.03.23 | gomip | 대시보드 바라보도록 변경
 */

export const AppRouter: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const QusRoute = React.lazy(() => import('./route/QusRoute'))

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Router>
      <Header />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/"><MainPage /></Route>
          <Route path="/qus"><QusRoute /></Route>
          <Route path="/dashboard"><Dashboard /></Route>
        </Switch>
      </React.Suspense>
    </Router>
  )
}
