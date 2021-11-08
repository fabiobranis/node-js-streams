const { createWriteStream } = require('fs')

let howManyDrains = 0

const write = (writer, data) => {
  return new Promise((resolve) => {
    if (!writer.write(data)) {
      howManyDrains++
      writer.once('drain', resolve)
    }
    else {
      resolve()
    }
  })
}

const run = async () => {
  const writeStream = createWriteStream('./sample-drain.sample.txt', {
    emitClose: true
  })
  const max = 1000000
  let current = 0

  writeStream.on('finish', () => console.log('All data written'))

  while (current <= max) {
    await write(writeStream, (current++).toString())
  }
  writeStream.end()
}

run().then(() => console.log(`Drained ${howManyDrains} times`))