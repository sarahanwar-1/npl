const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other Webpack configurations...
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true, // Allows service worker to take control of the page as soon as it's ready
      skipWaiting: true,  // Forces waiting service worker to activate immediately
      runtimeCaching: [{
        urlPattern: /\.(?:html|css|js|svg|png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        handler: 'CacheFirst',  // Cache the files for offline usage
        options: {
          cacheName: 'assets-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
          },
        },
      }],
    }),
  ],
};


module.exports = {
  mode: 'production', // Set to 'development' for dev mode
  entry: path.resolve(__dirname, 'src/client/index.js'), // Path to your entry point file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // You can add more loaders here if necessary
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // Minify CSS files
      new CssMinimizerPlugin(),
    ],
  },
};
