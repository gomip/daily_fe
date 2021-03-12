import * as React from "react"
import {BasePage} from "../../component/BasePage"
import "../../static/style/qus.scss"
import {Button} from "react-bootstrap"
import {QusCard} from "./QusCard"

/**
 * 2021.03.12 | gomip | created
 * @constructor
 */

export const QusPage: React.FC = () => {
  // State -------------------------------------------------------------------------------------------------------------
  console.log("im here")
  // Function ----------------------------------------------------------------------------------------------------------

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
        <div className="card-qus">
          <QusCard />
          <QusCard />
          <QusCard />
          <QusCard />
          <QusCard />
          <QusCard />
          <QusCard />
          <QusCard />
        </div>
        {/* 문제 목록 끝 */}
      </div>
    {/* ============================= 문제 영역 끝 ============================ */}

    {/* ============================= 태그 영역 시작 =========================== */}
      <div className="container-tag">
        <div style={{backgroundColor: "#bbb"}}>tag</div>
      </div>
    {/* ============================= 태그 영역 끝 ============================ */}
    </BasePage>
  )
}
