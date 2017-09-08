const ip = require('ip')
const path = require('path')
const fs = require('fs')
const pkg = require(path.join(process.cwd(), 'package.json'))
const qrImg = require('qr-image')

module.exports = function(port) {
  let url
  if (process.env.NODE_ENV === 'development') {
    const localip = ip.address()
    url = `http://${localip}:${port}`
  } else {
    url = pkg.homepage
  }

  console.log('creating QRcode for: ', url)
  const img = qrImg.image(url, { type: 'png' })
  img.pipe(fs.createWriteStream('src/assets/images/qrcode.png'))
}
