const {Readable} = require('stream')
const {createWriteStream} = require('fs')

async function *streamSample() {
  yield 'First line'
  yield 'Second line'
  yield 'Third line'
}

const readable = Readable.from(streamSample())
const writable = createWriteStream('./sample-events.sample.txt')

readable
  .on('data', console.log)
  .once('close', () => console.log('Close readable'))

writable
  .on('open', () => console.log('Opened writable'))  
  .once('close', () => console.log('Close writable'))

readable    
  .pipe(writable)

