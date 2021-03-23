import * as React from "react"
import {GetCdOut} from "../../API"

/**
 * 2021.03.12 | gomip | created
 * @constructor
 */

export interface TagCardProps{
  title: string
  item: GetCdOut[]
  handleCheckbox: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

export const TagCard: React.FC<TagCardProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {title, item, handleCheckbox} = props
  // Function ----------------------------------------------------------------------------------------------------------
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className="card-tag">
      <div className="tag-label">{title}</div>
      <div>
        {
          item &&
            item.map(it => (
              <div key={it.comCd} className="checkbox-container">
                <input
                  value={`${it.comGrpCd}-${it.comCd}`}
                  type="checkbox"
                  onClick={handleCheckbox}
                />
                <div style={{color: "#c0c0c3", marginLeft: "10px"}}>{it.comCdName}</div>
              </div>
            ))
        }
      </div>
    </div>
  )
}
