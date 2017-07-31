//请求模块
var gulp = require('gulp');
// var sass = require('gulp-sass-china');
var browserSync = require('browser-sync').create();
// var browserSync = require('browser-sync');

//创建任务  编译sass文件

/*gulp.task('YJsass',function () {

   //查找需要编译的文件
    gulp.src('./src/sass/!*.scss')

        //文档流.  参数设置编译后css的格式
        //异步编译,sass编译错误停止编译,跳过下一个操作,直接reload
        .pipe(sass({outputStyle:'compact'}).on('error',sass.logError))

        //文档流.  输出文档的路径
        .pipe(gulp.dest('./src/css/'))

        //监听成功后,利用browser-sync 自动刷新页面
        .pipe(browserSync.reload({stream:true}))
});*/

//监听文件
// gulp.task('watchSass',function () {
//     gulp.watch('src/sass/test.scss',['testSass'])
// });

//创建任务. 监听文件, 各平台自动同步刷新
gulp.task('browser-sync',function () {
    browserSync.init({
        // open:true,
        open: "external",
        // server:{
        //     // baseDir:'./src'
        //     baseDir:'./'
        // },

        // host: "192.168.200.80",

        // host: "192.168.0.138",

        host: "192.168.1.105",

        ui: {
            port: 40001
        },
        //修改端口
        port:40003,

        //代理  npm install browser-sync
        proxy:'http://localhost:83/project/ldf-img/demo/LDFimg.html',

        //监听文件,改变后自动刷新 (方法一)
        // files:['./src/html/*.html','./src/js/*.js','./src/php/*.php']
        files:['./html/applyOrder/*.html','./html/orderDetail/*.html']

    });

    //监听文件,改变后自动刷新 (方法二)
    /*browserSync.watch([
        './html/applyOrder/!*.html',
        './html/orderDetail/!*.html'
    ]).on('change', browserSync.reload);*/

    //监听sass文件,有修改时执行编译任务
    // gulp.watch('./src/sass/*.scss',['YJsass']);
});