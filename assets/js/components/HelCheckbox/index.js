import React, {Component} from 'react';
import {ButtonGroup, Button} from 'reactstrap'

export default class HelCheckbox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFields: [],
        }
    }

    onSelect = (selected) => {
        const {selectedFields} = this.state

        const index = selectedFields.indexOf(selected);
        if (index < 0) {
            selectedFields.push(selected);
        } else {
            selectedFields.splice(index, 1);
        }
        this.setState({selectedFields: [...selectedFields]});
    }

    render() {
        const {data} = this.props
        const {selectedFields} = this.state

        return (
            <div className="hel-checkbox">
                <ButtonGroup>
                    {data.map((d, index) => {
                        return (
                            <Button 
                                onClick={() => this.onSelect(d)}
                                key={index}
                                active={selectedFields.includes(d)}
                            >{d.label}</Button>
                            // TODO: use translation in label
                        )
                    })}
                </ButtonGroup>
            </div>
        );
    }
}
