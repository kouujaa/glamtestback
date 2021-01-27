module.exports = {
  cert: process.env.APN_CERT,
  key: process.env.APN_CERT_KEY,
  production: process.env.NODE_ENV === 'production' ? true : false
}
