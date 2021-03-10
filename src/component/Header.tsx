import * as React from "react"
import {Navbar} from "react-bootstrap"

/**
 * 2021.03.10 | gomip | created
 * @constructor
 */

export const Header: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <header id="header">
      <Navbar expand="md">
        <Navbar.Brand>
          <div>Daily</div>
        </Navbar.Brand>
      </Navbar>
    </header>
  )
}
