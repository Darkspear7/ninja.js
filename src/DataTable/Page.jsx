import React from 'react'

class Page extends React.Component {
  click = (event) => {
    event.preventDefault()

    const { onChange, pageNumber } = this.props
    onChange(pageNumber)
  }

  render() {
    const { pageNumber, active } = this.props
    let className = "page-link"
    if (active) className+= " button-outline"

    return(
      <li className="page-item mr-1">
        <button className={className} onClick={this.click} >{pageNumber}</button>
      </li>
    )
  }
}

export default Page
