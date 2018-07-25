import React, { Component, StrictMode } from 'react'
import AudioVision from '../src/react-audio-vision'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      musicSource: 'https://golb-1256296192.cos.ap-shanghai.myqcloud.com/1.mp3',
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
        <AudioVision
          src={musicSource}
          pause={pause}
          barColor={barColor}
          bars={128}
        />
      </StrictMode>
    )
  }
}

export default App
