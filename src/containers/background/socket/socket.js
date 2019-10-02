import io from 'socket.io-client'

//only connect to socket when user creates a session...

export default function(onSetupCallback) {
  const socket = io('http://localhost:3008')
  socket.on('connect', function() {
    console.log('Connected')
    socket.emit('device connected', { username: 'test', device: 'browser' })
  
  })
  socket.on('events', function(data) {
    console.log('event', data)
  })
  socket.on('exception', function(data) {
    console.log('event', data)
  })
  socket.on('disconnect', function() {
    console.log('Disconnected')
  })

  socket.on('block devices', function(){
    console.log('called from server')
    onSetupCallback()
  })
}
