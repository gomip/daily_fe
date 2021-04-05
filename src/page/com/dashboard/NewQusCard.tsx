import * as React from "react"
import {GetQusOut} from '../../../API/modelPkg'
import "../../../static/style/dashboard.scss"

/**
 * 2021.04.04 | gomip | created
 */

export interface NewQusCardProps {
  qus: GetQusOut
  idx: number
}

const {useState, useEffect} = React

export const NewQusCard: React.FC<NewQusCardProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {qus, idx} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div
      className="new-qus-card"
      style={idx === 1 ? {backgroundColor: '#B1FFC3'}
              : idx === 2 ? {backgroundColor: '#ECFF9B'}
              : {backgroundColor: '#A4ADFF'}}
    >
      {qus.qusId}
    </div>
  )
}