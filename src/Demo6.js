import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { ParentSize } from "@visx/responsive";

function Chart({ data, height, width }) {
  const anims = useTransition(data, {
    unique: true,
    from: (d) => ({
      width: 0,
      y: 0,
      height: 0
    }),
    enter: (d) => ({
      width: (width / 100) * d.value,
      y: (height / data.length) * (d.key - data[0].key),
      height: (height / data.length) * 0.9
    }),
    update: (d) => ({
      width: (width / 100) * d.value,
      y: (height / data.length) * (d.key - data[0].key),
      height: (height / data.length) * 0.9
    }),
    leave: (d) => ({
      width: 0,
      y: 0
    })
  });

  return (
    <svg height={height} width={width}>
      {anims(({ width, y }, item) => (
        <animated.rect
          x={0}
          y={y}
          key={item.key}
          width={width}
          height={(height / data.length) * 0.9}
          fill="#ff6d6d"
        />
      ))}
    </svg>
  );
}

const initData = new Array(10)
  .fill()
  .map((val, ind) => ({ key: ind, value: Math.random() * 100 }));

export default function Demo6() {
  const [data, setData] = useState(initData);
  const handleAdd = () => {
    setData((prev) => [
      { key: prev[0].key - 1, value: Math.random() * 100 },
      ...prev
    ]);
  };
  const handleRemove = () => {
    setData((prev) => prev.slice(1));
  };

  return (
    <>
      <p style={{ fontWeight: "bold" }}>Demo 6</p>
      <p>
        Here we are animating the width, height, y position during the
        transition as data enter, update or leave. Now, we have the foundation
        to add transition animation to our charts.
      </p>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleRemove}>Remove</button>
      <div style={{ aspectRatio: "9/6", width: "50vw" }}>
        <ParentSize>
          {({ height, width }) =>
            width && height ? (
              <Chart data={data} height={height} width={width} />
            ) : null
          }
        </ParentSize>
      </div>
    </>
  );
}
