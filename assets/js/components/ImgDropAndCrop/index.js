import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
/*eslint-disable */
import ReactCrop from 'react-image-crop'
/*eslint-enable */

import '../../../../node_modules/react-image-crop/dist/ReactCrop.css';
import {image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File} from './ReusableUtils';

const imageMaxSize = 100000000
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
        }
    }

    verifyFile = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert('This file is not allowed.' + currentFileSize + 'bytes is too large')
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
    }

    handleOnCropUpload = (event) => {
        event.preventDefault()
        const {imgSrc} = this.state
        const canvasRef = this.imagePreviewCanvasRef.current
        const fileExtension = extractImageFileExtensionFromBase64(imgSrc)
        const imageData64 = canvasRef.toDataURL('/image' + fileExtension)
        const myFilename = 'User1' + fileExtension
        console.log(myFilename)
        const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
        this.props.getCroppedImage(myNewCroppedFile)
        
        downloadBase64File(imageData64, myFilename);
    }


    render() {
        const {imgSrc} = this.state
        return(
            <div>
                {imgSrc !== null ?
                    <div>    
                        <ReactCrop 
                            src={imgSrc}
                            crop={this.state.crop}
                            onImageLoaded={this.handleImageLoaded}
                            onComplete={this.handleOnCropComplete} 
                            onChange={this.handleOnCropChange}/>
                        <br />
                        <p>Preview Canvas Crop</p>
                        <canvas ref={this.imagePreviewCanvasRef}></canvas>
                    </div> 
                    : 
                    <Dropzone
                        onDrop={this.handleOnDrop}
                        multiple={false}
                        maxSize={imageMaxSize}
                        accept={acceptedFileTypes} 
                    >Drop image here / Click to upload</Dropzone>
                }
                <button onClick={this.handleOnCropUpload}>Save Cropped Image</button>
            </div>
        )
    }
}

export default ImgDropAndCrop
