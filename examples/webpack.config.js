module.exports = {
    entry: [
        __dirname + '/src/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        contentBase: __dirname + '/dist'
    }
};