import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { ParentSize } from "@visx/responsive";

const colors = [
  { key: 0, color: "#5778a4" },
  { key: 1, color: "#e49444" },
  { key: 2, color: "#d1615d" },
  { key: 3, color: "#85b6b2" },
  { key: 4, color: "#6a9f58" },
  { key: 5, color: "#e7ca60" },
  { key: 6, color: "#a87c9f" },
  { key: 7, color: "#f1a2a9" },
  { key: 8, color: "#967662" },
  { key: 10, color: "#b8b0ac" }
];

export default function Demo4() {
  const [fills, setFills] = useState(colors);
  const anims = useTransition(fills, {
    unique: true,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const handleAnimate = () => {
    const fillsNew = colors.filter((val) => Math.random() > 0.5);
    setFills(fillsNew);
  };

  const handleReset = () => {
    setFills(colors);
  };

  return (
    <>
      <p style={{ fontWeight: "bold" }}>Demo 5</p>
      <p>
        While Demo 4 is a good chart for many use cases, it is not able to
        handle the situation when length of the state's array changes. For that
        we will use useTransition which has more robust api that cares on
        element that is entering and leaving. Here, we can see a fading
        animation on the squares that is leaving the DOM and entering animation
        too.
      </p>
      <button onClick={handleAnimate}>Animate</button>
      <button onClick={handleReset}>Reset</button>
      <div style={{ aspectRatio: "10/1", width: "90vw" }}>
        <ParentSize>
          {({ height, width }) => (
            <svg height={height} width={width}>
              {anims(({ opacity }, item) => (
                <animated.rect
                  x={`${item.key * 10}%`}
                  y={0}
                  key={item.key}
                  width={"10%"}
                  height={height}
                  opacity={opacity}
                  fill={item.color}
                />
              ))}
            </svg>
          )}
        </ParentSize>
      </div>
    </>
  );
}
