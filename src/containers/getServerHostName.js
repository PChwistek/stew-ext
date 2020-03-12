function getServerHostname () {
  const isProd = process.env.NODE_ENV === 'production'
  if(!isProd) {
    return 'http://873053a3.ngrok.io'
  } else if (isProd) {
    return 'https://api.getstew.com'
  }
}

export default getServerHostname