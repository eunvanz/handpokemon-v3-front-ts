import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import Cropper from 'react-cropper';
import classNames from 'classnames';

import 'cropperjs/dist/cropper.css';
import { dataURItoBlob } from '../../libs/commonUtils';
import ImageTools from '../../libs/imageTool';

class PictureWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreview: false,
      previewImage: '',
      showCropper: false,
      onCrop: null,
      onCancelCrop: null,
      imageToCrop: null,
      isCropping: false,
    };
    this._hidePreview = this._hidePreview.bind(this);
    this._showPreview = this._showPreview.bind(this);
    this._cropImage = this._cropImage.bind(this);
  }

  _hidePreview() {
    this.setState({ showPreview: false });
  }

  _showPreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      showPreview: true,
    });
  }

  _cropImage(file) {
    const { type } = file;
    const { cropWidth, cropHeight } = this.props.cropOptions;
    if (type.indexOf('image') < 0) return false;
    if (this.props.useCrop) {
      return new Promise((resolve, reject) => {
        const onCrop = () => {
          this.setState({ isCropping: true }, () => {
            const convertedImageUrl = this.refs.cropper
              .getCroppedCanvas({ width: cropWidth, height: cropHeight })
              .toDataURL();
            const blob = dataURItoBlob(convertedImageUrl);
            const convertedFile = ImageTools.convertBlobToFile(
              blob,
              file.name,
              type
            );
            resolve(
              Object.assign(convertedFile, {
                uid:
                  this.props.fileList && this.props.fileList.length > 0
                    ? this.props.fileList[this.props.fileList.length - 1].uid +
                      1
                    : 0,
              })
            );
            this.setState({ showCropper: false, isCropping: false });
          });
        };
        const onCancelCrop = () => {
          reject();
          this.setState({ showCropper: false });
        };
        this.setState({
          showCropper: true,
          onCrop,
          onCancelCrop,
          imageToCrop: URL.createObjectURL(file),
        });
      });
    } else {
      return false;
    }
  }

  _handleOnChange = e => {
    const { onChange } = this.props;
    onChange(e);
  };

  render() {
    const {
      max,
      fileList = [],
      onRemove,
      useCrop,
      disabled,
      className,
      cropOptions,
      ...restProps
    } = this.props;
    const {
      showPreview,
      previewImage,
      showCropper,
      onCrop,
      onCancelCrop,
      imageToCrop,
      isCropping,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>이미지 추가</div>
      </div>
    );
    return (
      <div className={classNames('clearfix', className)} {...restProps}>
        {disabled && fileList && fileList.length > 0 && (
          <img
            className='cursor-pointer'
            src={fileList[0].url}
            width='200'
            onClick={() => this._showPreview(fileList[0])}
            alt='업로드 이미지'
          />
        )}
        {!disabled && (
          <Upload
            accept='image/*'
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType='picture-card'
            fileList={fileList}
            onPreview={this._showPreview}
            onChange={this._handleOnChange}
            beforeUpload={this._cropImage}
            onRemove={onRemove}
          >
            {fileList && fileList.length >= max ? null : uploadButton}
          </Upload>
        )}
        <Modal
          className='close-black'
          visible={showPreview}
          footer={null}
          onCancel={this._hidePreview}
          width={cropOptions.cropWidth + 48}
        >
          <img alt='미리보기' style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {useCrop && (
          <Modal
            title='영역 선택'
            visible={showCropper}
            onOk={onCrop}
            onCancel={onCancelCrop}
            okText='확인'
            cancelText='취소'
            confirmLoading={isCropping}
            maskClosable={false}
            // width={cropOptions.cropWidth + 48}
            width={Math.max(248, cropOptions.cropWidth + 48)}
          >
            <Cropper
              ref='cropper'
              src={imageToCrop}
              style={{ height: cropOptions.cropHeight, width: '100%' }}
              // Cropper.js options
              aspectRatio={1}
              setCanvasData={{ width: 200, height: 200 }}
              autoCropArea={1}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default PictureWall;
