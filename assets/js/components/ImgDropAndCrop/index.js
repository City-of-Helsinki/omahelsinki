import React, {Component} from 'react'
import {Button} from 'reactstrap'
import Dropzone from 'react-dropzone'
/*eslint-disable */
import ReactCrop from 'react-image-crop'
/*eslint-enable */

import {connect} from 'react-redux'
import {FormattedMessage, injectIntl} from 'react-intl'
import {image64toCanvasRef, extractImageFileExtensionFromBase64} from './ReusableUtils';

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
                alert(<FormattedMessage id="profile.fileSize.error" /> + currentFileSize + <FormattedMessage id="byte.size.error" />)
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert('This file is not allowed. Only images are allowed.')
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
                    //console.log(myFileItemReader.result)
                    this.setState({
                        imgSrc: myFileItemReader.result,
                    })
                }, false)

                myFileItemReader.readAsDataURL(currentFile)
            }
        }
    }

    handleImageLoaded = (image) => {
        //console.log(Image)
    }

    handleOnCropChange = (crop) => {
        this.setState({crop:crop})
    }

    handleOnCropComplete = (crop, pixelCrop) => {
        console.log(crop, pixelCrop)
        const canvasRef = this.imagePreviewCanvasRef.current
        const {imgSrc} = this.state
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
        this.setState({pixelCrop:pixelCrop})
    }

    handleOnCropUpload = (event) => {
        event.preventDefault()
        const {imgSrc} = this.state
        const canvasRef = this.imagePreviewCanvasRef.current
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc)
        const imageData64 = canvasRef.toDataURL('/image' + fileExtension)
        const myFilename = 'User1' + fileExtension
        console.log(myFilename)
        //const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
        this.props.getCroppedImage(imageData64);
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
                            onImageLoaded={this.handleImageLoaded}
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
                        >Drop image here / Click to upload</Dropzone>
                    </div>
                }
                { this.state.pixelCrop &&
                    <Button
                        className="cropButton"
                        color="primary"
                        onClick={this.handleOnCropUpload}
                    >
                        <FormattedMessage id="app.button.saveCroppedImage" />
                    </Button>
                }
            </div>
        )
    }
}

//export default ImgDropAndCrop

export default (injectIntl(ImgDropAndCrop))
