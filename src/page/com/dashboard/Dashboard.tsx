import * as React from "react"
import {useHistory, useLocation} from "react-router-dom"
import {useStoreActions} from "../../../store/hooks"

/**
 * 2021.03.19 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React

export const Dashboard: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const location = useLocation()
  const history = useHistory()
  // Store Action ------------------------------------------------------------------------------------------------------
  const setSession = useStoreActions(actions => actions.session.setSession)

  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (window.location.href.includes('token')) {
      const token = window.location.href.split('=')[1]
      console.log('token', token)
      setSession(token)
      history.push('')
    }
  }, [location])
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div>hihihi</div>
  )
}
