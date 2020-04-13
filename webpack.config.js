const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniSccExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.prod === 'development';
const isProd = !isDev;

// Helpers
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
};

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoaders = (ext) => {
  const loaders = [
    {
      loader: MiniSccExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ];

  if (ext) {
    loaders.push(ext);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const options = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: []
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniSccExtractPlugin({
      filename: filename('css'),
      hmr: isDev
    })
  ];

  return base;
};

// Config
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.tsx'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  optimization: optimization(),
  resolve: {
    extensions: ['.js', '.png', '.ts', '.tsx'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  devServer: {
    port: 3000,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
    ]
  }
};
