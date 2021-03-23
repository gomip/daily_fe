import * as React from "react"
import {Button} from "react-bootstrap"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"
import {BasePage} from "../../component/BasePage"
import "../../static/style/qus.scss"
import {QusCard} from "./QusCard"
import {TagCard} from "./TagCard"
import {API_HOST} from "../../utils/const"
import service from "./service"
import {GetCdOut, GetQusOut, PagingGetQusOut} from "../../API"
import cdService from "../com/cdService"
import {useStoreState} from "../../store/hooks"
import {QusPostModal} from "./QusPostModal"

/**
 * 2021.03.12 | gomip | created
 * @constructor
 * 2021.03.15 | gomip | infinite scroll 및 api 적용성
 * 2021.03.23 | gomip | 문제 등록 모달 작성
 */

const {useState, useEffect} = React

interface GetQusIn {
  difCd?: string[],
  orderBy?: string,
  pageNum?: number,
  pageSize?: number,
  tagCd?: string[],
  options?: any
}

export const QusPage: React.FC = () => {
  // Store State -------------------------------------------------------------------------------------------------------
  const session = useStoreState(state => state.session.session)
  const codes = useStoreState(state => state.dictionary.codes)
  // State -------------------------------------------------------------------------------------------------------------
  const [pageNum, setPageNum] = useState(1)
  const [qus, setQus] = useState<PagingGetQusOut>()                             // 문제 전체 정보 (pagination 포함)
  const [qusList, setQusList] = useState<GetQusOut[]>([])             // 문제 목록
  const [tagCd, setTagCd] = useState<string[]>([])
  const [difCd, setDifCd] = useState<string[]>([])
  const [isCdChanged, setIsCdChanged] = useState(false)               // 코드값 변경 확인 state
  const [showPostModal, setShowPostModal] = useState(false)           // 문제 등록 모달 관리 state
  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    getQus()
  }, [pageNum, tagCd, difCd])

  // Function ----------------------------------------------------------------------------------------------------------
  const handleCheckbox = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const {value} = e.currentTarget
    const strSplice = value.split("-")
    if (strSplice[0] === "TAG_CD") {                                            // 선택한 태그의 앞에가 TAG_CD인 경우 tag_cd state에 해당값을 넣어준다.
      let tmpTag: string[] = []
      if (tagCd.some(item => item === strSplice[1])) {                          // 선택한 태그값이 있으면 tagCd state에서 제거해준다
        tmpTag = tagCd.filter(item => item !== strSplice[1])
      } else {
        tmpTag = tagCd.concat(strSplice[1])                                     // 선택한 태그값이 없으면 tacCd state에 추가해준다.
      }
      setTagCd(tmpTag)
    } else if (strSplice[0] === "DIF_CD") {                                     // 선택한 태그의 앞에가 DIF_CD인 경우 dif_cd state에 해당값을 넣어준다.
      let tmpDif: string[] = []
      if (difCd.some(item => item === strSplice[1])) {
        tmpDif = difCd.filter(item => item !== strSplice[1])                    // 선택한 난이도 값이 있으면 difCd state에 제거해준다.
      } else {
        tmpDif = difCd.concat(strSplice[1])                                     // 선택한 난이도 값이 없으면 difCd state에 추가해준다.
      }
      setDifCd(tmpDif)
    }
    setIsCdChanged(true)
  }
  // API ---------------------------------------------------------------------------------------------------------------
  const getQus = async () => {                                                  // 문제 목록 조회
    console.log('why?')
    await service.getQusPaging(
      session!.token,
      difCd.length > 0 ? difCd.toString() : undefined,
      "",
      pageNum,
      15,
      tagCd.length > 0 ? tagCd.toString() : undefined
    )
      .then(res => {
        setQus(res.data)
        if (isCdChanged) {                                                      // 옆에 필터값들이 변한거면 qus를 초기화해준다.
          console.log('im here cd changed')
          setQusList(res.data.list)
          setPageNum(1)
        } else {
          console.log('im here pageChanged')
          const tmp = qusList.concat(res.data.list)
          setQusList(tmp)
        }
        setIsCdChanged(false)
      }).catch(err => {
        console.error(err)
      })
  }

  const renderLoading = () => {
    return (
      <div style={{marginTop: "20px"}}>
        <h4 style={{color: "white"}}>Loading...</h4>
      </div>
    )
  }

  const handleClose = () => {
    setShowPostModal(false)
  }
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <BasePage>
      {/* ============================= 문제 영역 시작 ========================= */}
      <div className="container-qus">
        {/* 헤더 영역 시작 */}
        <div className="sub-header">
          <h3>Question</h3>
          <Button
            variant="primary"
            size="sm"
            className="btn-register"
            onClick={() => setShowPostModal(!showPostModal)}
          >
            등록
          </Button>
        </div>
        {/* 헤더 영역 끝 */}

        {/* 문제 목록 시작 */}

        <div id="scrollableDiv">
           <InfiniteScroll
            next={() => setPageNum(pageNum + 1)}
            hasMore
            loader={() => renderLoading()}
            dataLength={qus ? qus.total : 0}
           >
            {
              qusList &&
              qusList.map((item, idx) => (
                <QusCard
                  key={item.qusId}
                  qus={item}
                />
              ))
            }
           </InfiniteScroll>
        </div>
        {/* 문제 목록 끝 */}
      </div>
      {/* ============================= 문제 영역 끝 ============================ */}

      {/* ============================= 태그 영역 시작 =========================== */}
      <div className="container-tag">
        {/* 태그 시작 */}

        <TagCard
          title="Tag"
          item={codes.TAG_CD}
          handleCheckbox={handleCheckbox}
        />
        {/* 태그 끝 */}

        <div style={{marginTop: "20px"}} />
        {/* 언어 시작 */}
        <TagCard
          title="Difficulty"
          item={codes.DIF_CD}
          handleCheckbox={handleCheckbox}
        />
        {/* 언어 끝 */}
      </div>
      {/* ============================= 태그 영역 끝 ============================ */}
      <QusPostModal show={showPostModal} handleClose={handleClose} getQus={getQus}/>
    </BasePage>
  )
}
