import React, { Component } from "react";
import "./Razer.css";

class RazerSection extends Component {
  componentDidMount() {
    let nodes = document.querySelectorAll("div#razer-board>div>div");
    let keys = Array.prototype.map.call(nodes, key => key.id);
    let active_key = 0;
    let key_count = keys.length;
    return setInterval(() => {
      let last_key = (active_key + key_count - 1) % key_count;
      document.getElementById(keys[last_key]).classList.remove("pressed");
      document.getElementById(keys[active_key]).classList.add("pressed");
      active_key = (active_key + 1) % key_count;
    }, 600);
  }

  render() {
    return (
      <div className="razer-animation drop-transition">
        <div id="razer-board">
          <div id="r-keys">
            <div id="key0" className="key">
              R
            </div>
            <div id="key1" className="key">
              A
            </div>
            <div id="key2" className="key">
              Z
            </div>
            <div id="key3" className="key">
              E
            </div>
            <div id="key4" className="key">
              R
            </div>
          </div>
          <div id="rjs-keys">
            <div id="key5" className="key">
              J
            </div>
            <div id="key6" className="key">
              S
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RazerSection;
