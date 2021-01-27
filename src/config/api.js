//import pkg from '../../package.json'
const pkg = require('../../package.json')
const api = {
  auth: false,
  info: {
    title: 'v2 API',
    description: ' ',
    version: pkg.version
  },
  debug: true,
  jsonEditor: false,
  // swaggerUIPath: {
  //   $filter: 'env',
  //   production: '//myapp-api-documentation.s3-website-us-west-2.amazonaws.com/',
  //   $default: '/swaggerui/'
  // },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ 'jwt': [] }]
}

module.exports = api
