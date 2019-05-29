# 图像压缩, 上传前处理
  Image Compress for Upload 图片压缩

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

方式1 
npm install ldf-img
import 'ldf-img';
var demo = new LDFimg();

方式2
<script src="./ldf-img.min.js"></script>

var demo = new LDFimg();
```

### 原生js
```javascript
<body>
  <h2 id="click">Click Me</h2>
</body>
<script src="../src/ldf-img.js"></script>
<script>
    document.getElementById('click').onclick = function (e) {
        //实例化
        var demo = new LDFimg();

        /*
        * 初始化
        * demo.init({maxWH: 1024,quality: 200,FDkey: 'picture'},function(imgData){...})
        * 建议普通图设置为:{ maxWH: 1920, quality: 200 }, 高清图设置为: { maxWH: 3000, quality: 480 }
        * */
        demo.init({
                // maxWH:压缩图片的最大一边的目标值,默认1024
                // 图片可能长大于宽, 宽大于长
                // 1. 若大于源图的最大一边, 不进行宽高压缩
                // 2. 若小于源图的最大一边, 进行宽高的等比压缩, 保证图片不变形
                maxWH: 1024,
          
                // quality: 压缩图片体积大小的目标值,默认200(kb),
                // 1. 大于经过宽高压缩后不会再进行质量压缩
                // 2. 经过宽高压缩后的大小可能远小于目标值
                // 3. 若目标值过小, 可能无法压缩到目标值的大小
                //    因为canvas画布的宽高有最小像素限制
                // 4. 若不能达到目标值不可再进行压缩, 不然图片就无法看了
                quality: 200,

                // 若maxWH, quality 均大于源图, 返回源图数据
          
                //FDkey: 返回的FormData数据的key (默认'picture')
                //此属性与后端验证有关,须与后端代码相结合设置此属性值
                FDkey: 'picture',
            },
            function (imgData) {
                // 保留源图的属性: type、name
                // 后端会进行类型验证, 这两个属性有时是必须的
                console.log('FormData 数据',imgData.fileFormData);
              
                // 保留源图的属性: type
                console.log('Blob 数据',imgData.Blob);

                //dataURL(base64) 数据
                console.log('dataURL(base64):',imgData.dataURL);

                console.log('源图的宽 W:',imgData.W);

                console.log('源图的高 H:',imgData.H);

                console.log('源图名(含后缀) name:',imgData.name);
              
                //小于1时为0
                console.log('源图大小 KB:',imgData.size);
            });
    }
</script>
```

