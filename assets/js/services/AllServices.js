import React from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {Col, Container, Row} from 'reactstrap'

import {fetchAllServices} from './redux'

import Loading from '../components/Loading'
import Error from '../components/Error'
import ServicesGrid from '../components/ServicesGrid'
import HelIcon from '../components/HelIcon'

class AllServices extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchAllServices())
    }

    render() {
        const {services, isLoading, isError} = this.props
        if (isLoading) {
            return (
                <section className="section section--services">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <Loading />
                            </Col>
                        </Row>
                    </Container>
                </section>
            )
        } else if (isError) {
            return (
                <section className="section section--services">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <Error />
                            </Col>
                        </Row>
                    </Container>
                </section>
            )
        } else if (!services) {
            return null
        }
        const servicesCount = services.length
        const servicesForFirstRow = services.splice(0, 3)
        return (
            <section className="section section--services">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div className="services-amount">
                                <FormattedMessage id="app.services.all.amountOfServices" values={{amount: servicesCount}} />
                            </div>
                            <div className="services-row-1">
                                <ServicesGrid services={servicesForFirstRow} />
                            </div>
                            <div className="cta-register">
                                <div className="left-icon">
                                    <HelIcon iconName="user-o" />
                                </div>
                                <a href="/login">
                                    <FormattedMessage id="app.services.all.cta" />
                                    <HelIcon iconName="arrow-right" />
                                </a>
                            </div>
                            <div className="services-rest">
                                <ServicesGrid services={services} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        services: state.services.allServices,
        isLoading: state.services.loading,
        isError: state.services.error,
    }
}
export default connect(mapStateToProps)(AllServices)