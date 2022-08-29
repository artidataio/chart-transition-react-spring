import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";

const rectStyle = {
  width: "10vmin",
  height: "10vmin",
  background: "#ff6d6d",
  marginTop: "5vmin",
  borderRadius: 8
};

export default function Demo2() {
  const [position, setPosition] = useState([0, 0, 0]);
  const [springs, api] = useSprings(position.length, (index) => ({
    x: position[index]
  }));

  const handleAnimate = () => {
    const positionNew = position.map((val, ind) => val + (ind + 1) * 40);
    api.start((index) => ({ x: positionNew[index] }));
    setPosition(positionNew);
  };

  const handleReset = () => {
    api.start((index) => ({ x: 0 }));
    setPosition([0, 0, 0]);
  };

  return (
    <>
      <p>
        Scaling it to multiple square without code repetition. Here the
        animation can be varied such that the squares move 40px, 80px, 120px
        respectively.
      </p>
      <button onClick={handleAnimate}>Animate</button>
      <button onClick={handleReset}>Reset</button>
      {springs.map((styles) => (
        <animated.div style={{ ...rectStyle, ...styles }} />
      ))}
    </>
  );
}
