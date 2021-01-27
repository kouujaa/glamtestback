module.exports = {
  portal: process.env.PORTAL || 'http://localhost:3000',
  tld: {
    $filter: 'env',
    development: '',
    sandbox: '',
    production: '',
    $default: 'http://localhost:4052'
  },
  protocol: {
    $filter: 'env',
    development: 'http',
    test: 'http',
    sandbox: 'https',
    production: 'https',
    $default: 'http'
  }
}
