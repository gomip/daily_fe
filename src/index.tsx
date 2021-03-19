import React from "react"
import ReactDOM from "react-dom"
import {StoreProvider} from "easy-peasy"
import "./index.css"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import {store} from "../src/store/index"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// )

ReactDOM.render((
  <StoreProvider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App/>
    </DndProvider>
  </StoreProvider>
), document.getElementById('app'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
