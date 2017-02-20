'use strict'
var debug = require('debug')
module.exports = function (sock, options) {
  var heartbeatTimer
  var heartbeatSeq = 1
  sock.on('connect', function () {
    heartbeatTimer = setInterval(function () {
      if (typeof sock.send === 'function') {
        debug('send ping', heartbeatSeq)
        sock.send({action: 'ping', pingCount: heartbeatSeq++})
      } else {
        console.warn('no send function')
      }
    }, (options.heartbeatInterval || 60) * 1000)
  })

  sock.on('socket close', function () {
    if (!heartbeatTimer) return
    clearInterval(heartbeatTimer)
    heartbeatTimer = null
    heartbeatSeq = 1
  })
}
