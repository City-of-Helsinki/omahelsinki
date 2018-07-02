import React from 'react';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {Form, FormGroup, Input, Label} from 'reactstrap';

import If from '../components/If';

const toBool = (str) => str === 'true';

const Settings = (
    {
        intl,
        onChange,
        data: {enableNotifications, enabledNotifications, enabledMessages},
    }
) => {
    const enableNotificationsHandler = (event) => {
        const target = event.target;
        onChange({enableNotifications: toBool(target.value)});
    };
    const createHandler = (name, values) => (event) => {
        const target = event.target;
        const set = new Set(values);
        const prop = target.value;
        target.checked
            ? set.add(prop)
            : set.delete(prop);
        onChange({[name]: Array.from(set)});
    };
    const messagesHandler = createHandler('enabledMessages', enabledMessages);
    const notificationsHandler = createHandler('enabledNotifications', enabledNotifications);
    return (
        <div>
            <h2>{intl.formatMessage({id: 'onboarding.settings.heading'})}</h2>
            <p>{intl.formatMessage({id: 'onboarding.settings.text'})}</p>
            <Form>
                <FormGroup check onChange={enableNotificationsHandler}>
                    <Label check>
                        <Input
                            type='radio'
                            value={true}
                            defaultChecked={enableNotifications === true}
                        />{' '}
                        {intl.formatMessage({id: 'onboarding.label.enableNotifications'})}
                    </Label>
                    <Label check>
                        <Input
                            type='radio'
                            value={false}
                            defaultChecked={enableNotifications === false}
                        />{' '}
                        {intl.formatMessage({id: 'onboarding.label.disableNotifications'})}
                    </Label>
                </FormGroup>
                <If condition={enableNotifications}>
                    <FormGroup onChange={messagesHandler}>
                        <h3>{intl.formatMessage({id: 'onboarding.messages.heading'})}</h3>
                        <p>{intl.formatMessage({id: 'onboarding.messages.text'})}</p>
                        <Label check>
                            <Input
                                type='checkbox'
                                value='email'
                                defaultChecked={enabledMessages.includes('email')}
                            />{' '}
                            {intl.formatMessage({id: 'onboarding.label.email'})}
                        </Label>
                        <Label check>
                            <Input
                                type='checkbox'
                                value='sms'
                                defaultChecked={enabledMessages.includes('sms')}
                            />{' '}
                            {intl.formatMessage({id: 'onboarding.label.sms'})}
                        </Label>
                        <Label check>
                            <Input
                                type='checkbox'
                                value='app'
                                defaultChecked={enabledMessages.includes('app')}
                            />{' '}
                            {intl.formatMessage({id: 'onboarding.label.app'})}
                        </Label>
                    </FormGroup>
                    <FormGroup onChange={notificationsHandler}>
                        <h3>{intl.formatMessage({id: 'onboarding.notifications.heading'})}</h3>
                        <p>{intl.formatMessage({id: 'onboarding.notifications.text'})}</p>
                        <Label check>
                            <Input
                                type='checkbox'
                                value='event'
                                defaultChecked={enabledNotifications.includes('event')}
                            />{' '}
                            {intl.formatMessage({id: 'onboarding.label.notifyEvent'})}
                        </Label>
                        <Label check>
                            <Input
                                type='checkbox'
                                value='area'
                                defaultChecked={enabledNotifications.includes('area')}
                            />{' '}
                            {intl.formatMessage({id: 'onboarding.label.notifyArea'})}
                        </Label>
                        <Label check>
                            <Input
                                type='checkbox'
                                value='subject'
                                defaultChecked={enabledNotifications.includes('subject')}
                            />{' '}
                            {intl.formatMessage({id: 'onboarding.label.notifySubject'})}
                        </Label>
                    </FormGroup>
                </If>
            </Form>
        </div>
    );
};

Settings.propTypes = {
    data: PropTypes.shape({
        enableNotifications: PropTypes.boolean,
        enabledNotifications: PropTypes.array,
        enabledMessages: PropTypes.array,
    }),
    onChange: PropTypes.func,
};

export default injectIntl(Settings);
