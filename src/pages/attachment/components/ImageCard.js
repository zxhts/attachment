import React, { Component } from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import EventUtils from '../../../tools/EventUtils';
import './ImageCard.less';
import {ActionSheet} from 'antd-mobile';
import { ActivityIndicator} from 'antd-mobile';
import stores from '../../../stores';
import {ImagePicker} from 'antd-mobile';
import PropTypes from 'prop-types';
const attachmentStore = stores.attachmentStore;

@observer
class ImageCard extends Component {
  

  showImageActionSheet = () => {
    const BUTTONS = ['拍照', '相册', '取消'];
    const ACTIONS = ['takePhoto','selectImgs'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      message: '请选择上传方式',
      maskClosable: true
    },
    (buttonIndex) => {
      if(buttonIndex == BUTTONS.length - 1) return;
      attachmentStore[ACTIONS[buttonIndex]]();
    });
  }

  takeImage = (event)=> {
    EventUtils.preventEvent(event);
    this.showImageActionSheet();
  }

  deleteImage = (index)=> {
    // EventUtils.preventEvent(event);
    attachmentStore.deleteImage(index);
  }

  previewImage = (index)=> {
    // EventUtils.preventEvent(event);
    attachmentStore.previewImage(index);
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    switch (type){
      case 'remove': this.deleteImage(index); return;
    }
  };

  renderImage() {
    const {images,imageMaxSize,rowLength} = attachmentStore;
    const {action} = this.props;
    const isEdit = (action === 'edit');
    console.log('isEdit====',isEdit);
    const files = images.map((item,index)=>{
      return {
        url:item.thumbUrl,
        index:`image_${index}`
      }
    });

    return (
      <ImagePicker
          length={rowLength}
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => {this.previewImage(index)}}
          selectable={ isEdit && (files.length < imageMaxSize)}
          onAddImageClick={this.takeImage}
          disableDelete = {!isEdit}
        />
    );

  }

  render() {
    const { images,imageMaxSize } = attachmentStore;
    //有本地图片  说明是中间的过程数据
    const hasNativeImg = toJS(images).some(item=>{
      return item.originalSize == 0;
    });
      
    return (
      <div>
        <div className='Head'>
          <div className='title' >
            <span>
            {`图片(${images.length}/${imageMaxSize}):`}
            </span>
            </div>
         </div>
         
          {hasNativeImg && <ActivityIndicator
            toast
            text="上传中..."
            animating={true}
          />}
          {this.renderImage()}
      </div>
    );

  }
}

ImageCard.contextTypes = {
  action: PropTypes.string
}

export default ImageCard;