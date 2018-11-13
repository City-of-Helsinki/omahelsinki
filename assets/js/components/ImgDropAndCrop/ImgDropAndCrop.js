import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap'
import Dropzone from 'react-dropzone'
/*eslint-disable */
import ReactCrop from 'react-image-crop'
/*eslint-enable */

import './canvas-toBlob'

import { FormattedMessage, injectIntl } from 'react-intl'
import { image64toCanvasRef } from './ReusableUtils'

const imageMaxSize = 1024 * 1024 * 10 // 10 megabytes
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => {
  return item.trim()
})
class ImgDropAndCrop extends Component {
  constructor(props) {
    super(props)
    this.imagePreviewCanvasRef = React.createRef()
    this.dropzone = React.createRef()
    this.state = {
      imgSrc: null,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        aspect: 1 / 1
      },
      pixelCrop: null
    }
  }

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0]
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if (currentFileSize > imageMaxSize) {
        alert(this.props.intl.formatMessage({ id: 'profile.fileSize.error' }))
        return false
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert(this.props.intl.formatMessage({ id: 'profile.fileType.error' }))
        return false
      }
      return true
    }
  }

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles)
    }

    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files)
      if (isVerified) {
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener(
          'load',
          () => {
            this.setState({
              imgSrc: myFileItemReader.result
            })
          },
          false
        )

        myFileItemReader.readAsDataURL(currentFile)
      }
    }
  }

  handleOnCropChange = crop => {
    this.setState({ crop: crop })
  }

  handleOnCropComplete = (crop, pixelCrop) => {
    // This timeout gives time for IE to get it's s*it together
    // Without timeout IE doesn´t get the ref.current right and it crashes
    // So it's a kludge to get this working with IE11
    setTimeout(() => {
      const canvasRef = this.imagePreviewCanvasRef.current
      const { imgSrc } = this.state

      image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
      this.setState({ pixelCrop: pixelCrop })
    }, 200)
  }

  onReady = event => {
    event.preventDefault()

    // This timeout gives time for IE to get it's s*it together
    // Without timeout IE doesn´t get the ref.current right and it crashes
    // So it's a kludge to get this working with IE11
    setTimeout(() => {
      const canvasRef = this.imagePreviewCanvasRef.current
      canvasRef.toBlob(blob => this.props.getCroppedImage(blob))
    }, 200)
  }

  render() {
    const { imgSrc } = this.state

    return (
      <div>
        {imgSrc !== null ? (
          <div>
            <p>
              <FormattedMessage id="app.profile.picture.cropImage" />
            </p>
            <ReactCrop
              src={imgSrc}
              crop={this.state.crop}
              onComplete={this.handleOnCropComplete}
              onChange={this.handleOnCropChange}
            />
            <br />
            <canvas
              ref={this.imagePreviewCanvasRef}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div>
            <Row>
              <Col xs={12}>
                <Dropzone
                  ref={this.dropzone}
                  onDrop={this.handleOnDrop}
                  multiple={false}
                  maxSize={imageMaxSize}
                  accept={acceptedFileTypes}
                  className="dropzone"
                  acceptClassName="dropzone__success"
                >
                  <FormattedMessage id="app.dropzone.instruction" />
                  <FormattedMessage id="app.dropzone.or" />
                  <Button>
                    <FormattedMessage id="app.dropzone.upload" />
                  </Button>
                </Dropzone>
              </Col>
            </Row>
          </div>
        )}
        {this.state.pixelCrop && (
          <Button className="cropButton" color="primary" onClick={this.onReady}>
            <FormattedMessage id="app.button.saveCroppedImage" />
          </Button>
        )}
      </div>
    )
  }
}

export default injectIntl(ImgDropAndCrop)
