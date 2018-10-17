import React, {Component} from 'react'
import axios from 'axios'
import {Button} from 'reactstrap'
import {FormattedMessage} from 'react-intl'
import {profileApiUrl, tunnistamoUrl, profileToken, tunnistamoToken} from '../../settings'
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
        

        const profileConfig = {
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

        let userProfileData = axios.get(`${profileApiUrl}/profile/`, profileConfig).then(res => {
            data.userProfileData = res.data.results;
        });

        const tunnistamoConfig = {headers: {'Authorization': `Bearer ${tunnistamoToken}`}};
        
        let userServiceData =  axios.get(`${tunnistamoUrl}/v1/service/`, tunnistamoConfig).then(res => {
            data.userServiceData = res.data.results;
        });

        let userLoginEntryData = axios.get(`${tunnistamoUrl}/v1/user_login_entry/`, tunnistamoConfig).then(res => {
            data.userLoginEntryData = res.data.results;
        });

        let userConsentData = axios.get(`${tunnistamoUrl}/v1/user_consent/`, tunnistamoConfig).then(res => {
            data.userConsentData = res.data.results;
        });
        
        Promise.all( [userProfileData, userServiceData, userLoginEntryData, userConsentData]).then( values => {
            console.log('DATA--',data);
            this.downloadData(data);
        });
    }
    
    render() {
        return(
            <Button
                className="downloadButton"
                type="submit"
                color="primary"
                onClick={() => this.getDataAndDownload()}
            >
                <FormattedMessage id="app.button.downloadData" />
            </Button>
        );
    }

}

export default DownloadOwnData;
