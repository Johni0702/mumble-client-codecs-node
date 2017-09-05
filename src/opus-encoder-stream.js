import { OpusEncoder } from 'node-opus'
import { Transform } from 'stream'

class OpusEncoderStream extends Transform {
  constructor () {
    super({ objectMode: true })
  }

  _transform (chunk, encoding, callback) {
    if (!this._opus) {
      this._opus = new OpusEncoder(48000, chunk.numberOfChannels)
    }

    callback(null, {
      target: chunk.target,
      codec: 'Opus',
      frame: this._opus.encode(Buffer.from(float32ToInt16(chunk.pcm).buffer)),
      position: chunk.position
    })
  }
}

function float32ToInt16 (asFloat32) {
  const len = asFloat32.length
  const asInt16 = new Int16Array(len)
  for (let i = 0; i < len; i++) {
    let val = asFloat32[i]
    val = val < 0 ? val * 32768 : val * 32767
    asInt16[i] = Math.max(-32768, Math.min(32767, val))
  }
  return asInt16
}

export default OpusEncoderStream
