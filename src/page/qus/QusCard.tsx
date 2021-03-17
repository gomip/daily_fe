import * as React from "react"
import {FaChevronRight} from "react-icons/fa"
import "../../static/style/qus.scss"
import {GetQusOut} from "../../API"
/**
 * 2021.03.12 | gomip | created
 * @constructor
 * 2021.03.15 | gomip | props로 값 전달받아서 카드 출력하는걸로 변경
 */

export interface QusCardProps{
  qus: GetQusOut
}

const {useState, useEffect} = React

export const QusCard: React.FC<QusCardProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {qus} = props
  // LifeCycle ---------------------------------------------------------------------------------------------------------
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className="card-qus">
      <div className="title-area">
        <h4>{qus.qusTitle}</h4>
        <div>
          <span className={qus.difCd === '01' ? 'green' : (qus.difCd === '02' ? 'yellow' : 'red')}>{qus.difCdName}</span> <span>{qus.tagCdName}</span>
        </div>
      </div>

      <div className="arrow-area">
        <FaChevronRight className="right-arrow"/>
      </div>
    </div>
  )
}
