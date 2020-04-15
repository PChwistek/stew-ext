function getServerHostname () {
  const isProd = process.env.NODE_ENV === 'production'
  if(!isProd) {
    return 'http://localhost:3000'
  } else if (isProd) {
    return 'https://api.getstew.com'
  }
}

export function getWebsiteHostname() {
  const isProd = process.env.NODE_ENV === 'production'
  const isStaging = process.env.NODE_ENV === 'staging'
  if(!isProd) {
    return 'http://localhost:3009'
  } else if (isStaging) {
    return 'https://staging.getstew.com'
  } else if (isProd) {
    return 'https://getstew.com'
  }
}

export default getServerHostname