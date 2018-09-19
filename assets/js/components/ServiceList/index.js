import React from 'react'
import {CardDeck} from 'reactstrap'
import Service from '../Service'

const ServiceList = ({services}) => {
    return (
        <CardDeck>
            {services.map((service) => <Service service={service} key={service.id}/>)}
        </CardDeck>
    )
}

export default ServiceList
