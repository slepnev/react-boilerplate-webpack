const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware(
      '/api',
      {
        target: 'http://int.danytech.ru/bulk-texting-mgfn-ui',
        changeOrigin: true,
      }
    )
  );
};
