const { createWriteStream } = require('fs')

const stream = createWriteStream('...')

stream.cork()
stream.write('some');
stream.write('data');
process.nextTick(() => stream.uncork());