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
import {GetQusOut, PagingGetQusOut} from "../../API"

/**
 * 2021.03.12 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React

export const QusPage: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  const [pageNum, setPageNum] = useState(1)
  const [qus, setQus] = useState<PagingGetQusOut>()
  const [qusList, setQusList] = useState<GetQusOut[]>([])
  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    getQus()
  }, [pageNum])

  // Function ----------------------------------------------------------------------------------------------------------
  // const handleScroll = () => {
  //   console.log("im here")
  //   const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  //   const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
  //   const {clientHeight} = document.documentElement
  //
  //   if (scrollTop + clientHeight === scrollHeight) {
  //     console.log("im here")
  //     const tmp = pageNum + 1
  //     setPageNum(tmp)
  //   }
  // }
  // API ---------------------------------------------------------------------------------------------------------------
  // const getQus = async () => {
  //   try {
  //     const qusData = await axios.get(`${API_HOST}/qus`)
  //       .then(res => {
  //         console.log('res', res.data)
  //         setQus(res.data)
  //       })
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  const getQus = async () => {
    const qusData = await service.getQusPaging("", pageNum)
      .then(res => {
        setQus(res.data)
        const tmp = qusList.concat(res.data.list)
        setQusList(tmp)
      })
  }

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <BasePage>
    {/* ============================= 문제 영역 시작 =========================== */}
      <div className="container-qus">
        {/* 헤더 영역 시작 */}
        <div className="sub-header">
          <h3>Question</h3>
          <Button
            variant="primary"
            size="sm"
            className="btn-register"
          >
            등록
          </Button>
        </div>
        {/* 헤더 영역 끝 */}

        {/* 문제 목록 시작 */}

        <div id="scrollableDiv">
          <InfiniteScroll
            next={() => setPageNum(pageNum+1)}
            hasMore
            loader={<h4>Loading...</h4>}
            dataLength={qus ? qus.total : 0}
          >
            {
              qusList &&
              qusList.map((it, idx) => (
                <QusCard key={it.qusId} qus={it}/>
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
        <div>
          <TagCard title="Tag"/>
        </div>
        {/* 태그 끝 */}

        {/* 언어 시작 */}
        <div>
          <TagCard title="Language"/>
        </div>
        {/* 언어 끝 */}
      </div>
    {/* ============================= 태그 영역 끝 ============================ */}
    </BasePage>
  )
}
