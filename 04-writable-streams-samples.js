const { Readable, Writable } = require('stream') 
const {createWriteStream} = require('fs')
const { stdout } = require('process')

async function *streamSample() {
  yield 'First line'
  yield 'Second line'
  yield 'Third line'
}

const fsSample = () => new Promise((resolve) => {  
  console.log('usando o fs')

  Readable.from(streamSample())  
    .on('end', resolve)
    .pipe(createWriteStream('./sample-write.sample.txt'))
})

const rewriteSample = () => new Promise((resolve)=> {
  // reescrevendo o comportamento de write  
  console.log('reescrevendo o comportamento de write')

  const sampleWithWrite = new Writable({
    write: (chunk, _encoding, callback) => {
      console.log(chunk.toString())
      callback()
    }
  })

  Readable.from(streamSample())
    .on('end', resolve)
    .pipe(sampleWithWrite)
})

const stdoutSample = () => new Promise ((resolve) => {
  // usando stdout
  console.log('usando stdout')
  Readable.from(streamSample())
    .on('end', resolve)
    .pipe(stdout)

})

const init = async () => {  
  await fsSample()
  await rewriteSample()
  await stdoutSample()
}

init().then(() => console.log('fim'))

