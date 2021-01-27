/**
 * Hello
 * Returns a hello world message and the hostname of the machine the
 * server is running on
 *
 * url: /hello
 */

 /**
   * System imports
   *
  **/

//import os from 'os'
const os = require('os')

/**
  * Plugin
  *
 **/

exports.register = (server, options, next) => {

  // Add the route
  server.route({
    method: 'GET',
    path: '/hello',
    config: {
      tags: ['api', 'heartbeat', 'hello'],
      validate: {},
      handler: (request, reply) => {
        reply({ hostname: os.hostname() })
      }
    }
  })

  next()

}

exports.register.attributes = {
  name: 'hello'
}
