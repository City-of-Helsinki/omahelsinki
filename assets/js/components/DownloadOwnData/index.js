import React, {Component} from 'react'
import axios from 'axios'
//import lodashGet from 'lodash/get'

//import {profileApiUrl} from '../../settings'
class DownloadOwnData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //profileData: [],
            historyData: [],
        }
    }

    downloadData = (obj) => {
        const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj))

        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'data.json';
        a.innerHTML = 'Download Data';

        var container = document.getElementById('container');
        container.appendChild(a);
    }

    /*
    componentDidMount() {
        const token = lodashGet(window, `API_TOKENS['https://api.hel.fi/auth/profiles']`)

        const config = {
            baseURL: 'https://profile-api.test.hel.ninja/profile-test/v1',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    */
        
    componentDidMount() {
    
        const token = window.TUNNISTAMO_ACCESS_TOKEN

        const config = {
            baseURL: 'https://profile-api.test.hel.ninja/profile-test/v1',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    
        /*
        axios.get('https://profile-api.test.hel.ninja/profile-test/v1/profile/', config)
            .then(res => {
                //console.log(res.data.results)
                this.downloadData(res.data.results)
                this.setState({
                    profileData: res.data.results,
                })
            })
            */
        
        
        axios.get('https://api.hel.fi/sso-test/v1/user_login_entry/', config)
            .then(res => {
                console.log(res.data.results)
                this.downloadData(res.data.results)
                this.setState({
                    historyData: res.data.results,
                })
            })
        
    }
    

    render() {
        return(
            <div id="container">
            </div>
        );
    }

}

export default DownloadOwnData
