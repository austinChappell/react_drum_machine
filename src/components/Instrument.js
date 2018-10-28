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
    }
  }

  playAudio = () => {
    if (!this.audioPlayer.paused) {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
    }
    this.audioPlayer.play();
  }

  setAudioPlayer = (element) => {
    this.audioPlayer = element;
  }

  render() {
    const {
      activateInstrument,
      instrument,
    } = this.props;

    return (
      <div
        className="drum-pad"
        onClick={() => activateInstrument(instrument)}
      >
        {instrument.label}
        <audio
          ref={this.setAudioPlayer}
          src={instrument.src}
        />
      </div>
    )
  }
}

export default Instrument;
