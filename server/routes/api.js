// var httpProxy = require('http-proxy');
// var apiProxy = httpProxy.createProxyServer({
// 	target: 'http://api.somewhere.com',
// 	headers: {
// 		host: 'somewhere.com'
// 	}
// });

// module.exports = function(app) {
// 	app.get('/api/*', function(req, res) {
// 		apiProxy.web(req, res);
// 	});
// };

module.exports = function(app) {
  app.get('/api', function(req, res) {
    res.send('hello');
  });
};