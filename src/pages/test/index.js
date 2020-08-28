import React,{Component} from 'react';
import {TopNavPage} from 'tplus-mobile-navigator';
import {openLightApp,getSourceAppParam,share,getLocationInfo,displayNearby,testAdd} from 'tplus-mobile-jsbridge';
@TopNavPage
class Test extends Component  {

  navTitle(){
    return '测试附件界面';
  }

  constructor(props) {
    super(props);
    if(location.href.indexOf('appId')>-1&&location.href.indexOf('ext')>-1){
      console.log('appParam=======',getSourceAppParam());
    }
  }

  componentWillMount(){
  }

  enterEditAttachment = ()=>{
    //默认状态是只读状态
    this.pushForResult('attachment',
    {
      action:'edit',
      imageMaxSize:10,
      imageRowLength:4,
      "images": [
        {
          "originalUrl": "https://static.esn.ren/139990/2889021/201912/2/15752901388448f6dfcd213dec31b3206a4e02c632.jpg",
          "originalSize": "333147",
          "thumbUrl": "https://static.esn.ren/139990/2889021/201912/2/15752901388448f6dfcd213dec31b3206a4e02c632.jpg.square.thumb.jpg"
        },
        {
          "originalUrl": "https://static.esn.ren/139908/719246/201911/27/15748464508305e0d5ed67c5e432bd5ae75e7d7da9.jpg",
          "originalSize": "161428",
          "thumbUrl": "https://static.esn.ren/139908/719246/201911/27/15748464508305e0d5ed67c5e432bd5ae75e7d7da9.jpg.square.thumb.jpg"
        },
        {
          "originalUrl": "https://static.esn.ren/139990/2889021/201912/2/1575290635338f25546696203cb15f5b37ed560691.jpg",
          "originalSize": "182234",
          "thumbUrl": "https://static.esn.ren/139990/2889021/201912/2/1575290635338f25546696203cb15f5b37ed560691.jpg.square.thumb.jpg"
        },
        {
          "originalUrl": "https://static.esn.ren/139990/2889021/201912/2/1575290637169b3740a70d34e2c5e6744f307070eb.jpg",
          "originalSize": "181726",
          "thumbUrl": "https://static.esn.ren/139990/2889021/201912/2/1575290637169b3740a70d34e2c5e6744f307070eb.jpg.square.thumb.jpg"
        },
        {
          "originalUrl": "https://static.esn.ren/139990/2889021/201912/2/1575290638adf89e4d666e7d48f525f7f9acae5dcf.jpg",
          "originalSize": "302812",
          "thumbUrl": "https://static.esn.ren/139990/2889021/201912/2/1575290638adf89e4d666e7d48f525f7f9acae5dcf.jpg.square.thumb.jpg"
        },
        {
          "originalUrl": "https://static.esn.ren/139990/2889021/201912/2/1575292014e1643f18c9cc141a88ca43e8ee2720c7.jpg",
          "originalSize": "515981",
          "thumbUrl": "https://static.esn.ren/139990/2889021/201912/2/1575292014e1643f18c9cc141a88ca43e8ee2720c7.jpg.square.thumb.jpg"
        },
        {
          "originalUrl": "https://static.esn.ren/139990/2889021/201912/2/1575292014e1643f18c9cc141a88ca43e8ee2720c7.jpg",
          "originalSize": "515981",
          "thumbUrl": "https://static.esn.ren/139990/2889021/201912/2/1575292014e1643f18c9cc141a88ca43e8ee2720c7.jpg.square.thumb.jpg"
        }
      ],
      "docs": [
        {
          "fileUrl": "https://newretail-static-pro-bj.oss-cn-beijing.aliyuncs.com/tmp/T%2B%E5%8F%8B%E7%A9%BA%E9%97%B4%E5%AF%B9%E6%8E%A5%E4%B8%80%E6%9C%9F%E9%A1%B9%E7%9B%AE%E6%80%BB%E7%BB%93.pptx",
          "fileName": "友空间对接一期项目总结",
          "fileSize": "9.42KB",
          "fileType": "pptx"
        },
        {
          "fileUrl": "https://newretail-static-pro-bj.oss-cn-beijing.aliyuncs.com/tmp/T%2B%E5%8F%8B%E7%A9%BA%E9%97%B4%E5%AF%B9%E6%8E%A5%E4%B8%80%E6%9C%9F%E9%A1%B9%E7%9B%AE%E6%80%BB%E7%BB%93.pptx",
          "fileName": "友空间对接一期项目总结",
          "fileSize": "9.42KB",
          "fileType": "pptx"
        },{
          "fileUrl": "https://newretail-static-pro-bj.oss-cn-beijing.aliyuncs.com/tmp/T%2B%E5%8F%8B%E7%A9%BA%E9%97%B4%E5%AF%B9%E6%8E%A5%E4%B8%80%E6%9C%9F%E9%A1%B9%E7%9B%AE%E6%80%BB%E7%BB%93.pptx",
          "fileName": "友空间对接一期项目总结",
          "fileSize": "9.42KB",
          "fileType": "pptx"
        }
      ]
    });
  }

  enterOrderApp = ()=>{
    openLightApp({appId:1249,ext:{remark:'test'}});
  }

  testRedirect = ()=>{
    window.localStorage['page'] = 'attachment';
    window.location.href = 'http://10.1.144.101:3000/test';
  }

  testGetLocation = ()=>{
    getLocationInfo();
  }

  testDisplayNearby = ()=>{
  }

  shareContent = ()=>{
    const shareContent = {};
    shareContent.title = `Galaxy 华为 S8`;
    shareContent.content = '1212 全网最低价 2888';
    shareContent.iconUrl = 'https://newretail-static-pro-bj.oss-cn-beijing.aliyuncs.com/tmp/s8.jpg';
    shareContent.shareUrl = 'https://m-b2bshop.chanjet.com/?#/goodsdetail/1936162?sharecode=11653228647700332&suppid=16532';
    // shareContent.shareUrl = encodeURI('https://m-b2bshop.chanjet.com/?#/goods-list-page/'+'{"type":"share","label":"推广","sharecode":'+shareCode+'}?sharecode='+shareCode+'&suppid='+supplierInfo.supplier_id);
    share(shareContent).then((res) => {
      console.log('share.response====',res);
    });
  }

  pageBackReceiveResult = (action, result)=>{
      if(action == 'attachment'){
        console.log('返回结果:',result);
      }
  }

  render() {
    return (
        <div>
            <div onClick={this.enterEditAttachment} style={{marginTop:'20px',fontSize:'0.2rem'}}>进入编辑附件页面</div>
            <div onClick={this.enterOrderApp} style={{marginTop:'20px',fontSize:'0.2rem'}}>进入下单应用</div>
            <div onClick={this.previewDoc} style={{marginTop:'20px',fontSize:'0.2rem'}}>测试文档预览</div>
            <div onClick={this.shareContent} style={{marginTop:'20px',fontSize:'0.2rem'}}>测试分享功能</div>
            <div onClick={this.testRedirect} style={{marginTop:'20px',fontSize:'0.2rem'}}>测试在线应用跳转</div>
            <div onClick={this.testGetLocation} style={{marginTop:'20px',fontSize:'0.2rem'}}>获取地址测试</div>
            <div onClick={this.testDisplayNearby} style={{marginTop:'20px',fontSize:'0.2rem'}}>测试123</div>
            <a href="tel:18511807815">call 1851180781</a>
        </div>
    );
  }
}

export default Test;