import React from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

class DataTable extends React.Component {
  state = {
    rows: this.props.rows,
    currentPageNumber: 1,
    totalNumberOfPages: this.calculateTotalNumberOfPages(this.props.rows)
  }

  static defaultProps = {
    rowsPerPage: 40
  }

  constructor(props) {
    super(props)

    this.search = this.search.bind(this)
    this.changeToPageNumber = this.changeToPageNumber.bind(this)
  }

  calculateTotalNumberOfPages(rows) {
    const { rowsPerPage } = this.props
    if (rowsPerPage == 0) return 0
    return Math.ceil(rows.length / rowsPerPage)
  }

  search(event) {
    const { rows } = this.props
    const text = event.target.value
    let rowsFound = rows

    if (text) {
      rowsFound = rows.filter((row) => {
        return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
         (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
      })
    }

    this.setState({
      rows: rowsFound,
      currentPageNumber: 1,
      totalNumberOfPages: this.calculateTotalNumberOfPages(rowsFound)
    })
  }

  changeToPageNumber(pageNumber) {
    this.setState({ currentPageNumber: pageNumber })
  }

  rowsInPageNumber(pageNumber) {
    const { rowsPerPage } = this.props
    const startIndex = (pageNumber - 1) * rowsPerPage
    return [startIndex, startIndex + rowsPerPage]
  }

  render() {
    const { rows, currentPageNumber, totalNumberOfPages } = this.state
    const rowsToRender = rows
      .map(row => <Row key={row.per_id} row={row} />)
      .slice(...this.rowsInPageNumber(currentPageNumber))

    return(
      <div>
        <Search onSearch={this.search} />
        <table>
          <tbody>
            { rowsToRender }
          </tbody>
        </table>
        <Pagination
          currentPageNumber={currentPageNumber}
          totalNumberOfPages={totalNumberOfPages}
          onChange={this.changeToPageNumber} />
      </div>
    )
  }
}

export default DataTable
