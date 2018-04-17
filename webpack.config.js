module.exports = {
    watch: true,
    entry: './src/scaler.es6',
    output: {
        filename: 'build/scaler.js'
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};