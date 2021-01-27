/**
  * Socket
  *
**/
 
/**
  * Module imports
  *
**/
 
/**
 * Project imports
 *
**/

/**
 * Setup
 *
**/
//import Emitter from '../config/emitter'
const Emitter = require('../config/emitter')
exports.register = function (server, options, next) {
    var io = require('socket.io')(server.listener);
      io.on('connection', function (socket) {
        // Subscribe this socket to `action` events
        Emitter.on('action', function (action) {
            socket.emit('action', action);
        });
        Emitter.on('actionVendor', function (action) {
            socket.emit('actionVendor', action);
        });
         Emitter.on('actionItem', function (action) {
            socket.emit('actionItem', action);
        });
    });
  next();
};

exports.register.attributes = {
  name: 'socket'
};
 
