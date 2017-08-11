const exec = require('child_process').exec
exec('npm -v', (err, stdout) => {
  if (err) throw err
  if (parseFloat(stdout) < 3) {
    throw new Error(`[Error: jh React Boilerplate]: npm 版本必须高于3`)
    process.exit(1)
  }
})
