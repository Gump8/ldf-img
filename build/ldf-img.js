!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.LDFimg=e():t.LDFimg=e()}(this,function(){return function(t){function e(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var a={};return e.m=t,e.c=a,e.i=function(t){return t},e.d=function(t,a,n){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,a){"use strict";!function(t,e){var a=function(){var t=this;t.removeDom(),t.createDom()};a.prototype={options:{maxWH:1024,quality:200,FDkey:"picture"},backData:{dataURL:"",Blob:"",fileFormData:"",W:0,H:0,name:"",size:0},init:function(t,e){var a=this;if(t.maxWH&&(a.options.maxWH=t.maxWH),t.quality&&(a.options.quality=t.quality),t.FDkey){if("string"!=typeof t.FDkey)return void alert("FDkey应为字符!");a.options.FDkey=t.FDkey}var n=document.getElementById("ldf-input-file");n.click(),n.addEventListener("change",function(t){var n=t.target.files,i=n[0],o=i.type.replace("gif","png"),r=Math.round(i.size/1024),c=i.name;a.backData.name=c,a.backData.size=r;var d=new FileReader;d.readAsDataURL(i),d.onload=function(){var t=d.result;a.WHcompress(o,c,t,a.options.quality,function(t){t.compressSizeRate<.92?a.sizeCompress(o,c,t.newImgData,t.compressSizeRate,function(){"function"==typeof e&&e(a.backData)}):"function"==typeof e&&e(a.backData)})},d.onloadend=function(){a.removeDom(),a.createDom()}})},createDom:function(){var t=this,e=document.body||document.documentElement,a='<div class="ldf-dom-container" style="display: none">\n                            <canvas id="ldf-canvas"></canvas>\n                            <input id="ldf-input-file" type="file" accept="image/*">\n                         </div>'.trim();t.isChromePC()&&(a='<div class="ldf-dom-container" style="display: none">\n                            <canvas id="ldf-canvas"></canvas>\n                            <input id="ldf-input-file" type="file" accept="image/gif,image/png,image/jpeg,image/jpg,image/bmp">\n                         </div>'.trim()),e.insertAdjacentHTML("beforeEnd",a)},removeDom:function(){for(var t=document.getElementsByClassName("ldf-dom-container"),e=0;e<t.length;e++)t[e].parentNode.removeChild(t[e])},isChromePC:function(){var e=t.navigator.userAgent;return!(!/Windows NT/.test(e)&&!/Macintosh/.test(e)||!/Chrome/.test(e))},WHcompress:function(t,e,a,n,i){var o=this,r=new Image;r.src=a,r.onload=function(){var a=r.width,n=r.height,c=o.dWH(a,n,o.options.maxWH),d=document.getElementById("ldf-canvas"),s=d.getContext("2d");d.width=c.width,d.height=c.height,s.clearRect(0,0,d.width,d.height),s.drawImage(r,0,0,d.width,d.height);var l=d.toDataURL(t,.92),u=o.fileSizeKB(l),f=o.qualityRate(l,o.options.quality);if(o.backData.W=c.width,o.backData.H=c.height,o.backData.size=u,f>=.92){var m=o.dataURLtoBlob(l,t),p=o.toFileFormData("",m,e);o.backData.dataURL=l,o.backData.size=u,o.backData.Blob=m,o.backData.fileFormData=p}"function"==typeof i&&i({compressSizeRate:f,newImgData:l})}},sizeCompress:function(t,e,a,n,i){var o=this,r=new Image;r.src=a,r.onload=function(){var a=r.width,c=r.height,d=o.dWH(a,c,o.options.maxWH),s=document.getElementById("ldf-canvas"),l=s.getContext("2d");s.width=d.width,s.height=d.height,l.clearRect(0,0,s.width,s.height),l.drawImage(r,0,0,s.width,s.height);var u=s.toDataURL(t,n),f=o.fileSizeKB(u),m=o.dataURLtoBlob(u,t),p=o.toFileFormData("",m,e);o.backData.dataURL=u,o.backData.size=f,o.backData.Blob=m,o.backData.fileFormData=p,"function"==typeof i&&i({newImgData:u})}},dWH:function(t,e,a){var n={width:t,height:e};return Math.max(t,e)>a?t>e?(n.width=a,n.height=Math.round(e*(a/t)),n):(n.height=a,n.width=Math.round(t*(a/e)),n):n},fileSizeKB:function(t){return Math.round(3*t.split(",")[1].length/4/1024)},qualityRate:function(t,e){var a=this,n=a.fileSizeKB(t),i=Math.round((e-1)/n*100)/100;return i},dataURLtoBlob:function(t,e){for(var a=atob(t.split(",")[1]),n=t.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(a.length),o=new Uint8Array(i),r=0;r<a.length;r++)o[r]=a.charCodeAt(r);return e&&(n=e),new Blob([i],{type:n,lastModifiedDate:new Date})},toFileFormData:function(t,e,a){var n=this,i=new FormData,o=n.options.FDkey;if(e)return i.append(o,e,a),i;var r=n.dataURLtoBlob(t,fileType);return i.append(o,r,a),i}},t.LDFimg=a}(window),t.exports=LDFimg}])});