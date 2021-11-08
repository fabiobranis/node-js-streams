const {Readable, Transform} = require('stream')
const {createWriteStream} = require('fs')
const {EOL} = require('os');

async function *streamSample() {
  yield 'First line'
  yield 'Second line'
  yield 'Third line'
}

const putEndOfLine = new Transform({
  transform(chunk,_encoding,callback) {
    callback(null,[chunk, EOL].join())
  }
})

Readable.from(streamSample())
  .on('data', console.log)
  .pipe(putEndOfLine)
  .pipe(createWriteStream('./sample-piped.sample.txt'))