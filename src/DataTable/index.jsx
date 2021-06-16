import React from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'

class DataTable extends React.Component {
  static defaultProps = {
    rowsPerPage: 40
  }

  constructor(props) {
    super(props)

    this.state = this.newRowsState(this.props.rows)
  }

  newRowsState(rows) {
    return {
      rows,
      currentPageNumber: 1,
      totalNumberOfPages: this.calculateTotalNumberOfPages(rows)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.rows !== this.props.rows || prevProps.rowsPerPage !== this.props.rowsPerPage) {
      const newState = this.newRowsState(this.props.rows)
      this.setState(newState)
    }
  }

  calculateTotalNumberOfPages(rows) {
    const { rowsPerPage } = this.props
    if (rowsPerPage == 0) return 0
    return Math.ceil(rows.length / rowsPerPage)
  }

  search = (event) => {
    const { rows } = this.props
    const text = event.target.value
    let rowsFound = rows

    if (text) {
      rowsFound = rows.filter((row) => {
        return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
         (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
      })
    }

    const newState = this.newRowsState(rowsFound)
    this.setState(newState)
  }

  changeToPageNumber = (pageNumber) => {
    this.setState({ currentPageNumber: pageNumber })
  }

  renderRows() {
    const { rows, currentPageNumber } = this.state
    const { rowsPerPage } = this.props
    const startIndex = (currentPageNumber - 1) * rowsPerPage

    return rows
      .slice(startIndex, startIndex + rowsPerPage)
      .map(row => <Row key={row.per_id} row={row} />)
  }

  render() {
    const { currentPageNumber, totalNumberOfPages } = this.state

    return(
      <div>
        <Search onSearch={this.search} />
        <table>
          <tbody>
            { this.renderRows() }
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
