import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { injectIntl, FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { fetchAllHistoryData } from '../../../user/redux'
import HelIcon from '../../HelIcon'

class History extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAllHistoryData())
  }

  sortIcon = (column, colIndex) => (
    <div style={{ display: 'flex' }}>
      {column.text}
      <div className="arrow-icon">
        <HelIcon iconName="arrow-up" />
        <span className="arrow-down">
          <HelIcon iconName="arrow-down" />
        </span>
      </div>
    </div>
  )
  dateIcon = (cell, row) => (
    <div>
      <HelIcon iconName="calendar" />{' '}
      {moment(cell)
        .locale(this.props.locale)
        .format('l')}
    </div>
  )

  dummyText = () => {
    return (
      <p>{this.props.intl.formatMessage({ id: 'app.history.youSignedIn' })}</p>
    )
  }

  render() {
    const { intl } = this.props
    const columns = [
      {
        dataField: 'timestamp',
        text: intl.formatMessage({ id: 'app.history.date' }),
        sort: true,
        headerFormatter: this.sortIcon,
        formatter: this.dateIcon
      },
      {
        dataField: `service.name.${this.props.locale}`,
        text: intl.formatMessage({ id: 'app.history.name' }),
        sort: true,
        headerFormatter: this.sortIcon
      },
      {
        dataField: '',
        text: '',
        isDummyField: true,
        formatter: this.dummyText
      }
    ]
    const options = {
      paginationSize: 4
    }
    const defaultSorted = [
      {
        dataField: 'timestamp',
        order: 'desc'
      }
    ]
    return (
      <div className="history-view">
        <section>
          <Row>
            <Col xs={12}>
              <h1>
                <FormattedMessage id="app.history" />
              </h1>
              <p className="lead">
                <FormattedMessage id="app.history.text" />
              </p>
            </Col>
          </Row>
        </section>
        <section>
          <Row>
            <Col xs={12}>
              <BootstrapTable
                striped
                bordered={false}
                keyField="timestamp"
                data={this.props.historyData}
                columns={columns}
                defaultSorted={defaultSorted}
                pagination={paginationFactory(options)}
              />
            </Col>
          </Row>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale,
  historyData: state.userReducer.allHistoryData
})
export default connect(mapStateToProps)(injectIntl(History))
