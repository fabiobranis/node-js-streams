const { createReadStream } = require('fs')
const { stdout } = require('process')
const { Readable } = require('stream')

async function *streamSample() {
  yield 'First line'
  yield 'Second line'
  yield 'Third line'
}

// from file system
createReadStream('./read-stream-sample.txt').pipe(stdout)

// from iterables
// Generators
Readable.from(streamSample())

// arrays
Readable.from(['Some text']).pipe(stdout)

// from string
Readable.from('Some text').pipe(stdout)
