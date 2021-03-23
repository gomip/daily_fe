import * as React from "react"
import {Button, Col, Form, Modal, Row} from "react-bootstrap"
import Select from "react-select"
import {useEffect, useState} from "react"
import {useStoreState} from "../../store/hooks"
import {GetCdOut, PostQusIn} from "../../API"
import service from "./service"
/**
 * 2021.03.17 | gomip | created
 * @constructor
 * 2021.03.23 | gomip | 문제 등록 작성
 */
export interface QusPostModalProps{
  show: boolean
  handleClose: () => void
  getQus: () => Promise<void>
}

interface SelectOpt{
  mode: number
  value: string
  label: string
}

// 모달 초기값
const init = {
  qusTitle: '',
  qusCtn: '',
  difCd: '',
  tagCd: '',
}
export const QusPostModal: React.FC<QusPostModalProps> = (props) => {
  // Store State -------------------------------------------------------------------------------------------------------
  const session = useStoreState(state => state.session.session)
  const codes = useStoreState(state => state.dictionary.codes)
  // State -------------------------------------------------------------------------------------------------------------
  const {show} = props
  const [difOpt, setDifOpt] = useState<SelectOpt[]>([])
  const [tagOpt, setTagOpt] = useState<SelectOpt[]>([])
  const [qus, setQus] = useState(init)

  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {                                                       // 우측 태그 및 난이도 Select에 들어갈 opt 값 넣어주
    if (difOpt.length === 0) {
      const tmpDif: SelectOpt[] = []
      codes.DIF_CD.map((item: GetCdOut) =>
        tmpDif.push({
          mode: 2,
          value: item.comCd,
          label: item.comCdName
        })
      )
      setDifOpt(tmpDif)
    }
    if (tagOpt.length === 0) {
      const tmpTag: SelectOpt[] = []
      codes.TAG_CD.map((item: GetCdOut) =>
        tmpTag.push({
          mode: 1,
          value: item.comCd,
          label: item.comCdName
        })
      )
      setTagOpt(tmpTag)
    }
  }, [])
  // Function ----------------------------------------------------------------------------------------------------------
  const postQus = async (input: PostQusIn) => {                                 // 문제 등록 api
    await service.postQus(session!.token, input)
    const resetValue = init
    setQus(resetValue)
  }

  const handleHide = () => {
    const resetValue = init
    setQus(resetValue)
    props.handleClose()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await postQus(qus)
    // await props.getQus()
    props.handleClose()
  }

  const handleChange = (e: React.SyntheticEvent) => {
    const input = e.currentTarget as HTMLInputElement
    setQus({...qus, [input.name]: input.value})
  }

  const handleSelectChange = (val?: any) => {
    if (val !== null && val !== undefined) {
      if (val.mode === 1) {                                                     // 태그 Select 관리
        setQus({...qus, tagCd: val.value})
      } else if (val.mode === 2) {                                              // 난이도 Select 관리
        setQus({...qus, difCd: val.value})
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
                {/* ====================== 제목 시작 ============================= */}
                <Form.Group>
                  <Form.Label>제목</Form.Label>
                  <Form.Control
                    type="text"
                    name="qusTitle"
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* ====================== 제목 끝 ============================== */}

                {/* ====================== 문제 시작 ============================= */}
                <Form.Group>
                  <Form.Label>내용</Form.Label>
                   <Form.Control
                     as="textarea"
                     rows={15}
                     name="qusCtn"
                     onChange={handleChange}
                   />
                </Form.Group>
                {/* ======================   문제 끝 ============================= */}
              </Col>
              <div style={{borderLeft: '1px solid #B9BCC1'}}/>
              <Col sm={3}>
                <Form.Group>
                  <Form.Label>태그</Form.Label>
                  <Select
                    id="tag"
                    name="tagCd"
                    options={tagOpt}
                    onChange={handleSelectChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>난이도</Form.Label>
                  <Select
                    id="dif"
                    name="difCd"
                    options={difOpt}
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
