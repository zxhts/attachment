import _findIndex from 'lodash/findIndex';
const fileSchemas = ['https://','http://','file://'];
const docPreviews = ['txt','excel','word','ppt','pdf'];
export default class FileUtils{
    static getURLFileType(fileUrl){
         if(!!fileUrl && _findIndex(fileSchemas,(fileSchema)=>{return fileUrl.indexOf(fileSchema)})>-1){
            // 后缀获取
            let suffix = '';
            // 获取类型结果
            let result = '';
            try {
                fileUrl = fileUrl.split('?')[0];
                let flieArr = fileUrl.split('.');
                suffix = flieArr[flieArr.length - 1].toLowerCase();
            } catch (err) {
                console.error('getURLFileType parse url error======',err);
                suffix = '';
            }
            // fileUrl无后缀返回 false
            if (!suffix) {
                result = 'other';
                return result;
            }
            // 图片格式
            let imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
            // 进行图片匹配
            result = imglist.some(function (item) {
                return item == suffix;
            });
            if (result) {
                result = 'image';
                return result;
            };
            // 匹配txt
            let txtlist = ['txt'];
                result = txtlist.some(function (item) {
                return item == suffix;
            });
            if (result) {
                result = 'txt';
                return result;
            };
            // 匹配 excel
            let excelist = ['xls', 'xlsx'];
            result = excelist.some(function (item) {
                return item == suffix;
            });
            if (result) {
                result = 'excel';
                return result;
            };
            // 匹配 word
            let wordlist = ['doc', 'docx'];
            result = wordlist.some(function (item) {
                return item == suffix;
            });
            if (result) {
                result = 'word';
                return result;
            };
            // 匹配 pdf
            let pdflist = ['pdf'];
            result = pdflist.some(function (item) {
                return item == suffix;
            });
            if (result) {
                result = 'pdf';
                return result;
            };
            // 匹配 ppt
            let pptlist = ['ppt','pptx'];
                result = pptlist.some(function (item) {
                return item == suffix;
            });
            if (result) {
                result = 'ppt';
                return result;
            };
            // zip rar
            let ziplist = ['zip','rar'];
                result = ziplist.some(function (item) {
                return item == suffix;
            });
            if (result) {
                result = 'zip';
                return result;
            };
            // // 匹配 视频
            // let videolist = ['mp4', 'm2v', 'mkv'];
            //     result = videolist.some(function (item) {
            //     return item == suffix;
            // });
            // if (result) {
            //     result = 'video';
            //     return result;
            // };
            // // 匹配 音频
            // let radiolist = ['mp3', 'wav', 'wmv'];
            //     result = radiolist.some(function (item) {
            //     return item == suffix;
            // });
            // if (result) {
            //     result = 'radio';
            //     return result;
            // }
            // 其他 文件类型
            result = 'other';
            return result;
         }else{
             throw new Error(`url : ${fileUrl} is unvalid!`);
         }

    }

    static isDocPrview(filetype){
        return _findIndex(docPreviews,(docPreview)=>{
            return filetype == docPreview;
        })>-1;
    }
}