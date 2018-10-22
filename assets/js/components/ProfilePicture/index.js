import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUserData} from '../../user/redux'

class ProfilePicture extends Component {
    componentDidMount() {
        this.props.fetchUserData()
    }

    render() {
        const {user} = this.props

        return (
            <div className="greetings-user-image" >
                <img src={user.image} alt="profile" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userReducer.user,
})

export default connect(mapStateToProps, {fetchUserData})(ProfilePicture)
