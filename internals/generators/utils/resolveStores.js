const glob = require('glob')
const path = require('path')

module.exports = () =>
  new Promise((resolve, reject) => {
    glob('src/**/stores/*Store.ts', (err, files) => {
      if (err) return reject(err)
      const p = path.posix
      resolve(
        files.map(item => ({
          name: p.basename(item, '.ts'),
          value: {
            name: p.basename(item, '.ts'),
            original: item,
            modulePath: p.join(
              p.dirname(p.relative('src', item)),
              p.basename(item, '.ts')
            ),
          },
        }))
      )
    })
  })
