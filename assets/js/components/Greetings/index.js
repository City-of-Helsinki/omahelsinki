import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import HelIcon from '../HelIcon'
import {connect} from 'react-redux'
import {fetchUserData} from '../../user/redux'
import ProfilePicture from '../ProfilePicture'

class Greetings extends Component {

    componentDidMount() {
        this.props.fetchUserData()
    }

    render() {
        const {intl, tunnistamoUser, user} = this.props
        const hasImage = Boolean(user.image)
        const name = tunnistamoUser.first_name

        return (
            <div className="greetings-container">
                {
                    hasImage ? (
                        <ProfilePicture />
                    ) : (
                        <div className="greetings-icon-container">
                            <HelIcon iconName="user-o"></HelIcon>
                        </div>
                    )
                }

                <div className="greetings-text-container">
                    <h2 className="greetings-text">{intl.formatMessage({id: 'app.userGreeting'})} {name}</h2>
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

