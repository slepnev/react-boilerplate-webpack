const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniSccExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

console.log(process.env.ENV);
console.log(process.env.NODE_ENV);

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

const cssLoaders = (ext, module = false) => {
  const loaders = [
    {
      loader: MiniSccExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        modules: module,
        sourceMap: isDev
      }
    }
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
      PUBLIC_URL: process.env.PUBLIC_URL || '',
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist'),
        ignore: ['*.html']
      }
    ]),
    new MiniSccExtractPlugin({
      filename: filename('css'),
      hmr: isDev
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PUBLIC_URL: '/'
    })
  ];

  return base;
};

// Config
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    polyfill: ['@babel/polyfill'],
    main: ['./index.tsx'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.PUBLIC_URL || ''
  },
  optimization: optimization(),
  resolve: {
    extensions: ['.js', '.png', '.ts', '.tsx', '.scss', '.module.scss'],
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
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        use: [
          'desvg-loader/react',
          'svg-loader'
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /\.module.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.module.s[ac]ss$/,
        use: cssLoaders('sass-loader', true)
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
            loader: 'ts-loader'
          }
        ]
      },
    ]
  }
};
