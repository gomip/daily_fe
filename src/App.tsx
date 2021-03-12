import React from "react"
import "./App.scss"
import "./static/style/main.scss"
import 'bootstrap/dist/css/bootstrap.min.css'
import {AppRouter} from "./AppRouter"

function App() {
  return (
    <div id="app-body">
      <AppRouter />
    </div>
  )
}

export default App
