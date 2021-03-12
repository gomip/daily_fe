import * as React from "react"
import {FaChevronRight} from "react-icons/fa"
import "../../static/style/qus.scss"
/**
 * 2021.03.12 | gomip | created
 * @constructor
 */

export const QusCard: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className="card-qus">
      <div className="title-area">
        <h4>title</h4>
        <span>subtitle</span>
      </div>

      <div className="arrow-area">
        <FaChevronRight className="right-arrow"/>
      </div>
    </div>
  )
}
