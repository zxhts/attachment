import {observable, action, computed,runInAction,toJS} from 'mobx';
import {takePhoto,selectImgs,previewPhoto} from 'tplus-mobile-jsbridge';
import env from 'mutants-env';
import _findIndex from 'lodash/findIndex';
import { InputItem } from 'antd-mobile';
const {platform,constant} = env;
export default class AttachmentStore {

    @observable images = [];

    @observable docs = [];

    @observable imageMaxSize = 5;

    @observable rowLength = 4;

    isEdit = false;

    constructor(){
        this.imageMaxSize = 5;
        this.rowLength = 4;
        this.images = [];
        this.docs = [];
        this.isEdit = false;
    }

    @action init(){
        this.images = [];
        this.docs = [];
        this.isEdit = false;
    }

    @action setImageMaxSize(maxSize){
        this.imageMaxSize = maxSize;
    }

    @action setRowLength(rowLength){
        this.rowLength = rowLength;
    }

    @action setImages(images){
        images.forEach((images)=>{
            if(images && !!images.originalUrl && !!images.thumbUrl && !!images.originalSize){

            }else{
                throw new Error('image should be {originalUrl,thumbUrl,originalSize}');
            }
        });
        this.images = images;
    }

    @action setDocs(docs){
        this.docs = docs;
    }

    @action takePhoto(){
        const callback = {
            success: (pics)=>{
                console.log('pics=======',pics);
                this.concatImages(pics);
            },
            fail: (err)=>{
               console.log('takePhoto.err======',err); 
            }
        };
        takePhoto({watermarkText:''},callback);
    }

    @action selectImgs(){
        const callback = {
            success: (pics)=>{
                this.concatImages(pics);
            },
            fail: (err)=>{
               console.log('selectImgs.err======',err); 
            }
        };
        selectImgs(
            {
                selectedCount:this.images.length,
                maxCount:this.imageMaxSize
            },
        callback);
    }

    @action concatImages(pics){
        this.isEdit = true;
        if(constant.platform.chanjet == platform){
            //先将之前渲染的nativeurl替换成neturl
            let picLength = pics.length;
            for(var i=picLength-1;i>=0;i--){
                let index = _findIndex(this.images,(img)=>{
                    return img.originalSize == 0 && img.nativeUrl == pics[i].nativeUrl;
                });
                if(index > -1){
                    this.images[index].originalUrl = pics[i].originalUrl;
                    this.images[index].thumbUrl = pics[i].thumbUrl;
                    this.images[index].originalSize = pics[i].originalSize;
                    pics.splice(i,1);
                }
            }

            //然后执行合并操作
            let allPicLength = this.images.length + pics.length;
            if(allPicLength > this.imageMaxSize ){
                this.images = this.images.concat(pics).splice(0,this.imageMaxSize);
            }else{
                this.images = this.images.concat(pics);
            }
        }else{
            let allPicLength = this.images.length + pics.length;
            if(allPicLength > this.imageMaxSize ){
                this.images = this.images.concat(pics).splice(0,this.imageMaxSize);
            }else{
                this.images = this.images.concat(pics);
            }
        }
        
    }

    @action deleteImage(index){
        this.images.splice(index,1);
        this.isEdit = true;
    }
    
    @action deleteDoc(index){
        this.docs.splice(index,1);
        this.isEdit = true;
    }

    @action previewImage(index){
        const previewImages = toJS(this.images).map(item=>item.originalUrl);
        previewPhoto(previewImages,index,'0',(scrollIndexed)=>{
            console.log('scrollIndexed========',scrollIndexed);
        });
    }


}