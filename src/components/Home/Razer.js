import React, { Component, useState } from "react";
import classNames from "classnames";
import chunk from "lodash.chunk";
import "./Razer.scss";

const KEYS = "RAZERJS";
const KEYS_PER_ROW = 5;
const chunkedKeys = chunk(KEYS.split(""), KEYS_PER_ROW);
class RazerSection extends Component {
  constructor() {
    super();
    this.state = {
      activeKey: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prev => ({
        activeKey: (prev.activeKey + 1) % KEYS.length
      }));
    }, 600);
  }

  render() {
    return (
      <div className="razer-animation drop-transition">
        <div className="razer-board">
          {chunkedKeys.map((characters, i) => (
            <div className="keys" key={i}>
              {characters.map((value, j) => (
                <div
                  className={classNames("key", "key" + j, {
                    pressed: i * KEYS_PER_ROW + j === this.state.activeKey
                  })}
                  key={j}
                >
                  {value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RazerSection;
