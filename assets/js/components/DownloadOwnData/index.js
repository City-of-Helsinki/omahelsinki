import React, {Component} from 'react'
import {Button} from 'reactstrap'

class DownloadOwnData extends Component {
    render() {
        return(
            <div>
                <Button
                    color="primary"
                    className="downloadButton"
                >
                Download Profile Data
                </Button>
            </div>
        );
    }

}

export default DownloadOwnData
