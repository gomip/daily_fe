import React from "react"
import {Helmet} from "react-helmet"
import "./App.css"
import {AppRouter} from "./AppRouter"

function App() {
  return (
    <div id="app-body">
      <Helmet>
        <title>Daily Programming</title>
      </Helmet>
      <AppRouter />
    </div>
  )
}

export default App
