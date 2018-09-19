import React from 'react'
import {connect} from 'react-redux'
import {Card, CardImg, CardBody, CardLink, CardText, CardTitle} from 'reactstrap'

const Service = ({service, type, locale}) => {
    const image = service.image || 'https://via.placeholder.com/360x240'
    const name = service.name[locale]
    const url = service.url[locale]
    const description = service.description[locale]
    return (
        <Card>
            <CardImg top src={image} />
            <CardBody>
                <CardTitle><CardLink href={url}>{name}</CardLink></CardTitle>
                <CardText>{description}</CardText>
            </CardBody>
        </Card>
    )
}

const mapStateToProps = state => ({
    locale: state.intl.locale,
})
export default connect(mapStateToProps)(Service)
