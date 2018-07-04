import React, {Component} from 'react';
import {FormGroup, Label, Input} from 'reactstrap'

class HelTextInput extends Component {
    render() {
        const {className, type, id, placeHolder, label, name, helpText, ...rest} = this.props

        return (
            <FormGroup className={className ? `profile-hel-text ${className}` : `profile-hel-text`}>
                <Label for={id}>
                    {label}
                </Label>

                <Input 
                    type={type}
                    id={id}
                    placeholder={placeHolder}
                    name={name}
                    {...rest}
                />
                <small className="profile-hel-text__help text-muted">
                    {helpText}
                </small>
            </FormGroup>
        );
    }
}

export default HelTextInput
