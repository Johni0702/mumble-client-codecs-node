import { OpusEncoder } from 'node-opus'
import { Transform } from 'stream'
import toArrayBuffer from 'to-arraybuffer'

class DecoderStream extends Transform {
  constructor () {
    super({ objectMode: true })
  }

  _transform (chunk, encoding, callback) {
    if (chunk.codec === 'Opus') {
      if (!this._opus) {
        this._opus = new OpusEncoder(48000, 1)
      }
      callback(null, {
        target: chunk.target,
        pcm: int16ToFloat32(this._opus.decode(chunk.frame)),
        numberOfChannels: 1,
        position: chunk.position
      })
    } else {
      callback()
    }
  }
}

function int16ToFloat32 (raw) {
  const asInt16 = new Int16Array(toArrayBuffer(raw))
  const len = asInt16.length
  const asFloat32 = new Float32Array(len)
  for (let i = 0; i < len; i++) {
    let val = asInt16[i]
    val = val < 0 ? val / 32768 : val / 32767
    asFloat32[i] = Math.max(-1, Math.min(1, val))
  }
  return asFloat32
}

export default DecoderStream
