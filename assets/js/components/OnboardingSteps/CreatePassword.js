import React from 'react';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';


const CreatePassword = ({intl, onChange, data: {password, passwordRepeat}}) => {

    // TODO: (if passwords are used) password validation.

    const onChangeHandler = (event) => {
        const target = event.target;
        const data = {[target.name]: target.value};
        onChange(data);
    };

    return (
        <div className="onboarding-create-password">
            <div className="title">
                <h3>{intl.formatMessage({id: 'onboarding.createPassword.heading'})}</h3>
                <small><strong>{intl.formatMessage({id: 'onboarding.hint.required'})}</strong></small>
            </div>
            <Form onChange={onChangeHandler}>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label for='password'>
                                {intl.formatMessage({id: 'onboarding.label.password'})}
                            </Label>
                            <Input id='password' name='password' type='password' defaultValue={password} />
                        </FormGroup>
                    </Col>
                    
                    <Col sm={6}>
                        <FormGroup>
                            <Label for='passwordRepeat'>
                                {intl.formatMessage({id: 'onboarding.label.passwordRepeat'})}
                            </Label>
                            <Input id='passwordRepeat' name='passwordRepeat' type='password' defaultValue={passwordRepeat} />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

CreatePassword.propTypes = {
    data: PropTypes.shape({
        password: PropTypes.string,
        passwordRepeat: PropTypes.string,
    }),
    onChange: PropTypes.func,
}

export default injectIntl(CreatePassword);
