function getServerHostname () {
  const isProd = process.env.NODE_ENV === 'production'
  const isStaging = process.env.NODE_ENV === 'none'
  const isDev = process.env.NODE_ENV === 'development'

  if(isDev) {
    return 'http://localhost:3000'
  } else if (isProd || isStaging) {
    return 'https://api.getstew.com'
  }
}

export function getWebsiteHostname() {
  const isProd = process.env.NODE_ENV === 'production'
  const isStaging = process.env.NODE_ENV === 'none'
  const isDev = process.env.NODE_ENV === 'development'

  if(isDev) {
    return 'http://localhost:3009'
  } else if (isStaging) {
    return 'https://staging.getstew.com'
  } else if (isProd) {
    return 'https://getstew.com'
  }
}

export default getServerHostname