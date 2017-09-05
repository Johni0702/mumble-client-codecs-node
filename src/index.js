import { OpusEncoder } from 'node-opus'
import DecoderStream from './decoder-stream'
import OpusEncoderStream from './opus-encoder-stream'

export const celt = []
export const opus = true

export function getDuration (codec, buffer) {
  if (codec === 'Opus') {
    // node-opus doesn't expose the relevant libopus function
    return 10
  } else {
    return 1
  }
}

export function createDecoderStream (user) {
  return new DecoderStream()
}

export function createEncoderStream (codec) {
  if (codec === 'Opus') {
    return new OpusEncoderStream(codec)
  }
}
