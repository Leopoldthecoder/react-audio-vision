export default class Visualizer {
  constructor({ draw, size, volume }) {
    this.source = null
    this.count = 0
    this.ac = new (window.AudioContext || window.webkitAudioContext)()
    this.draw = draw
    this.size = size

    this.gainNode = this.ac.createGain()
    this.gainNode.gain.value = volume
    this.gainNode.connect(this.ac.destination)
    this.analyser = this.ac.createAnalyser()
    this.analyser.fftSize = this.size * 2
    this.analyser.connect(this.gainNode)
  }

  load = (url, callback) => {
    const xhr = new XMLHttpRequest()
    xhr.abort()
    xhr.open('GET', url)
    xhr.responseType = 'arraybuffer'
    xhr.onload = () => {
      callback(xhr.response)
    }
    xhr.send()
  }

  play = src => {
    const n = ++this.count
    this.source && this.source.stop()
    const decodeCallback = buffer => {
      if (n !== this.count) return
      const bufferSource = this.ac.createBufferSource()
      bufferSource.buffer = buffer
      bufferSource.loop = true
      bufferSource.connect(this.analyser)
      bufferSource.start(0)
      this.source = bufferSource
      this.visualize()
    }
    if (src instanceof ArrayBuffer) {
      this.ac.decodeAudioData(src, decodeCallback)
    } else {
      this.load(src, arrayBuffer => {
        this.ac.decodeAudioData(arrayBuffer, decodeCallback)
      })
    }
  }

  pause = () => {
    this.ac.suspend()
  }

  resume = () => {
    this.ac.resume()
  }

  updateVolume = vol => {
    this.gainNode.gain.value = vol
  }

  visualize = () => {
    const arr = new Uint8Array(this.analyser.frequencyBinCount)
    const raf = window.requestAnimationFrame ||
      window.webkitrequestAnimationFrame ||
      window.mozrequestAnimationFrame
    const fn = () => {
      this.analyser.getByteFrequencyData(arr)
      this.draw(arr)
      raf(fn)
    }
    fn()
  }
}
