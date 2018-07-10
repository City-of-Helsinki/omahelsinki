import React, {Component} from 'react';
import {Collapse, Button} from 'reactstrap';

export default class HelCollapsibleField extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            collapse: true,
        }
    }

    toggle = () => {
        this.setState({collapse: !this.state.collapse})
    }

    render() {
        const {title, children, collapsible} = this.props

        return (
            <div className="hel-collapsible-field">
                {collapsible ? <Button className="hel-collapsible-field__link" onClick={this.toggle}>{title}</Button> :
                    <p className="hel-collapsible-field__title">{title}</p>
                }
                <Collapse className="hel-collapsible-field__child" isOpen={collapsible ? this.state.collapse : true}>
                    {children}
                </Collapse>
            </div>
        );
    }
}
