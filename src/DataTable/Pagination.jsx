import React from 'react'

import Page from './Page'

const Pagination = ({ currentPageNumber, totalNumberOfPages, onChange }) => {
  const pages = []
  for (let index = 0; index < totalNumberOfPages; index++) {
    const pageNumber = index + 1
    pages.push(
      <Page
        key={index}
        active={pageNumber === currentPageNumber}
        pageNumber={pageNumber}
        onChange={onChange} />
    )
  }
  
  if (pages.length <= 1) {
    return null
  }
  return(
    <ul className="pagination">
      {pages}
    </ul>
  )
}

export default Pagination
