import React, { useState, useEffect } from "react";
import classNames from "classnames";
import chunk from "lodash.chunk";
import "./Razer.scss";

const KEYS = "RAZERJS";
const KEYS_PER_ROW = 5;
const chunkedKeys = chunk(KEYS.split(""), KEYS_PER_ROW);

function RazerSection() {
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveKey(
      activeKey => (activeKey + 1) % KEYS.length
    ), 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="razer-animation drop-transition">
      <div className="razer-board">
        {chunkedKeys.map((characters, i) => (
          <div className="keys" key={i}>
            {characters.map((value, j) => (
              <div
                className={classNames("key", "key" + j, {
                  pressed: i * KEYS_PER_ROW + j === activeKey
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

export default RazerSection;
