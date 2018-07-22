import React, { Component } from 'react'
import Visualizer from './visualizer'
import getDrawMethod from './draw'

export default class AudioVisualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visualizer: null
    }
  }

  static defaultProps = {
    src: null,
    bars: 64,
    barColor: 'black',
    height: 300,
    width: 600,
    pause: false,
    volume: 0.6
  }

  resize = () => {
    const { width, height } = this.props
    const canvas = this.canvas
    canvas.width = width
    canvas.height = height
  }

  play = () => {
    if (this.props.src instanceof Blob) {
      const fileReader = new FileReader()
      fileReader.onload = e => {
        this.state.visualizer.play(e.target.result)
      }
      fileReader.readAsArrayBuffer(this.props.src)
    } else if (typeof this.props.src === 'string') {
      this.state.visualizer.play(this.props.src)
    }
  }

  componentDidMount() {
    const ctx = this.canvas.getContext('2d')
    const { height, width, bars, barColor, volume } = this.props
    const param = { ctx, height, width, bars, barColor }
    this.setState({
      visualizer: new Visualizer({
        size: bars,
        draw: getDrawMethod(param),
        volume
      })
    }, this.play)
    this.resize()
  }

  componentDidUpdate(prevProps) {
    const {
      src: prevSrc,
      pause: prevPause,
      volume: prevVolume,
      height: prevHeight,
      width: prevWidth
    } = prevProps
    const { visualizer } = this.state
    const { src, pause, volume, height, width } = this.props
    if (prevSrc !== src) {
      this.play()
    }
    if (prevPause !== pause) {
      visualizer[pause ? 'pause' : 'resume']()
    }
    if (prevVolume !== volume) {
      visualizer.updateVolume(volume)
    }
    if (prevHeight !== height || prevWidth !== width) {
      this.resize()
    }
  }

  render() {
    return (
      <div className="react-audio-visualizer">
        <canvas ref={ref => { this.canvas = ref }}/>
      </div>
    )
  }
}
