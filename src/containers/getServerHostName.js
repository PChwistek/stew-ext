function getServerHostname () {
  const isProd = process.env.NODE_ENV === 'production'
  if(!isProd) {
    return 'http://65c3c7e7.ngrok.io'
  } else if (isProd) {
    return 'https://api.getstew.com'
  }
}

export default getServerHostname