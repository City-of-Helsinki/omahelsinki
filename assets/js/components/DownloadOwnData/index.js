import React, {Component} from 'react'
import {Button} from 'reactstrap'
import axios from 'axios'

class DownloadOwnData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: [],
        }
    }

    componentDidMount() {
        const token = window.TUNNISTAMO_ACCESS_TOKEN
        const config = {
            headers: {'Authorization': 'Bearer' + token},
        }

        axios.get('https://profile-api.test.hel.ninja/profile-test/v1/profile/', config)
            .then(res => {
                console.log(res)
                this.setState({
                    profileData: res.data.results,
                })
            })
    }

    handleDownloadData = (event) => {
        event.preventDefault()
    }

    render() {
        return(
            <div>
                <Button
                    color="primary"
                    className="downloadButton"
                    onClick={this.handleDownloadData}
                >
                Download Profile Data
                </Button>
            </div>
        );
    }

}

export default DownloadOwnData
