import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const rectStyle = {
  width: "10vmin",
  height: "10vmin",
  background: "#ff6d6d",
  marginTop: "5vmin",
  borderRadius: 8
};

export default function Demo1() {
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
