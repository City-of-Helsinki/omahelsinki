import React from 'react';
import {injectIntl} from 'react-intl';

const Welcome = ({intl}) => {
    return (
        <div className="onboarding-welcome">
            <h2>{intl.formatMessage({id: 'onboarding.welcome.heading'})}</h2>
            <p>{intl.formatMessage({id: 'onboarding.welcome.text'})}</p>
        </div>
    );
};

export default injectIntl(Welcome);
