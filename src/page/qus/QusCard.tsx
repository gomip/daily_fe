import * as React from "react"
import {FaChevronRight} from "react-icons/fa"
import "../../static/style/qus.scss"
import {GetQusOut} from "../../API"
/**
 * 2021.03.12 | gomip | created
 * @constructor
 */

export interface QusCardProps{
  qus: GetQusOut
}
export const QusCard: React.FC<QusCardProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {qus} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className="card-qus">
      <div className="title-area">
        <h4>[{qus.qusId}]{qus.qusTitle}</h4>
        <span>{qus.tagCdName}</span>
      </div>

      <div className="arrow-area">
        <FaChevronRight className="right-arrow"/>
      </div>
    </div>
  )
}
