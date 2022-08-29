import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";

const rectStyle = {
  x: 0,
  height: "10vmin",
  background: "#ff6d6d",
  marginTop: "5vmin",
  borderRadius: 8
};

export default function Demo3() {
  const [widths, setWidths] = useState([10, 20, 30]);
  const [springs, api] = useSprings(widths.length, (index) => ({
    width: `${widths[index]}vw`
  }));

  const handleAnimate = () => {
    const widthsNew = widths.map((val, ind) => Math.random() * 50);
    api.start((index) => ({ width: `${widthsNew[index]}vw` }));
    setWidths(widthsNew);
  };

  const handleReset = () => {
    const widthsNew = [10, 20, 30];
    api.start((index) => ({ width: `${widthsNew[index]}vw` }));
    setWidths(widthsNew);
  };

  return (
    <>
      <p style={{ fontWeight: "bold" }}>Demo 3</p>
      <p>
        Using the same pattern as Demo 2, we can have chart transition that
        update on react's state change.
      </p>
      <button onClick={handleAnimate}>Animate</button>
      <button onClick={handleReset}>Reset</button>
      {springs.map((styles) => (
        <animated.div style={{ ...rectStyle, ...styles }} />
      ))}
    </>
  );
}
