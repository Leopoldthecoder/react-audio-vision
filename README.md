# react-audio-vision

> A react component that visualizes audio files

<p align="center">
  <img src="https://user-images.githubusercontent.com/10095631/43189043-3f1a72d2-9028-11e8-9504-664febe8c985.gif" width="400">
</p>

### Demo
https://jsfiddle.net/leopoldthecuber/2dovasye/

### Install

#### npm
```bash
npm install react-audio-vision
```

#### script tag
```html
<script src="https://unpkg.com/react-audio-vision"></script>
```

### Usage

#### npm
```js
import React, { Component } from 'react'
import AudioVision from 'react-audio-vision'

class App extends Component {
  render() {
    return (
      <AudioVision />
    )
  }
}
```

#### script tag
```js
class App extends React.Component {
  render() {
    return (
      <AudioVision />
    )
  }
}
```

### API
```html
<AudioVision
  // audio source, can be a string (a url that triggers an XMLHttpRequest) or a blob
  // 音频源，字符串（音频的 url 地址，会触发 XMLHttpRequest 请求）或 Blob 类型
  src={src}

  // canvas width, number
  // canvas 的宽度，数字类型
  width={500}

  // canvas height, number
  // canvas 的高度，数字类型
  height={250}

  // number of bars, must be a power of two in the range of [16, 16384]
  // 色块的数量，必须是在 [16, 16384] 范围内的 2 的幂
  bars={128}

  // color of bars, can be a string or a string array
  // 色块的颜色，字符串或字符串数组
  barColor={['crimson', 'gold']}

  // pause the audio or not, boolean
  // 是否暂停播放，布尔型
  pause={pause}

  // audio play volume, number between 0 and 1
  // 音频播放音量，介于 0 和 1 之间的数字
  volume={0.6} />
```

### Reference
https://github.com/loosenRogers/MusicVisualizer-WebAudioAPI
