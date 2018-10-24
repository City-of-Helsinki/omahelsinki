import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {Form, Row, Col} from 'reactstrap';
import HelTextInput from '../HelTextInput'
import React, {Component} from 'react';

class CreatePassword extends Component {
    state = {
        currentPassword: '',
    }
    // TODO: (if passwords are used) password validation.

    onChangeHandler = (event) => {
        const target = event.target;
        const data = {[target.name]: target.value};
        this.props.onChange(data);
    };

    passwordOnChange = (e) => {
        this.setState({
            currentPassword: e.target.value,
        })
    }
    render() {
        const {intl, data: {password, passwordRepeat}} = this.props
        
        return (
            <div className="onboarding-create-password">
                <div className="title">
                    <h3>{intl.formatMessage({id: 'onboarding.createPassword.heading'})}</h3>
                    <small><strong>{intl.formatMessage({id: 'onboarding.hint.required'})}</strong></small>
                </div>
                <Form onChange={this.onChangeHandler}>
                    <Row>
                        <Col sm={6}>
                            <HelTextInput
                                label={intl.formatMessage({id: 'onboarding.label.password'})}
                                id='password'
                                name='password'
                                type='password' 
                                defaultValue={password}
                                onChange={this.passwordOnChange}
                            />
                        </Col>
                        
                        <Col sm={6}>
                            <HelTextInput
                                label={intl.formatMessage({id: 'onboarding.label.passwordRepeat'})}
                                id='passwordRepeat'
                                name='passwordRepeat'
                                type='password' 
                                defaultValue={passwordRepeat}
                            />
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

CreatePassword.propTypes = {
    data: PropTypes.shape({
        password: PropTypes.string,
        passwordRepeat: PropTypes.string,
    }),
    onChange: PropTypes.func,
}

export default injectIntl(CreatePassword);
