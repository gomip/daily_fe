import * as React from "react"
import {Modal} from 'react-bootstrap'
import {GetSolOut} from '../../API/modelPkg'
import ReactMarkdown from 'react-markdown'
import {BlockQuote, InlineCodeBlock} from './QusDetail'

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
            <ReactMarkdown
              renderers={{
                inlineCode: InlineCodeBlock,
                blockquote: BlockQuote,
              }}
            >
              {sol.solCtn}
            </ReactMarkdown>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}