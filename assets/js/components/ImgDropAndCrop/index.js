import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Dropzone from 'react-dropzone'
/*eslint-disable */
import ReactCrop from 'react-image-crop'
/*eslint-enable */

import { FormattedMessage, injectIntl } from 'react-intl'
import { image64toCanvasRef } from './ReusableUtils'

const imageMaxSize = 1000000 // 1 mb
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => {
  return item.trim()
})
class ImgDropAndCrop extends Component {
  constructor(props) {
    super(props)
    this.imagePreviewCanvasRef = React.createRef()
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
            <p>
              <FormattedMessage id="app.profile.picture.select.new" />
            </p>
            <Dropzone
              onDrop={this.handleOnDrop}
              multiple={false}
              maxSize={imageMaxSize}
              accept={acceptedFileTypes}
            >
              <FormattedMessage id="app.profile.picture.select.infoText" />
            </Dropzone>
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

// In the name of IE11-compatibility
/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */
;(function(view) {
  'use strict'
  var Uint8Array = view.Uint8Array,
    HTMLCanvasElement = view.HTMLCanvasElement,
    canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
    is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
    to_data_url = 'toDataURL',
    base64_ranks,
    decode_base64 = function(base64) {
      var len = base64.length,
        buffer = new Uint8Array(((len / 4) * 3) | 0),
        i = 0,
        outptr = 0,
        last = [0, 0],
        state = 0,
        save = 0,
        rank,
        code,
        undef
      while (len--) {
        code = base64.charCodeAt(i++)
        rank = base64_ranks[code - 43]
        if (rank !== 255 && rank !== undef) {
          last[1] = last[0]
          last[0] = code
          save = (save << 6) | rank
          state++
          if (state === 4) {
            buffer[outptr++] = save >>> 16
            if (last[1] !== 61 /* padding character */) {
              buffer[outptr++] = save >>> 8
            }
            if (last[0] !== 61 /* padding character */) {
              buffer[outptr++] = save
            }
            state = 0
          }
        }
      }
      // 2/3 chance there's going to be some null bytes at the end, but that
      // doesn't really matter with most image formats.
      // If it somehow matters for you, truncate the buffer up outptr.
      return buffer
    }
  if (Uint8Array) {
    base64_ranks = new Uint8Array([
      62,
      -1,
      -1,
      -1,
      63,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      -1,
      -1,
      -1,
      0,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51
    ])
  }
  if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
    if (!canvas_proto.toBlob)
      canvas_proto.toBlob = function(callback, type /*, ...args*/) {
        if (!type) {
          type = 'image/png'
        }
        if (this.mozGetAsFile) {
          callback(this.mozGetAsFile('canvas', type))
          return
        }
        if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
          callback(this.msToBlob())
          return
        }

        var args = Array.prototype.slice.call(arguments, 1),
          dataURI = this[to_data_url].apply(this, args),
          header_end = dataURI.indexOf(','),
          data = dataURI.substring(header_end + 1),
          is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
          blob
        if (Blob.fake) {
          // no reason to decode a data: URI that's just going to become a data URI again
          blob = new Blob()
          if (is_base64) {
            blob.encoding = 'base64'
          } else {
            blob.encoding = 'URI'
          }
          blob.data = data
          blob.size = data.length
        } else if (Uint8Array) {
          if (is_base64) {
            blob = new Blob([decode_base64(data)], { type: type })
          } else {
            blob = new Blob([decodeURIComponent(data)], { type: type })
          }
        }
        callback(blob)
      }

    if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
      canvas_proto.toBlobHD = function() {
        to_data_url = 'toDataURLHD'
        var blob = this.toBlob()
        to_data_url = 'toDataURL'
        return blob
      }
    } else {
      canvas_proto.toBlobHD = canvas_proto.toBlob
    }
  }
})(
  (typeof self !== 'undefined' && self) ||
    (typeof window !== 'undefined' && window) ||
    this.content ||
    this
)
