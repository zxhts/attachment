import React ,{Component} from 'react';
import {TopNavPage, NavUtils} from 'tplus-mobile-navigator';
import {Icon,Modal} from 'antd-mobile';
import ImageCard from './components/ImageCard';
import DocCard from './components/DocCard';
import './page.less';
import stores from '../../stores';
import {toJS} from 'mobx';
const attachmentStore = stores.attachmentStore;
const alert = Modal.alert;

@TopNavPage
class Attachment extends Component  {

  navTitle(){
    return '编辑附件';
  }


  constructor(props) {
    super(props);
    attachmentStore.init();
  }

  componentDidMount(){
    const {imageMaxSize,imageRowLength,images,docs} = this.pageParam();
    if(!!imageMaxSize){
      attachmentStore.setImageMaxSize(imageMaxSize);
    }
    if(!!images){
      attachmentStore.setImages(images);
    }
    if(!!docs){
      attachmentStore.setDocs(docs);
    }
    if(!!imageRowLength){
      attachmentStore.setRowLength(imageRowLength);
    }
  }

  navLeftIcon(){
      return (<Icon type="left" />);
  }

  navLeftClick(){
    const {isEdit} = attachmentStore;
    if(isEdit){
      alert('保存', '您还没有保存,确定返回吗?', [
        { text: '取消', onPress: () => {}},
        { text: '确定', onPress: () => {
          NavUtils.pop();
        }},
      ])
    }else{
      NavUtils.pop();
    }
  }

  navRightContent() {
    const {action='view'} = this.pageParam();
    if('edit'=== action){
      return <div onClick={this.confirm}>完成</div>
    }
  }

  confirm = ()=>{
    const {images, docs} = attachmentStore;
    let state = this.props.location.state || {};
    let result = {images: toJS(images), docs: toJS(docs)};
    if (state.backResult) { // 如果是上一个页面 正常this.pushForResult跳转过来的
      this.popAndReturn('attachment', result);
    } else if (state.backResultKey) { // 如果上一个页面，通过NavUtils.pushForResult跳转过来的
      NavUtils.popAndReturn('attachment', result, state.backResultKey);
    }
  }

  render() {
    const {action='view'} = this.pageParam();
    return (
      <div className = "attachment-container">
        <ImageCard action ={action}/>
        <DocCard action ={action}/>
      </div>
    );
  }
}

export default Attachment;