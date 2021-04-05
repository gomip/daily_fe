import * as React from "react"
import {Modal} from 'react-bootstrap'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {GetSolOut} from '../../API/modelPkg'

/**
 * 2021.03.24 | gomip | created
 */

export interface SolModalProps {
  sol: GetSolOut
  show: boolean
  handleClose: () => void
}

const {useState} = React

export const SolModal: React.FC<SolModalProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {sol, show, handleClose} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return(
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size='lg'
       >
        <Modal.Header closeButton>
          <Modal.Title
            style={{fontSize: '18px'}}>
            {sol.createUserName} : {sol.langCdName}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={{backgroundColor: 'white', padding: 20}}>
            <SyntaxHighlighter
              language={sol.langCdName}
              style={dracula}
            >
              {sol.solCtn}
            </SyntaxHighlighter>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}