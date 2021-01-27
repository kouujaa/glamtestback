const auth = {}

auth.key = {
  $filter: 'env',
  'development': 'development-key',
  'sandbox': '12345',
  'production': process.env.JWT_SECRET || '12345',
  'test': 'test-key',
  $default: 'Iamuniquekeytoken'
}

auth.expires = {
  $filter: 'env',
  'development': '30d',
  'sandbox': '30d',
  'production': '30d',
  'test': '30d',
  $default: '30d'
}

auth.verifyOptions = {
  algorithms: ['HS256']
}

module.exports = auth
