/*
 * ldf-img
 * @author: ldf
 * githup: https://github.com/Gump8/ldf-img.git
 * */

// require('core-js(/library)/fn/object/assign');

(function (window, undefined) {
  const LDFimg = function () {
    const self = this;
    
    /*
        * 实例化时须确保删除掉前一个实例化产生的dom结构
        * 此插件只获取压缩的图片数据,与上传步骤完全分离
        * */
    self.removeDom();
    self.createDom();
  };
  LDFimg.prototype = {
    /*
        * 默认参数
        * */
    options: {
      maxWH: 1024,
      quality: 200,
      FDkey: 'picture',
    },
    /*
        * 最终返回的数据
        * */
    backData: {
      dataURL: '',
      Blob: '',
      fileFormData: '',
      W: 0,
      H: 0,
      name: '',
      size: 0,
    },
    /*
        * 初始化函数
        * 1. FileReader读取数据
        * 2. canvas等比压缩宽高,再压缩质量
        * 3. base64(URL)、Binary、FormData数据类型转换转换
        * */
    init(params, callback) {
      const self = this;
      
      /*
            * UC浏览器(支付宝)中不支持Object.assign
            * Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，
            * 比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，
            * 以及一些定义在全局对象上的方法
            * self.options = Object.assign({}, self.options, params);
            * */
      if (params.maxWH) {
        self.options.maxWH = params.maxWH;
      }
      if (params.quality) {
        self.options.quality = params.quality;
      }
      if (params.FDkey) {
        if (typeof params.FDkey !== 'string') {
          alert('FDkey应为字符!');
          return;
        }
        self.options.FDkey = params.FDkey;
      }
      
      console.log(self.options);
      console.log(params);
      
      const inputFile = document.getElementById('ldf-input-file');
      
      inputFile.click();
      inputFile.addEventListener('change', (e) => {
        const files = e.target.files;
        const file = files[0];
        // gif图会自动转换为png
        const fileType = file.type.replace('gif', 'png');
        const srcSizeKB = Math.round(file.size / 1024);
        const fileName = file.name;
        
        // 保存文件名
        self.backData.name = fileName;
        // 保存文件大小数据
        self.backData.size = srcSizeKB;
        console.log('srcSizeKB', srcSizeKB);
        
        const readURL = new FileReader();
        
        /*
                 * 将源文件读取为data: URL格式的字符串
                 * base64
                 * */
        readURL.readAsDataURL(file);
        readURL.onload = function () {
          const dataURL = readURL.result;
          // console.log('yuan',dataURL)
          console.log('源大小', self.fileSizeKB(dataURL));
          
          self.WHcompress(fileType, fileName, dataURL, self.options.quality, (data) => {
            if (data.compressSizeRate < 0.92) {
              self.sizeCompress(fileType, fileName, data.newImgData, data.compressSizeRate, () => {
                /*
                                * 质量压缩只能压一次
                                * 即使没有达到目标值也不能再压
                                * */
                typeof callback === 'function' && callback(self.backData);
              });
            } else {
              typeof callback === 'function' && callback(self.backData);
            }
          });
        };
        
        /*
                * 不管成功或失败都会执行
                * 解决若上传失败,再次选择同一张图时无法触发change事件问题
                * */
        readURL.onloadend = function () {
          self.removeDom();
          self.createDom();
        };
      });
    },
    /*
        * 把元素标签放入dom结构中, 解决IE兼容性问题
        * 完成后需删除
        * */
    createDom() {
      const self = this;
      
      const dom = document.body || document.documentElement;
      let inDom = `<div class="ldf-dom-container" style="display: none">
                            <canvas id="ldf-canvas"></canvas>
                            <input id="ldf-input-file" type="file" accept="image/*">
                         </div>`.trim();
      
      if (self.isChromePC()) {
        inDom = `<div class="ldf-dom-container" style="display: none">
                            <canvas id="ldf-canvas"></canvas>
                            <input id="ldf-input-file" type="file" accept="image/gif,image/png,image/jpeg,image/jpg,image/bmp">
                         </div>`.trim();
      }
      
      dom.insertAdjacentHTML('beforeEnd', inDom);
    },
    /*
        * 实例化时须确保删除掉前一个实例化产生的dom结构
        * 此插件只获取压缩的图片数据,与上传的步骤完全分离
        * */
    removeDom() {
      const dom = document.getElementsByClassName('ldf-dom-container');
      for (let i = 0; i < dom.length; i++) {
        dom[i].parentNode.removeChild(dom[i]);
      }
    },
    /*
        * chrome 64 位版本中会出现选择文件慢问题
        * */
    isChromePC() {
      const self = this;
      
      const agent = window.navigator.userAgent;
      if ((/Windows NT/.test(agent) || /Macintosh/.test(agent)) && /Chrome/.test(agent)) {
        return true;
      }
      return false;
    },
    /*
        * 压缩图片的宽高
        * */
    WHcompress(fileType, fileName, dataURL, quality, callback) {
      const self = this;
      
      const img = new Image();
      img.src = dataURL;
      img.onload = function () {
        // 图像宽高
        const srcW = img.width;
        const srcH = img.height;
        console.log('源 宽高', srcW, srcH);
        
        const _dWH = self.dWH(srcW, srcH, self.options.maxWH);
        console.log('dWH', _dWH);
        
        const canvas = document.getElementById('ldf-canvas');
        const context = canvas.getContext('2d');
        canvas.width = _dWH.width;
        canvas.height = _dWH.height;
        
        // 清空后, 重写画布
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const newImgData = canvas.toDataURL(fileType, 0.92);
        
        // 压缩宽高后的图像大小
        const newImgSize = self.fileSizeKB(newImgData);
        console.log('压缩宽高后大小', newImgSize);
        
        // 返回图像的压缩率
        const compressSizeRate = self.qualityRate(newImgData, self.options.quality);
        
        // 保存最终返回的图像的宽高
        self.backData.W = _dWH.width;
        self.backData.H = _dWH.height;
        self.backData.size = newImgSize;
        
        // 大于0.92 时, 不再进行质量压缩, 保存最终返回的数据
        if (compressSizeRate >= 0.92) {
          const blob = self.dataURLtoBlob(newImgData, fileType);
          console.log('blob', blob);
          const formData = self.toFileFormData('', blob, fileName);
          
          self.backData.dataURL = newImgData;
          self.backData.size = newImgSize;
          self.backData.Blob = blob;
          self.backData.fileFormData = formData;
        }
        
        typeof callback === 'function' && callback({
          compressSizeRate,
          newImgData,
        });
      };
    },
    /*
        * 压缩图片的质量
        * */
    sizeCompress(fileType, fileName, dataURL, qualityRate, callback) {
      const self = this;
      
      const img = new Image();
      img.src = dataURL;
      img.onload = function () {
        // 图像宽高
        const srcW = img.width;
        const srcH = img.height;
        
        const _dWH = self.dWH(srcW, srcH, self.options.maxWH);
        
        const canvas = document.getElementById('ldf-canvas');
        const context = canvas.getContext('2d');
        canvas.width = _dWH.width;
        canvas.height = _dWH.height;
        
        // 清空后, 重写画布
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const newImgData = canvas.toDataURL(fileType, qualityRate);
        
        const newImgSize = self.fileSizeKB(newImgData);
        console.log('文件类型', fileType, '质量压缩百分比', qualityRate);
        console.log('压缩质量后', newImgSize);
        
        // 保存最终返回的数据
        const blob = self.dataURLtoBlob(newImgData, fileType);
        console.log(blob);
        const formData = self.toFileFormData('', blob, fileName);
        
        self.backData.dataURL = newImgData;
        self.backData.size = newImgSize;
        self.backData.Blob = blob;
        self.backData.fileFormData = formData;
        
        typeof callback === 'function' && callback({
          newImgData,
        });
      };
    },
    /*
         * 长宽等比缩小
         * 图像的一边(长或宽)为最大目标值
         * */
    dWH(srcW, srcH, dMax) {
      const defaults = {
        width: Math.floor(srcW * 0.99),
        height: Math.floor(srcH * 0.99),
      };
      if (Math.max(srcW, srcH) > dMax) {
        if (srcW > srcH) {
          defaults.width = dMax;
          defaults.height = Math.round(srcH * (dMax / srcW));
          return defaults;
        }
        defaults.height = dMax;
        defaults.width = Math.round(srcW * (dMax / srcH));
        return defaults;
      }
      return defaults;
    },
    /*
        * 计算dataURL(base64)文件大小(KB)
        * */
    fileSizeKB(dataURL) {
      // const self = this;
      
      let sizeKB = 0;
      sizeKB = Math.round((dataURL.split(',')[1].length * 3 / 4) / 1024);
      
      return sizeKB;
    },
    /*
        * 计算toDataURL(type, encoderOptions)的质量压缩率
        * 0 ~ 1
        * */
    qualityRate(imgData, dsize) {
      const self = this;
      
      const fileSize = self.fileSizeKB(imgData);
      console.log('fileSize', fileSize);
      
      const dQualityRate = Math.floor((dsize - 1) / fileSize * 100) / 100;
      
      console.log('dsize', dsize);
      console.log('dQualityRate', dQualityRate);
      
      return dQualityRate;
    },
    /*
        * 转为Blob
        * */
    dataURLtoBlob(dataURL, fileType) {
      const self = this;
      
      const byteString = atob(dataURL.split(',')[1]);
      let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      if (fileType) {
        mimeString = fileType;
      }
      return new Blob([ab], { type: mimeString, lastModifiedDate: new Date() });
    },
    /*
        * 转换数据类型为:FormData
        * 关键在于写入文件名及其后缀(文件类型)
        * file.type不可写
        *
        * let file = new File([blob], fileName);
        * fd.append("picture", file);
        * 此方法在 iOS 中不兼容
        *
        * 选用此法: fd.append("picture", blob, fileName);
        * */
    toFileFormData(dataURL, blob, fileName) {
      const self = this;
      
      const fd = new FormData();
      const FDkey = self.options.FDkey;
      if (blob) {
        fd.append(FDkey, blob, fileName);
        return fd;
      }
      const blobData = self.dataURLtoBlob(dataURL, fileType);
      fd.append(FDkey, blobData, fileName);
      return fd;
    },
    
  };
  
  window.LDFimg = LDFimg;
}(window));

// module.exports = LDFimg;
// export default LDFimg;

/* eslint-disable */
