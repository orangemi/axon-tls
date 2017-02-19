'use strict'
module.exports = function (sock, options) {
  let heartbeatTimer
  let heartbeatCount = 0
  sock.on('connect', function () {
    heartbeatTimer = setInterval(function () {
      // TODO send interval
      if (typeof sock.send === 'function') {
        // use send
        sock.send({action: 'ping'})
      } else {
        console.warn('no send function')
      }
      // sock.
      heartbeatCount++
    }, (options.heartbeatInterval || 60) * 1000)
  })

  sock.on('socket close', function () {
    if (!heartbeatTimer) return
    clearInterval(heartbeatTimer)
    heartbeatTimer = null
    heartbeatCount = 0
  })
}
