const glob = require('glob')
const path = require('path')

module.exports = () =>
  new Promise((resolve, reject) => {
    glob('src/components/*', (err, files) => {
      if (err) return reject(err)
      const p = path.posix
      resolve(
        files.map(item => ({
          name: p.basename(item),
          value: {
            modulePath: p.relative('src', item),
            original: item,
            name: p.basename(item),
          },
        }))
      )
    })
  })
