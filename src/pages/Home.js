import React, { Component } from 'react';

import Banner from '../components/Banner';

import Bio from '../components/Home/Bio';
import Social from '../components/Home/Social';
import Spotify from '../components/Home/Spotify';
import Razer from '../components/Home/Razer';
import TakeNote from '../components/Home/TakeNote';

class App extends Component {
  constructor(){
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="home">
          <Banner 
            color="red"
            Content={Bio}
          />
          <Banner 
            color="yellow"
            Content={Social}
          />
          <Banner
            header="Spotify Key Signatures"
            color="green" 
            description="Hooking into the Spotify's EchoNest APIs to sort your playlists by Key and BPM"
            emoji="🎙️"
            href="https://jeganathan.co.uk/keys"
            Content={Spotify}
          />
          <Banner
            header="RazerJS"
            color="blue"
            description="Pure JavaScript bindings to Razer Chroma devices using the new REST API"
            emoji="🌈"
            git="https://github.com/chrisjeg/chromajs"
            Content={Razer}
          />
          <Banner
            header="TakeNote"
            color="red"
            description="TakeNote is a layer that sits on top of a MIDI connection in order to provide an event-driven abstraction based on music theory"
            emoji="🎵"
            git="https://github.com/chrisjeg/takenote"
            Content={TakeNote}
          />
      </div>
    );
  }
}

export default App;
