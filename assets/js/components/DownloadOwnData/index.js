import React, {Component} from 'react'
import {Button} from 'reactstrap'
import axios from 'axios'
import lodashGet from 'lodash/get'

//import {profileApiUrl} from '../../settings'
class DownloadOwnData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: [],
        }
    }

    componentDidMount() {
        const token = lodashGet(window, `API_TOKENS['https://api.hel.fi/auth/profiles']`)
        console.log('This is our token ',token)
        console.log('  Token ends here')
        const config = {
            baseURL: 'https://profile-api.test.hel.ninja/profile-test/v1',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        console.log('Config is here ', config)

        axios.get('https://profile-api.test.hel.ninja/profile-test/v1/profile/', config)
            .then(res => {
                console.log(res.data.results)
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
