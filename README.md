# 图像压缩, 上传前处理
  Image Compress for Upload

## Features  实现功能特点

- 图片宽高等比压缩, 质量压缩
- 压缩后返回图片的属性: 宽(W)、高(H)、大小(size(kb)), 图片数据: dataURL(base64)、Blob、FormData
- 返回的Blob数据包含源图的属性: type
- 返回的FormData数据包含源图的属性: type、name
- 使用简单, 无需在dom中放入input标签, 只需引入文件实例化即可
- 经测试, 兼容主流的iOS, Android版本、微信、支付宝(UC浏览器)

## Example  使用示例
### 使用自动化构建工具
```javascript
npm install ldf-img

import {LDFimg} from './path/ldf-img.min'
```

### 原生js
```javascript
<body>
  <h2 id="click">Click Me</h2>
</body>
<script src="../build/ldf-img.min.js"></script>

<script>
    document.getElementById('click').onclick = function (e) {
        //实例化
        var demo = new LDFimg();

        /*
        * 初始化
        * demo.init({maxWH: 1024,quality: 600,FDkey: 'picture'},function(imgData){})
        * */
        demo.init({
                /*
                * maxWH:压缩图片的最大一边的目标值(默认1024)
                * 图片可能长大于宽, 宽大于长
                * 1. 若大于源图的最大一边, 不进行宽高压缩
                * 2. 若小于源图的最大一边, 进行宽高的等比压缩, 保证图片不变形
                * */
                maxWH: 1024,

                /*
                * quality: 压缩图片体积大小的目标值(默认200(kb))
                * 1. 大于经过宽高压缩后不会再进行质量压缩
                * 2. 经过宽高压缩后的大小可能远小于目标值
                * 3. 若目标值过小, 可能无法压缩到目标值的大小,
                *    因为canvas画布的宽高有最小像素限制
                * 4. 若不能达到目标值不可再进行压缩, 不然图片就无法看了
                * */
                quality: 200,

                /*
                * 若maxWH, quality 均大于源图, 返回源图数据
                * */

                /*
                * FDkey: 返回的FormData数据的key (默认'picture')
                * 此属性与后端验证有关,须与后端代码相结合设置此属性值
                * */
                FDkey: 'picture',
            },
            function (imgData) {
                /*
                * FormData 数据
                * 保留源图的属性: type、name
                * 后端会进行类型验证, 这两个属性都是必须的
                * 为实现这个经历了重重障碍, 网上找到的结果是有各种问题的......
                * */
                console.dir(imgData.fileFormData);

                /*
                * Blob 数据
                * 保留源图的属性: type
                * */
                console.dir(imgData.Blob);

                /*
                * dataURL(base64) 数据
                * */
                console.log('dataURL(base64):',imgData.dataURL);

                /*
                * 图片的宽
                * */
                console.log('W:',imgData.W);

                /*
                * 图片的高
                * */
                console.log('H:',imgData.H);

                /*
                * 图片大小(KB)
                * 小于1时为0
                * */
                console.log('KB:',imgData.size);
            });
    }
</script>
```

