import * as React from "react"
import {useHistory, useLocation} from "react-router-dom"

/**
 * 2021.03.19 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React

export const Dashboard: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const location = useLocation()
  const history = useHistory()

  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // if (window.location.href.includes('token')) {
    //   const a = window.location.href.split('=')[1]
    //   setSession(a)
      history.push('')
    // }
  }, [location])
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div>hihihi</div>
  )
}
