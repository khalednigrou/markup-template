const path = require('path')
const Webpack = require('webpack')
const PugPlugin = require('pug-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production'

  return {
    target: 'web',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'eval-cheap-source-map',
    stats: isProd ? 'errors-only' : 'minimal',
    bail: isProd ? true : false,
    entry: require('./routes.js'),
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: 'auto',
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[id].js',
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
      },
    },
    resolve: {
      alias: {
        Views: path.join(__dirname, 'src/views/'),
        Config: path.join(__dirname, 'src/views/config/'),
        Includes: path.join(__dirname, 'src/views/includes/'),
        Layouts: path.join(__dirname, 'src/views/layouts/'),
        Images: path.join(__dirname, 'src/images/'),
        Fonts: path.join(__dirname, 'src/fonts/'),
        Styles: path.join(__dirname, 'src/styles/'),
        Scripts: path.join(__dirname, 'src/scripts/'),
      },
    },
    plugins: [
      // new Webpack.DefinePlugin({
      //   'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      // }),
      new PugPlugin({
        pretty: true,
        css: {
          filename: 'css/[name].[contenthash:8].css',
        },
      }),
      new ESLintPlugin({
        extensions: 'js',
        emitWarning: true,
        files: path.join('src', '**/*.m?js'),
      }),
      new StylelintPlugin({
        extensions: 's?(a|c)ss',
        files: path.join('src', '**/*.s?(a|c)ss'),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'static' }]
      })
    ],
    module: {
      rules: [
        // Scripts
        {
          test: /\.m?js$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, 'node_modules', '@dogstudio', 'highway'),
            path.resolve(__dirname, '../src'),
          ],
          use: {
            loader: "babel-loader",
          },
        },

        // HTML templates
        {
          test: /\.pug$/,
          loader: PugPlugin.loader,
          options: {
            data: {
              htmlLang: 'ja',
              metas: require('./src/views/data/metas.js'),
            }
          }
        },

        // Styles
        {
          test: /\.s?(a|c)ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },

        // Fonts
        {
          test: /\.(woff2?|ttf|otf|eot|svg)$/,
          type: 'asset/resource',
          include: /fonts/,
          generator: {
            // output filename of fonts
            filename: 'fonts/[name][ext][query]',
          },
        },

        // images
        {
          test: /\.(png|svg|jpe?g|webp)$/i,
          resourceQuery: { not: [/inline/] }, // ignore images with `?inline` query
          type: 'asset/resource',
          include: /images/, // images from `images` directory only, match posix and win paths
          generator: {
            // output filename of images
            filename: 'img/[name].[hash:8][ext]',
          },
        },

        // inline images: png or svg icons with size < 4 KB
        {
          test: /\.(png|svg)$/i,
          type: 'asset',
          include: /images/,
          exclude: /favicon/, // don't inline favicon
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // TODO: TEST file sizes
            },
          },
        },

        // force inline svg file containing `?inline` query
        {
          test: /\.(svg)$/i,
          resourceQuery: /inline/,
          type: 'asset/inline',
        },
      ],
    },

    performance: {
      hints: isProd ? 'error' : 'warning',
      // in development mode the size of assets is bigger than in production
      // maxEntrypointSize: isProd ? 1024000 : 4096000,
      // maxAssetSize: isProd ? 1024000 : 4096000,
    },

    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      client: {
        logging: 'error',
      },
      compress: true,
      hot: true,
      open: true,
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          usePolling: true,
        },
      },
    },
  }
}
