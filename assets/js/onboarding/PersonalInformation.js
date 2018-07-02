import React from 'react';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Label} from 'reactstrap';

const PersonalInformation = ({intl, data: {firstname, lastname, email, ofAge}, onChange}) => {
    const onChangeHandler = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const data = {[target.name]: value};
        onChange(data);
    };
    return (
        <div>
            <h3>{intl.formatMessage({id: 'onboarding.personalInformation.heading'})}</h3>
            <strong>{intl.formatMessage({id: 'onboarding.hint.required'})}</strong>
            <Form onChange={onChangeHandler}>
                <FormGroup>
                    <Label for='firstName'>
                        {intl.formatMessage({id: 'onboarding.label.firstname'})}
                    </Label>
                    <Input id='firstname' name='firstname' defaultValue={firstname} />
                </FormGroup>
                <FormGroup>
                    <Label for='lastname'>
                        {intl.formatMessage({id: 'onboarding.label.lastname'})}
                    </Label>
                    <Input id='lastname' name='lastname' defaultValue={lastname} />
                </FormGroup>
                <FormGroup>
                    <Label for='email'>
                        {intl.formatMessage({id: 'onboarding.label.email'})}
                    </Label>
                    <Input id='email' name='email' type='email' defaultValue={email} />
                </FormGroup>
                <FormGroup check>
                    <Label for='ofAge' check>
                        <Input id='ofAge' name='ofAge' type='checkbox' defaultValue={ofAge} />{' '}
                        {intl.formatMessage({id: 'onboarding.label.ofAge'})}
                    </Label>
                </FormGroup>
            </Form>
            <small>{intl.formatMessage({id: 'onboarding.hint.ofAge'})}</small>
        </div>
    );
}

PersonalInformation.propTypes = {
    data: PropTypes.shape({
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        email: PropTypes.string,
        ofAge: PropTypes.bool,
    }),
    onChange: PropTypes.func,
}

export default injectIntl(PersonalInformation);
