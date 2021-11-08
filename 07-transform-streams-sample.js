const { Readable, Transform } = require('stream')
const { EOL } = require('os')
const { stdout } = require('process');

async function *streamSample() {
  yield {
    amount: 2
  }
  yield {
    amount: 8
  }
  yield {
    amount: 9
  }
}

const times = (amount) => amount * 2

const timesTransform = new Transform({
  objectMode: true,
  transform: (chunk,_encoding,callback) => {    
    const { amount } = chunk
    callback(null,{ 
      amount: times(amount)
    })
  }
})

const amountToString = new Transform({
  objectMode: true,
  transform: (chunk,_encoding,callback) => {    
    const { amount } = chunk
    callback(null,[amount, EOL].join())
  }
})

Readable.from(streamSample(), {
  objectMode: true
}).pipe(timesTransform)
  .pipe(amountToString)
  .pipe(stdout)