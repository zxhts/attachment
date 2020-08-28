import React, { Component } from 'react';
import {toJS} from 'mobx';
import {Toast,List,Icon} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import {observer} from 'mobx-react';
import stores from '../../../stores';
import {docPreview,hasAbility} from 'tplus-mobile-jsbridge';
import EventUtils from '../../../tools/EventUtils';
import FileUtils from '../../../tools/FileUtils';
import PropTypes from 'prop-types';
import './DocCard.less';
const attachmentStore = stores.attachmentStore;
@observer
class DocCard extends Component {

    previewDoc = (item)=>{
        const param = {url:item.fileUrl,name:item.fileName,type:item.fileType};
        docPreview(param);
    }

    deleteDoc(index,e){
        EventUtils.preventEvent(e);
        attachmentStore.deleteDoc(index);
    }
    
    render() {
        const {docs} = attachmentStore;
        const {action} = this.props;
        const isEdit = (action === 'edit');
        if(docs.length === 0){
            return null;
        }
        const docItems = docs.map((item,index)=>{
            const docType = FileUtils.getURLFileType(item.fileUrl);
            return (
                <Item
                    key={`doc_${index}`}
                    thumb={<i className={`iconfont icon${docType} icon`}></i>}
                    multipleLine
                    onClick={(e) => {
                        EventUtils.preventEvent(e);
                        if(FileUtils.isDocPrview(docType)){
                            this.previewDoc(item);
                        }else{
                            Toast.info(`不支持[${item.fileType}]格式文件的预览`, 1);
                        }
                    }}
                    extra={isEdit &&  <span class="iconfont iconguanbi icon-del" onClick={this.deleteDoc.bind(this,index)}></span>}
                >
                    {item.fileName} <Brief>{item.fileSize}</Brief>
                </Item>
            )
        });
        return (
           <List renderHeader={() => '文档信息'}>
                {docItems}
           </List>
        );
    }
}
DocCard.contextTypes = {
    action: PropTypes.string
}
export default DocCard;