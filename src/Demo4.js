import { useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { ParentSize } from "@visx/responsive";

export default function Demo4() {
  const [widths, setWidths] = useState(
    Array(10)
      .fill()
      .map((val, ind) => (ind + 1) * 10)
  );
  const [springs, api] = useSprings(widths.length, (index) => ({
    width: `${widths[index]}%`
  }));

  const handleAnimate = () => {
    const widthsNew = widths.map((val, ind) => Math.random() * 100);
    api.start((index) => ({ width: `${widthsNew[index]}%` }));
    setWidths(widthsNew);
  };

  const handleReset = () => {
    const widthsNew = Array(10)
      .fill()
      .map((val, ind) => (ind + 1) * 10);
    api.start((index) => ({ width: `${widthsNew[index]}%` }));
    setWidths(widthsNew);
  };

  return (
    <>
      <p style={{ fontWeight: "bold" }}>Demo 4</p>
      <p>
        Using SVG we can explicitly declare the y positioning of squares instead
        of stacking div.
      </p>
      <button onClick={handleAnimate}>Animate</button>
      <button onClick={handleReset}>Reset</button>
      <div style={{ aspectRatio: "16/9", width: "50vw" }}>
        <ParentSize>
          {({ height, width }) => (
            <svg height={height} width={width}>
              {springs.map((styles, ind) => (
                <animated.rect
                  x={0}
                  y={(height / 10) * ind + 0.01 * height}
                  key={ind}
                  width={styles.width}
                  height={(height / 10) * 0.9}
                  fill="#ff6d6d"
                />
              ))}
            </svg>
          )}
        </ParentSize>
      </div>
    </>
  );
}
