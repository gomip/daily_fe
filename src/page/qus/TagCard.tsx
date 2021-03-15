import * as React from "react"
import {GetCdOut} from "../../API"

/**
 * 2021.03.12 | gomip | created
 * @constructor
 */

export interface TagCardProps{
  title: string
  item: GetCdOut[]
}

export const TagCard: React.FC<TagCardProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {title, item} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className="card-tag">
      <div className="tag-label">{title}</div>
      <div>
        {
          item &&
            item.map(it => (
              <div key={it.comCdId}>{it.comCdName}</div>
            ))
        }
      </div>
    </div>
  )
}
