import React, { Component } from 'react';
import './App.css';

import Instrument from './components/Instrument';

import sounds from './assets/sounds';

class App extends Component {
  state = {
    instruments: [
      {
        active: false,
        label: 'china',
        src: sounds.china,
        trigger: 'Q',
      },
      {
        active: false,
        label: 'crash',
        src: sounds.crash,
        trigger: 'W',
      },
      {
        active: false,
        label: 'ride',
        src: sounds.ride,
        trigger: 'E',
      },
      {
        active: false,
        label: 'hh-close',
        src: sounds.hhClosed,
        trigger: 'A',
      },
      {
        active: false,
        label: 'hh-open',
        src: sounds.hhOpen,
        trigger: 'S',
      },
      {
        active: false,
        label: 'ride-bell',
        src: sounds.rideBell,
        trigger: 'D'
      },
      {
        active: false,
        label: 'kick',
        src: sounds.kick,
        trigger: 'Z',
      },
      {
        active: false,
        label: 'snare',
        src: sounds.snare,
        trigger: 'X',
      },
      {
        active: false,
        label: 'snare-rim',
        src: sounds.snareRim,
        trigger: 'C',
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
        <div
          className="grid"
        >
          {instruments.map((instrument) => (
            <Instrument
            activateInstrument={this.handleClick}
            key={instrument.trigger}
            instrument={instrument}
            />
          ))}
        </div>
        <div id="display">
          {currentInstrument && (
            <h2>
              {currentInstrument.label}
            </h2>
          )}
        </div>
      </div>
    );
  }
}

export default App;
