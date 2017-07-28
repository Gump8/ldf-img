# 图像压缩, 上传前处理
  Compress Image for Upload

## Features  实现功能特点

- 图片宽高等比压缩, 质量压缩
- 压缩后返回图片的属性: 宽(W)、高(H)、大小(size(kb)), 图片数据: dataURL(base64)、Blob、FormData
- 返回的Blob数据包含源图的属性: type
- 返回的FormData数据包含源图的属性: type、name
- 使用简单, 无需在dom中放入input标签, 只需引入文件实例化即可
- 经测试, 兼容主流的主流的iOS, Android版本、微信、支付宝(UC浏览器)
