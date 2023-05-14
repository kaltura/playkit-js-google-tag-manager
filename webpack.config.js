const path = require('path');

module.exports = (env, { mode }) => {
  return {
    target: 'web',
    entry: './src/index.ts',
    optimization: {
      minimize: mode !== 'development'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { configFile: mode === 'development' ? 'tsconfig.dev.json' : 'tsconfig.json' },
          exclude: /node_modules/
        },
        {
          test: /\.scss/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  localIdentName: '[local]_[hash:base64:5]',
                  namedExport: true
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: mode === 'development'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: 'playkit-google-tag-manager.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    externals: {
      '@playkit-js/kaltura-player-js': 'root KalturaPlayer'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'demo')
      },
      client: {
        progress: true
      }
    }
  };
};
