const { createWriteStream, createReadStream } = require('fs');
const { createGzip } = require('zlib');

const file = 'duplex-sample.txt'

createReadStream(file)
  .pipe(createGzip())
  .pipe(createWriteStream(file + '.sample.gz'));