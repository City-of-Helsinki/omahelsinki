import React, {Component} from 'react';
import {ButtonGroup, Button} from 'reactstrap'
import {connect} from 'react-redux'
import classnames from 'classnames'


class HelCheckbox extends Component {

    render() {
        const {data, direction, selectedFields, language} = this.props
        return (
            <div className={classnames('hel-checkbox', {'horizontal': direction === 'horizontal', 'vertical': direction === 'vertical'})}>
                <ButtonGroup>
                    {data.map((d, index) => {
                        return (
                            <Button 
                                onClick={() => this.props.onSelect(d)}
                                key={index}
                                active={selectedFields && selectedFields.includes(d)}
                            >{d.label[language]}</Button>
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
        language: state.intl.locale,
    }
}

export default connect(mapStateToProps)(HelCheckbox)
