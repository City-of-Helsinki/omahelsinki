import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

class ImgDropAndCrop extends Component {
    render() {
        return(
            <div>
                <h1>Drag and Crop</h1>
                <Dropzone>Drop File Here</Dropzone>
            </div>
        )
    }
}

export default ImgDropAndCrop
