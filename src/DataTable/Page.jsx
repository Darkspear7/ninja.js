import React from 'react'

class Page extends React.Component {
  click = (event) => {
    event.preventDefault()

    const { onChange, pageNumber } = this.props
    onChange(pageNumber)
  }

  render() {
    const { pageNumber, currentPageNumber } = this.props

    const isActivePage = () => {
      return currentPageNumber == pageNumber
    }
  
    const renderedPageNumber = () => {
      return pageNumber + 1
    }
  
    if (isActivePage()) {
      return(
        <li className="page-item mr-1">
          <button className="page-link button-outline" onClick={this.click} >{renderedPageNumber()}</button>
        </li>
      )
    }
    return(
      <li className="page-item mr-1">
        <button className="page-link" onClick={this.click} >{renderedPageNumber()}</button>
      </li>
    )
  }
}

export default Page
