import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Player from './react-video-player';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    const options = {
      type: 'video',
      autoPlay: false,
      width: 800,
      sources: [
        { 
          src: 'http://static.cvte.com/file/seewo/video/6dd60c8a5d62e0bf6c872a0c832ca20e.mp4'
        }
      ],
      icon: 50,
      children: [
        {
          name: 'ControlBar',
          children: [     
            'PlayToggle',
            'ProgressControl',
            'CurrentTimeDisplay',
            'DurationDisplay',
            'VolumePanel',
            'FullScreenToggle'
          ]
        }
      ]
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to react-video-player!!</h2>
        </div>
        <Player { ...options } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();