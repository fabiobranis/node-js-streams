const { Readable, Transform } = require('stream')
const { stdout } = require('process')

const readableObject = new Readable({
  objectMode: true,
  read: () => {}
})

setInterval(() => {
  readableObject.push({
    x: Math.random()
  });
}, 100);

const transformToString = new Transform({
  objectMode: true,
  transform: (chunk,_encoding, callback) => {
    const {x} = chunk
    callback(null, `${x.toString()}\n`)
  }
})

readableObject
  .pipe(transformToString)
  .pipe(stdout)