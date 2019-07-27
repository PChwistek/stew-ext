export function millisecondsToDigitalClock(milliseconds) {
  const minutes = parseInt((milliseconds / (1000 * 60)) % 60)
  const seconds = parseInt((milliseconds / 1000) % 60)
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString()
  const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString()

  return `${minutesString}:${secondsString}`
}