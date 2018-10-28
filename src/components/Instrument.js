import React, { Component } from 'react'

class Instrument extends Component {
  audioPlayer = React.createRef();

  state = {
    isPlaying: false,
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

  render() {
    const { isPlaying } = this.state;

    const {
      activateInstrument,
      instrument,
    } = this.props;

    return (
      <div
        className="drum-pad"
        onClick={() => activateInstrument(instrument)}
        style={{
          backgroundColor: isPlaying ? 'green' : 'white',
          color: isPlaying ? 'white' : 'green',
        }}
      >
        <p>
          {instrument.label}
        </p>
        <p>
          {instrument.trigger}
        </p>
        <audio
          ref={this.setAudioPlayer}
          src={instrument.src}
        />
      </div>
    )
  }
}

export default Instrument;
