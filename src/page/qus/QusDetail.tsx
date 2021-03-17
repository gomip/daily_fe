import * as React from "react"
import {useParams, useLocation} from 'react-router-dom'
import {Button} from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import {BasePage} from "../../component/BasePage"
import {GetQusOut} from "../../API"
import "../../static/style/qus.scss"

/**
 * 2021.03.17 | gomip | created
 * @constructor
 */

// history push 할때 받는 props를 지정하기 위한 interface
interface historyState {
  qus?: GetQusOut
}

const {useState, useEffect} = React

export const QusDetail: React.FC = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const location = useLocation<historyState>()
  const {qus} = location.state as historyState
  console.log(qus)
  // LifeCycle ---------------------------------------------------------------------------------------------------------
  // Function ----------------------------------------------------------------------------------------------------------
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <BasePage>
      {/* ============================= 문제 내용 시작 ========================= */}
      <div className="container-qus">
        <div className="sub-header">
          <h3>{qus!.qusTitle}</h3>
          <Button
            variant="primary"
            size="sm"
            className="btn-register"
          >
            등록
          </Button>
        </div>
        <div style={{backgroundColor: 'white', marginTop: '20px', padding: 20}}>
          <ReactMarkdown
            renderers={{
              inlineCode: InlineCodeBlock,
              blockquote: BlockQuote
            }}
          >
            {qus!.qusCtn}
          </ReactMarkdown>
        </div>
      </div>
      {/* ============================= 문제 내용 끝 ========================== */}

      {/* ============================= 추가 내용 시작 ========================= */}
      <div className="container-tag">
        <div>hi</div>
      </div>
      {/* ============================= 추가 내용 끝 ========================== */}
    </BasePage>
  )
}

function InlineCodeBlock(props: any) {
  return (
    <span style={{background: '#eee', paddingLeft: '5px', paddingRight: '5px', fontWeight: 'bold'}}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.value}
    </span>
  )
}

function BlockQuote(props: any) {
  return (
    <div style={{border: '1px dashed #aaa', borderRadius: 10, padding: 10, margin: 5}}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </div>
  )
}
