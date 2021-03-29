import * as React from "react"
import {Button, Col, Form, Modal, Row} from "react-bootstrap"
import Select from "react-select"
import {useEffect, useState} from "react"
import {useStoreState} from "../../store/hooks"
import {GetCdOut, PostSolIn} from "../../API"
import service from "./service"

/**
 * @constructor
 * 2021.03.23 | TalonF | created
 */
export interface SolPostModalProps{
  qId : string
  show: boolean
  handleClose: () => void
  getSol: () => Promise<void>
}

interface SelectOpt{
  mode: number
  value: string
  label: string
}

// 모달 초기값
const init = {
  qusId: '',
  langCd: '',
  solCtn: '',
}

export const SolPostModal: React.FC<SolPostModalProps> = (props) => {
  // Store State -------------------------------------------------------------------------------------------------------
  const session = useStoreState(state => state.session.session)
  const codes = useStoreState(state => state.dictionary.codes)
  // State -------------------------------------------------------------------------------------------------------------
  const {show} = props
  const [langOpt, setLangOpt] = useState<SelectOpt[]>([])
  const [sol, setSol] = useState(init)

  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {                                                       // 우측 태그 및 난이도 Select에 들어갈 opt 값 넣어주
    if (langOpt.length === 0) {
      const tmpLang: SelectOpt[] = []
      codes.LANG_CD.map((item: GetCdOut) =>
        tmpLang.push({
          mode: 1,
          value: item.comCd,
          label: item.comCdName
        })
      )
      setLangOpt(tmpLang)
    }
  }, [])
  // Function ----------------------------------------------------------------------------------------------------------
  const postSol = async (input: PostSolIn) => {                                 // 답안 등록 api
    input.qusId = props.qId
    await service.postSol(session!.token, input)
    const resetValue = init
    setSol(resetValue)
  }

  const handleHide = () => {
    const resetValue = init
    setSol(resetValue)
    props.handleClose()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postSol(sol)
    // await props.getSol()
    props.handleClose()
  }

  const handleChange = (e: React.SyntheticEvent) => {
    const input = e.currentTarget as HTMLInputElement
    setSol({...sol, [input.name]: input.value})
  }

  const handleSelectChange = (val?: any) => {
    if (val !== null && val !== undefined) {
      if (val.mode === 1) {                                                     // 태그 Select 관리
        setSol({...sol, langCd: val.value})
      }
    }
  }
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <>
      <Modal
        show={show}
        onHide={handleHide}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{fontSize: '18px'}}
          >
            문제 등록
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            as="form"
            id="qus-form"
            onSubmit={handleSubmit}
          >
            <Row>
              <Col>
                {/* ====================== 문제 시작 ============================= */}
                <Form.Group>
                  <Form.Label>내용</Form.Label>
                   <Form.Control
                     as="textarea"
                     rows={15}
                     name="solCtn"
                     onChange={handleChange}
                   />
                </Form.Group>
                {/* ======================   문제 끝 ============================= */}
              </Col>
              <div style={{borderLeft: '1px solid #B9BCC1'}}/>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>난이도</Form.Label>
                  <Select
                    id="lang"
                    name="langCd"
                    options={langOpt}
                    onChange={handleSelectChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{padding: 5}}>
          <Button variant="outline-dark" onClick={handleHide}>
            닫기
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="qus-form"
          >
            등록
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
