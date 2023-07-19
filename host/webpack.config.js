const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const isCapBuild = process.env.CAP_BUILD;

const remotes =
  isCapBuild == null
    ? // Configuration for when developing locally
      {
        about: 'about@http://localhost:8081/remoteEntry.js',
        list: 'list@http://localhost:8082/remoteEntry.js',
      }
    : // Configuration for when building for capacitor
      {
        about: `about@about/remoteEntry.js`,
        list: `list@list/remoteEntry.js`,
      };

const deps = require('./package.json').dependencies;
module.exports = (_, argv) => ({
  // output: {
  //   publicPath: 'http://localhost:8080/',
  // },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes,
      // remotes: {
      //   about: "about@http://localhost:8081/remoteEntry.js",
      //   list: "list@http://localhost:8082/remoteEntry.js",
      // },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
});
