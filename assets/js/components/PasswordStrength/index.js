import React, {Component} from 'react';
import zxcvbn from 'zxcvbn'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import classnames from 'classnames'
import {FormattedMessage} from 'react-intl'

export default class PasswordStrength extends Component {

    state = {
        message: '',
    }

    getPasswordStatus = (score) => {
        let str = ''
        switch(score) {
            case 4:
                str = <FormattedMessage id="password.strong" />
                break;
            case 3:
                str = <FormattedMessage id="password.ok" />
                break;
            case 2:
            case 1:
                str = <FormattedMessage id="password.notStrongEnough" />
                break;
            case 0:
                str = <FormattedMessage id="password.cantBeEmpty" />
                break;
            default: 
                str = ''
        }
        
        return str
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.inputText !== nextProps.inputText) {
            this.setState({
                message: nextProps.inputText ? zxcvbn(nextProps.inputText) : nextProps.inputText,
            })
        }
    }

    render() {
        const {message} = this.state
        const suggestions = get(message, 'feedback.suggestions')
        const warning = get(message, 'feedback.warning')
        const score = get(message, 'score')

        let suggestionText = ''
        const scoreStr = this.getPasswordStatus(score)
        
        if (!isEmpty(suggestions)) {
            suggestionText = suggestions.map((suggest, index) => {
                return (
                    <p key={index}><small>{`* ${suggest}`}</small></p>
                )
            })
        }
        return (
            <div className={classnames('oma-password-strength', `strength-${score}`)}>
                <p>{scoreStr}</p>
                {suggestionText}
                {warning &&
                    <p><small>{`* ${warning}`}</small></p>
                }
            </div>
        );
    }
}
