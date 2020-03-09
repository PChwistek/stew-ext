
function getServerHostname () {

  // const { host } = req.headers

  // if (host.startsWith('localhost')) {
  //   return `http://${host}`
  // }
  // return `https://${host}`
  return 'http://www.localhost:3009'
}

export default getServerHostname