
function getServerHostname () {
  if(process.env.NODE_ENV == 'development') {
    return 'http://www.localhost:3009'
  } else if (process.env.NODE_ENV == 'production') {
    return 'stew-server-env.eba-qya3jp33.us-west-1.elasticbeanstalk.com'
  }
}

export default getServerHostname