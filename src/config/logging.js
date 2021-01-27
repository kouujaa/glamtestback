const logging = {}
const filebeatUri = process.env.FILEBEAT_URI || 'http://beat:9090/events'
const filebeatToken = process.env.FILEBEAT_TOKEN || '123'

logging.ops = {
  interval: 1000
}

logging.reporters = {}
logging.reporters.console = [
  {
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{ log: '*', response: '*' }]
  },
  {
    module: 'good-console'
  },
  'stdout'
]

logging.reporters.file = [
  {
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{
      log: '*',
      response: '*'
    }]
  },
  {
    module: 'good-squeeze',
    name: 'SafeJson'
  }
]

logging.reporters.http = [
  {
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{
      log: '*',
      error: '*',
      response: '*',
      request: '*'
    }]
  }
  // ,
  // {
  //   module: 'good-http',
  //   args: [filebeatUri, {
  //     threshold: 0,
  //     wreck: {
  //       headers: { 'x-api-key': filebeatToken }
  //     }
  //   }]
  // }
]

module.exports = logging
