import React from 'react'
import {connect} from 'react-redux'
import {Card, CardImg, CardBody, CardLink, CardText, CardTitle} from 'reactstrap'

const Service = ({service, locale}) => {
    const image = service.image
    const name = service.name[locale] || service.name['fi']
    const url = service.url[locale] || service.url['fi']
    const description = service.description[locale] || service.description['fi']
    return (
        <Card className="service">
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
