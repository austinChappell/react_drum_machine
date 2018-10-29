import React, { Component } from 'react'

class Instrument extends Component {
  audioPlayer = React.createRef();
  padRef = React.createRef();

  state = {
    isPlaying: false,
    padHeight: 0,
  }

  componentDidMount() {
    this.setPadHeight();
    window.addEventListener('resize', this.setPadHeight);
  }

  componentDidUpdate(prevProps) {
    const { instrument } = this.props;
    const prevActive = prevProps.instrument.active;
    const { active } = instrument;

    if (!prevActive && active) {
      this.playAudio();
      this.setActiveCss();
    }
  }

  playAudio = () => {
    if (!this.audioPlayer.paused) {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
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
    console.log({ offsetWidth })
    this.setState({ padHeight: offsetWidth })
  }

  setPadRef = (element) => {
    this.padRef = element;
  }

  render() {
    const {
      isPlaying,
      padHeight,
    } = this.state;

    const {
      activateInstrument,
      instrument,
    } = this.props;

    return (
      <div
        className="drum-pad"
        onClick={() => activateInstrument(instrument)}
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
          ref={this.setPadRef}
          style={{
            alignItems: 'center',
            backgroundColor: isPlaying ? '#3EC6C3' : '#AEFEFE',
            border: '1px solid #3EC6C3',
            boxSizing: 'border-box',
            color: isPlaying ? 'white' : '#3EC6C3',
            display: 'flex',
            flexGrow: 1,
            height: padHeight,
            justifyContent: 'center',
            padding: 10,
          }}
        >
          <p>
            {instrument.trigger}
          </p>
        </div>
        <audio
          className="clip"
          ref={this.setAudioPlayer}
          src={instrument.src}
        />
      </div>
    )
  }
}

export default Instrument;
