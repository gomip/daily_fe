import React from "react"
import "./App.scss"
import "./static/style/main.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import {AppRouter} from "./AppRouter"
import {useStoreActions, useStoreState} from "./store/hooks"
import {isValidSession} from "./store/Session/model"
import {MainPage} from "./page/main/MainPage"
import {Header} from "./component/Google/Header"

/**
 * 2021.03.23 | gomip | 세션값에 따라 로그인 페이지로 이동할지 / 메인 페이지로 이동할지 정한다.
 * @constructor
 */
const App: React.FC = () => {
  // Store State -------------------------------------------------------------------------------------------------------
  // eslint-disable-next-line no-underscore-dangle
  const persist = useStoreState(state => state._persist)
  const session = useStoreState(state => state.session.session)
  const isDictLoaded = useStoreState(state => state.dictionary.isLoaded)

  // State -------------------------------------------------------------------------------------------------------------
  const isLoggedIn = isValidSession(session)
  // Store Action ------------------------------------------------------------------------------------------------------
  const fetchDictionary = useStoreActions(actions => actions.dictionary.fetchDictionary)
  // LifeCycle ---------------------------------------------------------------------------------------------------------
  React.useEffect(() => {
    if (persist && persist.rehydrated && isLoggedIn) {
      if (!isDictLoaded) {
        fetchDictionary()
      }
    }
  }, [persist, isLoggedIn])
  return (
    <div id="app-body">
       <AppRouter />
    {/*  {persist && persist.rehydrated? */}
    {/*    <AppRouter /> : */}
    {/*    <div> */}
    {/*      <Header /> */}
    {/*      <MainPage /> */}
    {/*    </div> */}
    {/*  } */}
    </div>
  )
}

export default App
