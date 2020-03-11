function getServerHostname () {
  const isProd = process.env.NODE_ENV === 'production'
  if(!isProd) {
    return 'http://873053a3.ngrok.io'
  } else if (isProd) {
    return 'http://stew-server-env.eba-qya3jp33.us-west-1.elasticbeanstalk.com'
  }
}

export default getServerHostname