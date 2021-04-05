import * as React from "react"
import {useHistory, useLocation} from "react-router-dom"
import {useStoreActions, useStoreState} from '../../../store/hooks'
import {BasePage} from "../../../component/BasePage"
import "../../../static/style/dashboard.scss"
import service from './service'
import {GetQusOut} from '../../../API/modelPkg'
import {NewQusCard} from './NewQusCard'

/**
 * 2021.03.19 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React

export const Dashboard: React.FC = () => {
  // Store State -------------------------------------------------------------------------------------------------------
  const session = useStoreState(state => state.session.session)
  // State -------------------------------------------------------------------------------------------------------------
  const location = useLocation()
  const history = useHistory()
  // Store Action ------------------------------------------------------------------------------------------------------
  const setSession = useStoreActions(actions => actions.session.setSession)
  const [threeQus, setThreeQus] = useState<GetQusOut[]>([])                                                    // 최근 등록된 문제 저장하는 state
  const [authToken, setAuthToken] = useState<string>("")

  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (window.location.href.includes('token')) {
      const token = window.location.href.split('=')[1]
      setSession(token)
      setAuthToken(token)
      history.push('')
    }
  }, [location])

  useEffect(() => {
      getRecentQus()
  }, [authToken])
  // Function ----------------------------------------------------------------------------------------------------------

  // API ---------------------------------------------------------------------------------------------------------------
  const getRecentQus = async () => {
    const res = await service.getRecentQus(
      authToken
    )
    setThreeQus(res.data)
  }
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <BasePage>
      <div style={{width: '100%'}}>
        {/* 최상단 레이아웃 시작 */}
        <div className="layout">
          {/* 타이틀 영역 시작 */}
          <div className="subtitle">
            <h3 style={{color: 'white'}}>1일 1알고리즘</h3>
            <h5 style={{color: '#B4B4B4'}}>좋은 곳으로 이직하고 싶다.</h5>
          </div>
          {/* 타이틀 영역 끝 */}

          {/* 최근 문제 영역 시작 */}
          <div className="qus-card-list">
            {
              threeQus &&
                threeQus.map((item, idx) => (
                  <NewQusCard
                    key={item.qusId}
                    idx={idx}
                    qus={item}
                  />
                ))
            }
          </div>
          {/* 최근 문제 영역 끝 */}
        </div>
        {/* 최상단 레이아웃 끝 */}

        {/* 중간 레이아웃 시작 */}
        <div className="layout" style={{marginTop: '20px'}}>
          <div className="data-table">
            나는 테이블
          </div>
          
          <div className="card-ranking">
            나는 랭킹
          </div>
        </div>
        {/* 중간 레이아웃 끝 */}

        {/* 최하단 레이아웃 시작 */}
        <div className="layout" style={{marginTop: '20px'}}>
          <div className="graph-answer">
            답안 제출현황
          </div>

          <div className="graph-answer">
            로그인 수 그래프
          </div>

          <div className="card-ranking">
            사용언어 그래프
          </div>
        </div>
        {/* 최하단 레이아웃 끝 */}
      </div>
    </BasePage>
  )
}
