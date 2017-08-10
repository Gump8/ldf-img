// webpack配置

var webpack = require('webpack');

module.exports = {
    entry: {
        'ldf-img': './src/ldf-img.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        // 浏览器环境在window下注册LDFimg
        library: 'LDFimg',
        // 同时支持AMD/CMD
        libraryTarget: 'umd'
    },
//	resolve: {
//		extensions: ['js'],
//		modules: [
//			resolve('src'),
//			resolve('node_modules')
//		],
//		alias: {
//			'src': resolve('src')
//		}
//	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',  //注意这里的use是对象
                }
            }
        ]
    },

    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]

};
