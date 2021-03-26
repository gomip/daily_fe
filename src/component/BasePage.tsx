import * as React from "react"
import "../static/style/main.scss"
/**
 * 2021.03.11 | gomip | created
 * @constructor
 */
interface Props {
  removeHeaderInfo?: boolean
  className?: string
}
export const BasePage: React.FC<Props> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {children} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <section className="page-container">
      {children}
    </section>
  )
}
