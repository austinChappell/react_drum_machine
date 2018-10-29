import React, { Component } from 'react';

const NEONS = [
  {
    light: '#FFBDFE',
    dark: '#FF95FF',
  },
  {
    light: '#AEFEFE',
    dark: '#3EC6C3',
  }
];

class Instrument extends Component {
  constructor() {
    super();

    this.audioPlayer = React.createRef();
    this.padRef = React.createRef();
    
    const neonIndex = Math.floor(Math.random() * NEONS.length);
    this.state = {
      isPlaying: false,
      neonColor: NEONS[neonIndex],
      padHeight: 0,
    }
  }

  componentDidMount() {
    this.setPadHeight();
    window.addEventListener('resize', this.setPadHeight);
  }

  componentDidUpdate(prevProps) {
    const { instrument } = this.props;
    const prevActive = prevProps.instrument.active;
    const {
      active,
      wasStopped,
    } = instrument;

    if (!prevActive && active) {
      this.playAudio();
      this.setActiveCss();
    }

    if (wasStopped) {
      this.pauseAudio();
    }
  }

  pauseAudio = () => {
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
}

  playAudio = () => {
    if (!this.audioPlayer.paused) {
      this.pauseAudio();
    }
    this.audioPlayer.play();
  }

  setActiveCss = () => {
    if (this.clearPlaying) {
      clearTimeout(this.clearPlaying);
    }
    this.setState({ isPlaying: true }, () => {
      this.clearPlaying = setTimeout(() => {
        this.clearPlaying = null;
        this.setState({ isPlaying: false });
      }, 250);
    })
  }

  setAudioPlayer = (element) => {
    this.audioPlayer = element;
  }

  setPadHeight = () => {
    const { offsetWidth } = this.padRef;
    this.setState({ padHeight: offsetWidth })
  }

  setPadRef = (element) => {
    this.padRef = element;
  }

  render() {
    const {
      isPlaying,
      neonColor,
      padHeight,
    } = this.state;

    const {
      activateInstrument,
      instrument,
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexBasis: `calc(${100 / 3}% - 20px)`,
          flexDirection: 'column',
          margin: 10,
        }}
        >
        <div style={{ height: 20 }}>
          <span style={{ fontSize: 10 }}>
            {instrument.label}
          </span>
        </div>
        <div
          className="drum-pad"
          id={instrument.label}
          onClick={() => activateInstrument(instrument)}
          ref={this.setPadRef}
          style={{
            alignItems: 'center',
            backgroundColor: isPlaying ? neonColor.dark : neonColor.light,
            border: `1px solid ${neonColor.dark}`,
            borderRadius: 5,
            boxSizing: 'border-box',
            color: isPlaying ? 'white' : '#222222',
            display: 'flex',
            flexGrow: 1,
            height: padHeight,
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <p>
            {instrument.trigger}
            <audio
              className="clip"
              id={instrument.trigger}
              ref={this.setAudioPlayer}
              src={instrument.src}
            />
          </p>
        </div>
      </div>
    )
  }
}

export default Instrument;
