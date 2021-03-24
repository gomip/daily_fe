import * as React from "react"
import {GetSolOut} from '../../API/modelPkg'
import {Button} from 'react-bootstrap'
import {FaCode} from 'react-icons/fa'
import {SolModal} from './SolModal'

/**
 * 2021.03.24 | gomip | created
 */

export interface SolTableRowProps {
  solRow: GetSolOut
  index: number
}

const {useState, useEffect} = React

export const SolTableRow: React.FC<SolTableRowProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {solRow, index} = props
  const [showModal, setShowModal] = useState(false)                                                            // 모달을 보여줄지 말지 정하는 state
  // Function ----------------------------------------------------------------------------------------------------------
  const handleShow = () => setShowModal(true)
  const handleHide = () => setShowModal(false)
  console.log('show', showModal)
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{solRow.createUserName}</td>
        <td>{solRow.langCdName}</td>
        <td>
          <Button onClick={handleShow}>
            <FaCode size={14}/>
          </Button>
        </td>
      </tr>

      <SolModal sol={solRow} show={showModal} handleClose={handleHide}/>
    </>
  )
}

