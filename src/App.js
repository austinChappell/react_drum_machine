import React, { Component } from 'react';
import './App.css';

import Instrument from './components/Instrument';

import hhClosedSound from './assets/sounds/hi_hat_closed.wav';
import kickSound from './assets/sounds/kick.wav';
import snareSound from './assets/sounds/snare.wav';

class App extends Component {
  state = {
    instruments: [
      {
        active: false,
        label: 'kick',
        src: kickSound,
        trigger: 'Q',
      },
      {
        active: false,
        label: 'snare',
        src: snareSound,
        trigger: 'W',
      },
      {
        active: false,
        label: 'hi hat (closed)',
        src: hhClosedSound,
        trigger: 'E',
      }
    ],
  }

  componentDidMount() {
    this.drumMachine.focus();
  }

  activateInstrument = (instrument) => {
    const instruments = this.state.instruments.slice();
    console.log({ instrument });
    const instIndex = instruments.findIndex(i => i.trigger === instrument.trigger);
    const newInstrument = { ...instrument, active: true };
    instruments[instIndex] = newInstrument;

    console.log({ instruments })

    if (this.deactivationTimer) {
      clearTimeout(this.deactivationTimer);
    }

    this.setState({ instruments }, () => {
      this.deactivationTimer = setTimeout(() => {
        this.deactivateAll();
      }, 3000);
    });
  }

  deactivateAll = (cb) => {
    const instruments = this.state.instruments.map(i => ({ ...i, active: false }));
    this.setState({ instruments }, cb);
  }

  handleClick = (instrument) => {
    this.deactivateAll(
      () => this.activateInstrument(instrument)
    )
  }

  handleKeyDown = (evt) => {
    const { instruments } = this.state;
    const letter = (evt.key.toUpperCase());
    const foundInstrument = instruments.find(i => i.trigger === letter);
    if (foundInstrument) {
      this.deactivateAll(
        () => this.activateInstrument(foundInstrument)
      )
    }
  }

  setAudioPlayer = (ref) => {
    this.audioPlayer = ref;
  }

  setDrumMachine = (element) => {
    this.drumMachine = element;
  }

  triggerInstrument = (instrument) => {

  }

  render() {
    const { instruments } = this.state;
    const currentInstrument = instruments.find(i => i.active);

    return (
      <div
        className="App"
        id="drum-machine"
        onKeyDown={this.handleKeyDown}
        ref={this.setDrumMachine}
        tabIndex="0"
      >
        <div id="display">
          {currentInstrument && (
            <h2>
              {currentInstrument.label}
            </h2>
          )}
          {instruments.map((instrument) => (
            <Instrument
              activateInstrument={this.handleClick}
              key={instrument.trigger}
              instrument={instrument}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
