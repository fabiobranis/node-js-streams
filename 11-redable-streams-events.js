const { Readable, Writable , Transform, Duplex, PassThrough  } = require('stream')

async function *streamSample() {
  yield 'First line'
  yield 'Second line'
  yield 'Third line'
}

Readable.from(streamSample(), {objectMode: true})
const r = new Readable({objectMode: true})
const w = new Writable({ objectMode: true })
const t = new Transform({readableObjectMode: true, writableObjectMode: true})
const t2 = new Transform({objectMode: true})
const d = new Duplex({readableObjectMode: true, writableObjectMode: true})
const d2 = new Duplex({objectMode: true})
const p = new PassThrough({objectMode: true})  
const p2 = new PassThrough({readableObjectMode: true, writableObjectMode: true})