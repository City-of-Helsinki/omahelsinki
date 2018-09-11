import React, {Component} from 'react';
import {ButtonGroup, Button} from 'reactstrap'
import classnames from 'classnames'
import {connect} from 'react-redux';


class HelCheckbox extends Component {

    render() {
        const {data, direction} = this.props
        const {selectedFields} = this.props
        return (
            <div className={classnames('hel-checkbox', {'horizontal': direction === 'horizontal', 'vertical': direction === 'vertical'})}>
                <ButtonGroup>
                    {data.map((d, index) => {
                        return (
                            <Button 
                                onClick={() => this.props.onSelect(d)}
                                key={index}
                                active={selectedFields && selectedFields.includes(d)}
                            >{d.label[this.props.locale]}</Button>
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


const mapStateToProps = state =>{
    return{
        locale: state.intl.locale,
    }
}

export default connect(mapStateToProps)(HelCheckbox)
