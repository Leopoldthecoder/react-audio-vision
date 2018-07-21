import React, { Component, StrictMode } from 'react'
import AudioVisualizer from '../src/react-audio-visualizer'

class App extends Component {
  render() {
    return (
      <StrictMode>
        <p>Hello</p>
        <AudioVisualizer />
      </StrictMode>
    )
  }
}

export default App
