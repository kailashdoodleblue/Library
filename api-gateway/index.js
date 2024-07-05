const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express();
const config = require('./config')

const routes = {
  '/booklist': config.BOOKLIST,
  '/order': config.ORDER,
  '/user': config.USER,
  '/payment': config.PAYMENT
}
for (const route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({ target }))
}

app.listen(3003, () => {
  console.log('API Gateway running on port 3003');
});
