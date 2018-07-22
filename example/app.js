import React, { Component, StrictMode } from 'react'
import AudioVisualizer from '../src/react-audio-visualizer'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      musicSource: 'https://golb-1256296192.cos.ap-shanghai.myqcloud.com/%E4%B8%87%E8%83%BD%E9%9D%92%E5%B9%B4%E6%97%85%E5%BA%97%20-%20%E5%8D%81%E4%B8%87%E5%AC%89%E7%9A%AE.mp3',
      pause: false,
      barColor: ['gold', 'black']
    }
  }

  onFilePick = e => {
    const file = e.target.files[0]
    if (/^audio\//.test(file.type)) {
      this.setState({
        musicSource: file
      })
    } else {
      window.alert('Pick an audio file')
    }
  }

  onUrlInput = e => {
    this.setState({
      musicSource: e.target.value
    })
  }

  togglePause = () => {
    this.setState({
      pause: !this.state.pause
    })
  }

  render() {
    const { musicSource, pause, barColor } = this.state
    return (
      <StrictMode>
        <label>Pick an audio file</label>
        <input type="file" onChange={this.onFilePick}/>
        <label>Or paste a URL here</label>
        <input type="text" onChange={this.onUrlInput}/>
        <button onClick={this.togglePause}>{ pause ? 'resume' : 'pause' }</button>
        <AudioVisualizer src={musicSource} pause={pause} barColor={barColor}/>
      </StrictMode>
    )
  }
}

export default App
