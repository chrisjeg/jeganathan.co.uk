import React from "react";
import "./BikeWheel.scss";

const BikeWheel = () => {
  const [rotation, setRotation] = React.useState(0);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const [device, setDevice] = React.useState();

  const revolutionData = React.useRef({
    rpm: 0,
    totalRevolutions: 0,
    lastWheelTime: 0,
  });

  const setupDevice = React.useCallback(async () => {
    await navigator.bluetooth.getAvailability();
    const newDevice = await navigator.bluetooth.requestDevice({
      filters: [
        {
          services: ["cycling_speed_and_cadence"],
        },
      ],
    });
    const server = await newDevice.gatt.connect();
    const service = await server.getPrimaryService("cycling_speed_and_cadence");
    const characteristic = await service.getCharacteristic("csc_measurement");
    await characteristic.startNotifications();

    characteristic.addEventListener("characteristicvaluechanged", (event) => {
      const data = event.target.value;
      const flags = data.getUint8(0);
      const wheelDataPresent = flags & 0x1;
      const curr = {};
      if (wheelDataPresent) {
        curr.totalRevolutions = data.getUint32(1, true);
        curr.lastWheelTime = data.getUint16(5, true) / 1024;
      }

      const previous = revolutionData.current;

      const revDelta = curr.totalRevolutions - previous.totalRevolutions;
      let timeDelta = curr.lastWheelTime - previous.lastWheelTime;
      if (timeDelta < 0) {
        timeDelta = curr.lastWheelTime + 64 - previous.lastWheelTime;
      }
      const newData = {
        rpm: timeDelta === 0 ? 0 : revDelta * (60 / timeDelta),
        totalRevolutions: curr.totalRevolutions,
        lastWheelTime: curr.lastWheelTime,
      };
      console.log(newData);
      revolutionData.current = newData;
    });
    return setDevice(newDevice);
  }, []);

  const animate = (time) => {
    setRotation(
      revolutionData.current.rpm !== 0
        ? (time % 360) / (revolutionData.current.rpm / 60000)
        : 0
    );
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

  if (device == null) {
    return <button onClick={setupDevice}>Setup</button>;
  }

  return (
    <div className="wheel-frame">
      <WheelSVG diameter={640} rotation={rotation} />
    </div>
  );
};

const WheelSVG = ({ diameter = 0, rotation = 0 }) => {
  const radius = diameter / 2;
  const segments = [
    "Tequila",
    "Tequila",
    "Tequila",
    "Tequila",
    "Tequila",
    "Tequila",
    "Tequila",
    "Tequila",
    "Tequila",
    "Tequila",
  ];
  return (
    <svg viewBox={`0 0 ${diameter} ${diameter}`}>
      <g transform={`translate(${radius}, ${radius}) rotate(${rotation})`}>
        <g id="bike-wheel">
          <ellipse
            cx="0"
            cy="0"
            rx={radius - 5}
            ry={radius - 5}
            fill="white"
            stroke="black"
            stroke-width="10"
          />
          {segments.map((drink, index) => {
            return (
              <WheelSegment
                key={index}
                segmentNumber={index}
                segmentCount={segments.length}
                text={drink}
                r={radius}
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
};

export default BikeWheel;

const WheelSegment = ({
  segmentCount = 12,
  segmentNumber = 0,
  text = "Tequila",
  r = 0,
}) => {
  const segmentSize = 360 / segmentCount;
  return (
    <>
      <g transform={`rotate(${segmentSize * segmentNumber})`}>
        <line x1="0" y1="0" x2={r} y2="0" stroke="black" stroke-width="3" />
      </g>
      <g transform={`rotate(${segmentSize * (segmentNumber + 0.5)})`}>
        <text x={r / 3} y="0" alignmentBaseline="central" textLength={r * 0.4}>
          {text}
        </text>
      </g>
    </>
  );
};