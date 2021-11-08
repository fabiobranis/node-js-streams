const { PassThrough, Duplex } = require("stream")
const { createReadStream, createWriteStream } = require("fs")

const readStream = createReadStream("./duplex-sample.txt")
const writeStream = createWriteStream("./duplex-sample.sample.txt")

class Throttle extends Duplex {
  /*
   * Class constructor will receive the injections as parameters.
   */
  constructor(time) {
    super()
    this.delay = time
  }
  _read() {}

  // Writes the data, push and set the delay/timeout
  _write(chunk, _encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay)
  }

  // When all the data is done passing, it stops.
  _final() {
    this.push(null)
  }
}

const tunnel = new PassThrough()
const throttle = new Throttle(500)

let amount = 0;
tunnel.on("data", (chunk) => {
  amount += chunk.length;
  console.log("bytes:", amount)
})

readStream.pipe(throttle).pipe(tunnel).pipe(writeStream)