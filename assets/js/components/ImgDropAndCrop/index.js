import React, {Component} from 'react'
import {Button} from 'reactstrap'
import Dropzone from 'react-dropzone'
/*eslint-disable */
import ReactCrop from 'react-image-crop'
/*eslint-enable */

import {FormattedMessage, injectIntl} from 'react-intl'
import {image64toCanvasRef} from './ReusableUtils';

const imageMaxSize = 1000000 // 1 mb
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => {return item.trim()})
class ImgDropAndCrop extends Component {
    constructor(props){
        super(props)
        this.imagePreviewCanvasRef = React.createRef()
        this.state = {
            imgSrc: null,
            crop: {
                aspect: 1 / 1,
            },
            pixelCrop: null,
        }
    }

    verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert(this.props.intl.formatMessage({id: 'profile.fileSize.error'}))
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert(this.props.intl.formatMessage({id: 'profile.fileType.error'}))
                return false
            }
            return true
        }
    }

    handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            this.verifyFile(rejectedFiles)
        }

        if(files && files.length > 0) {
            const isVerified = this.verifyFile(files)
            if (isVerified) {
                const currentFile = files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener('load', () => {
                    this.setState({
                        imgSrc: myFileItemReader.result,
                        crop: {
                            x: 20,
                            y: 5,
                            aspect: 1,
                            height: 60,
                        },
                        disabled: false,
                    })
                }, false)

                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }

    handleOnCropChange = (crop) => {
        this.setState({crop:crop})
    }

    handleOnCropComplete = (crop, pixelCrop) => {
        const canvasRef = this.imagePreviewCanvasRef.current
        const {imgSrc} = this.state
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
        this.setState({pixelCrop:pixelCrop})
    }

    onReady = (event) => {
        event.preventDefault()
        const canvasRef = this.imagePreviewCanvasRef.current
        canvasRef.toBlob(blob => this.props.getCroppedImage(blob))
    }

    render() {
        const {imgSrc} = this.state
        return(
            <div>
                {imgSrc !== null ?
                    <div>
                        <p><FormattedMessage id="app.profile.picture.cropImage" /></p>
                        <ReactCrop 
                            src={imgSrc}
                            crop={this.state.crop}
                            onComplete={this.handleOnCropComplete} 
                            onChange={this.handleOnCropChange}/>
                        <br />
                        <canvas ref={this.imagePreviewCanvasRef} style={{display: 'none'}}></canvas>
                    </div> 
                    : 
                    <div>
                        <p><FormattedMessage id="app.profile.picture.select.new" /></p>
                        <Dropzone
                            onDrop={this.handleOnDrop}
                            multiple={false}
                            maxSize={imageMaxSize}
                            accept={acceptedFileTypes} 
                        ><FormattedMessage id="app.profile.picture.select.infoText" /></Dropzone>
                    </div>
                }
                { this.state.pixelCrop &&
                    <Button
                        className="cropButton"
                        color="primary"
                        onClick={this.onReady}
                    >
                        <FormattedMessage id="app.button.saveCroppedImage" />
                    </Button>
                }
            </div>
        )
    }
}

export default (injectIntl(ImgDropAndCrop))
