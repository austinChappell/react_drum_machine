import React, { Component } from 'react';
import './App.css';

import Instrument from './components/Instrument';

import sounds from './assets/sounds';

class App extends Component {
  state = {
    instruments: [
      {
        active: false,
        canStop: [],
        label: 'China',
        src: sounds.china,
        trigger: 'Q',
        wasStopped: false,
      },
      {
        active: false,
        canStop: [],
        label: 'Crash',
        src: sounds.crash,
        trigger: 'W',
        wasStopped: false,
      },
      {
        active: false,
        canStop: [],
        label: 'Ride',
        src: sounds.ride,
        trigger: 'E',
        wasStopped: false,
      },
      {
        active: false,
        canStop: ['HH Open'],
        label: 'HH Close',
        src: sounds.hhClosed,
        trigger: 'A',
        wasStopped: false,
      },
      {
        active: false,
        canStop: ['HH Close'],
        label: 'HH Open',
        src: sounds.hhOpen,
        trigger: 'S',
        wasStopped: false,
      },
      {
        active: false,
        canStop: [],
        label: 'Bell',
        src: sounds.rideBell,
        trigger: 'D',
        wasStopped: false,
      },
      {
        active: false,
        canStop: [],
        label: 'Kick',
        src: sounds.kick,
        trigger: 'Z',
        wasStopped: false,
      },
      {
        active: false,
        canStop: [],
        label: 'Snare',
        src: sounds.snare,
        trigger: 'X',
        wasStopped: false,
      },
      {
        active: false,
        canStop: [],
        label: 'Snare Rim Knock',
        src: sounds.snareRim,
        trigger: 'C',
        wasStopped: false,
      }
    ],
  }

  componentDidMount() {
    this.drumMachine.focus();
  }

  activateInstrument = (instrument) => {
    const instruments = this.state.instruments.slice();
    const instIndex = instruments.findIndex(i => i.trigger === instrument.trigger);
    const newInstrument = {
      ...instrument,
      active: true,
      wasStopped: false,
    };
    if (newInstrument.canStop.length > 0) {
      // loop over each instrument that can be stopped
      newInstrument.canStop.forEach((instrumentLabel) => {
        // get the index of this instrument
        const instrumentToStopIndex = instruments.findIndex(i => i.label === instrumentLabel);
        // create a fresh copy of this object so Instrument component will update
        const stoppedInstrument = {
          ...instruments[instrumentToStopIndex],
          wasStopped: true,
        };
        instruments[instrumentToStopIndex] = stoppedInstrument;
      })
    }
    instruments[instIndex] = newInstrument;

    // cancel the timeout to remove display
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
        <h2>
          Sir Flamalot's Drum Machine
        </h2>
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
