const { on } = require('events')
const { Readable } = require('stream')
const { stdout } = require('process')

async function *streamSample() {
  yield 'First line'
  yield 'Second line'
  yield 'Third line'
}

Readable.from(streamSample())
  .on('data',(data) => console.log(`This is from data event: ${data}`))
  .on('end', () => console.log('finished'))
  .pipe(stdout)