import React, {Component} from 'react';
import {Row, Col} from 'reactstrap'
import {FormattedMessage} from 'react-intl'
import axios from 'axios';
import {connect} from 'react-redux'
import {fetchAllHistoryData} from '../../../user/redux'
import HelIcon from '../../HelIcon'
import moment from 'moment'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
class History extends Component {
    constructor(props){
        super(props)
        this.state = {
            historyData : [],            
            
        }
    }

    UNSAFE_componentWillMount(){
        const token = window.TUNNISTAMO_ACCESS_TOKEN
        const config = {
            headers: {'Authorization': 'Bearer ' + token},
        }
        axios.get('https://api.hel.fi/sso-test/v1/user_login_entry/', config)
            .then(res=>this.setState({
                historyData: res.data.results,
            }))
        //this.props.fetchAllHistoryData()
    }

    sortIcon = (column, colIndex)=>(
        <div style={ {display: 'flex'}}>
            { column.text }
            <div className="arrow-icon">
                <HelIcon iconName="arrow-up" />
                <span className="arrow-down"><HelIcon iconName="arrow-down" /></span>
            </div>
        </div>
    )
    dateIcon = (cell, row)=>(
        <div><HelIcon iconName="calendar" />{' '}{ moment(cell).format('lll') }</div>    
    )

    render() {
        console.log('history data', this.props.historyData)
        const columns = [{
            dataField: 'timestamp', 
            text: 'Date',
            sort: true,
            headerFormatter: this.sortIcon,
            formatter: this.dateIcon,

        },
        {
            dataField: 'service',
            text: 'Name',
            sort: true,
            headerFormatter: this.sortIcon,
        }]
        return (
            <div className="history-view">
                <section>
                    <Row>
                        <Col xs={12}>
                            <h1><FormattedMessage id="app.history"/></h1>
                            <p className="lead"><FormattedMessage id="app.history.text"/></p>
                        </Col>
                    </Row>
                </section>
                <section>
                    <Row>
                        <Col xs={12}>
                            <BootstrapTable 
                                striped
                                bordered = {false}
                                keyField='timestamp' 
                                data={ this.state.historyData } 
                                columns={ columns }
                                pagination={ paginationFactory() }/>
                        </Col>
                    </Row>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        historyData: state.userReducer.allHistoryData,
    }
}

export default connect(mapStateToProps, {fetchAllHistoryData})(History)
