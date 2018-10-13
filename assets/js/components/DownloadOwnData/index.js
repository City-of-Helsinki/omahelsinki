import React, {Component} from 'react'
import axios from 'axios'
import lodashGet from 'lodash/get'
import {Button} from 'reactstrap'

//import {profileApiUrl} from '../../settings'
class DownloadOwnData extends Component {

    downloadData = (obj) => {
        const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj))

        var a = document.createElement('a');
        a.href = 'data:' + data;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
        
    getDataAndDownload() {
        const profileToken = lodashGet(window, `API_TOKENS['https://api.hel.fi/auth/profiles']`)
        const token = window.TUNNISTAMO_ACCESS_TOKEN

        let config = {
            baseURL: 'https://profile-api.test.hel.ninja/profile-test/v1',
            headers: {
                'Authorization': `Bearer ${profileToken}`,
            },
        };

        const data = {
            userProfileData: {},
            userServiceData: {},
            userLoginEntryData: {},
            userConsentData: {},
        };

        let userProfileData = axios.get('https://profile-api.test.hel.ninja/profile-test/v1/profile/', config).then(res => {
            data.userProfileData = res.data.results;
        });

        config = {...(config), headers: {'Authorization': `Bearer ${token}`}};
        
        let userServiceData =  axios.get('https://api.hel.fi/sso-test/v1/service/', config).then(res => {
            data.userServiceData = res.data.results;
        });

        let userLoginEntryData = axios.get('https://api.hel.fi/sso-test/v1/user_login_entry/', config).then(res => {
            data.userLoginEntryData = res.data.results;
        });

        let userConsentData = axios.get('https://api.hel.fi/sso-test/v1/user_consent/', config).then(res => {
            data.userConsentData = res.data.results;
        });
        
        Promise.all( [userProfileData, userServiceData, userLoginEntryData, userConsentData]).then( values => {
            console.log('DATA--',data);
            this.downloadData(data);
        });
    }
    
    render() {
        return(
            <Button onClick={() => this.getDataAndDownload()}>Download Data</Button>
        );
    }

}

export default DownloadOwnData
