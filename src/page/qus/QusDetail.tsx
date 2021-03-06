import * as React from "react"
import {useParams, useLocation} from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {Button, Table} from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import {BasePage} from "../../component/BasePage"
import {GetQusOut, GetSolOut} from "../../API"
import "../../static/style/qus.scss"
import service from "./service"
import {useStoreState} from "../../store/hooks"
import {SolTableRow} from './SolTableRow'
import {SolPostModal} from "./SolPostModal"

/**
 * 2021.03.17 | gomip | created
 * @constructor
 * 2021.03.23 | gomip | 임시적으로 사용자 테이블 작성
 */

// history push 할때 받는 props를 지정하기 위한 interface
interface historyState {
  qus?: GetQusOut
}

const {useState, useEffect} = React

export const QusDetail: React.FC = (props) => {
  // Store State -------------------------------------------------------------------------------------------------------
  const session = useStoreState(state => state.session.session)
  // State -------------------------------------------------------------------------------------------------------------
  const location = useLocation<historyState>()
  const {qus} = location.state as historyState
  const [sol, setSol] = useState<GetSolOut[]>([])
  const regex = /([a-zA-z]|0+)(?!$)/g
  const [showPostModal, setShowPostModal] = useState(false)
  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    getSol()
  }, [location])
  // Function ----------------------------------------------------------------------------------------------------------
  const getSol = async () => {
    const res = await service.getSol(
      session!.token,
      qus!.qusId
    )
    setSol(res.data)
  }

  const handleClose = () => {
    setShowPostModal(false)
  }

  const CodeBlock = (value: string) => {
    return (
      <SyntaxHighlighter language="markdown" style={dracula}>
        {value}
      </SyntaxHighlighter>
    )
  }
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
            onClick={() => setShowPostModal(!showPostModal)}
          >
            등록
          </Button>
        </div>
        <div style={{backgroundColor: 'white', marginTop: '20px', padding: 20}}>
          <ReactMarkdown
            renderers={{
              code: CodeBlock,
              inlineCode: InlineCodeBlock,
              blockquote: BlockQuote
            }}
          >
            {qus!.qusCtn}
          </ReactMarkdown>
        </div>
      {/* ============================= 문제 내용 끝 ========================== */}
      </div>

      {/* ============================= 추가 내용 시작 ========================= */}
      <div className="container-tag">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>t1</th> */}
              {/* <th>t2</th> */}
              {/* <th>t3</th> */}
               <th>아이디</th>
               <th>사용언어</th>
               <th>코드보기</th>
            </tr>
          </thead>
          <tbody>
          {
            sol && sol.map((item, index) => (
              <SolTableRow key={item.solId} solRow={item} index={index}/>
              // <tr key={item.solId}>
              //   <td>{item.solId.replaceAll(regex,'')}</td>
              //    <td>{item.createUserName}</td>
              //    <td>{item.langCdName}</td>
              //     <td>
              //       <Button>
              //         <FaCode size={14}/>
              //       </Button>
              //     </td>
              // </tr>
            ))
          }
          </tbody>
        </Table>
         {/* <div style={{backgroundColor: 'white'}}> */}
         {/*  hihi */}
         {/* </div> */}
      </div>
      {/* ============================= 추가 내용 끝 ========================== */}
      <SolPostModal show={showPostModal} qId={qus!.qusId} handleClose={handleClose} getSol={getSol}/>
    </BasePage>
  )
}

export function InlineCodeBlock(props: any) {
  return (
    <span style={{background: '#eee', paddingLeft: '5px', paddingRight: '5px', fontWeight: 'bold'}}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.value}
    </span>
  )
}

export function BlockQuote(props: any) {
  return (
    <div style={{border: '1px dashed #aaa', borderRadius: 10, padding: 10, margin: 5}}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.children}
    </div>
  )
}