import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import HelIcon from '../HelIcon'

import {connect} from 'react-redux'
import {fetchUserData} from '../../user/redux'


class Greetings extends Component {

    componentDidMount() {
        this.props.fetchUserData()
    }

    render() {
        const {intl, tunnistamoUser, user} = this.props
        const hasImage = Boolean(user.image)

        return (
            <div className="greetings-container">
                {
                    hasImage ? (
                        <div className="greetings-user-image" >
                            <img src={user.image} alt="profile" />
                        </div>
                    ) : (
                        <div className="greetings-icon-container">
                            <HelIcon iconName="user-o"></HelIcon>
                        </div>
                    )
                }

                <div className="greetings-text-container">
                    <h2 className="greetings-text">{intl.formatMessage({id: 'app.userGreeting'})} {tunnistamoUser.first_name}</h2>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
    tunnistamoUser: state.userReducer.tunnistamoUser,
})

export default connect(mapStateToProps, {fetchUserData})(injectIntl(Greetings))

