import { useState } from "react";
import { useSpring, useSprings, animated } from "@react-spring/web";

const rectStyle = {
  width: "10vmin",
  height: "10vmin",
  background: "#ff6d6d",
  marginTop: "5vmin",
  borderRadius: 8
};

function App1() {
  const [position, setPosition] = useState(0);
  const [springs, api] = useSpring(() => ({
    from: { x: position }
  }));

  const handleAnimate = () => {
    const positionNew = position + 100;
    api.start({ to: { x: positionNew } });
    setPosition(positionNew);
  };

  const handleReset = () => {
    api.start({ x: 0 });
    setPosition(0);
  };

  return (
    <>
      <p>
        Every time the button is clicked, the square will move 100 px to the
        right. The reset button will move the square to zero no matter what the
        current position.
      </p>
      <button onClick={handleAnimate}>Animate</button>
      <button onClick={handleReset}>Reset</button>
      <animated.div style={{ ...rectStyle, ...springs }} />
    </>
  );
}

function App2() {
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

function App3() {
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

export default function App() {
  return (
    <>
      <App1 />
      <App2 />
      <App3 />
    </>
  );
}
