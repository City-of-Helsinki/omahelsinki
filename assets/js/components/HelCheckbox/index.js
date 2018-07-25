import React, {Component} from 'react';
import {ButtonGroup, Button} from 'reactstrap'
import classnames from 'classnames'

class HelCheckbox extends Component {
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
        const {data, direction} = this.props
        const {selectedFields} = this.state

        return (
            <div className={classnames('hel-checkbox', {'horizontal': direction === 'horizontal', 'vertical': direction === 'vertical'})}>
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

HelCheckbox.defaultProps = {
    direction: 'vertical',
}

export default HelCheckbox
