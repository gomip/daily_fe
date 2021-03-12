import * as React from "react"

/**
 * 2021.03.12 | gomip | created
 * @constructor
 */

export interface TagCardProps{
  title: string
}

export const TagCard: React.FC<TagCardProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {title} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className="card-tag">
      <div className="tag-label">{title}</div>
    </div>
  )
}
