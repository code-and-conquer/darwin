import React, { useEffect, useState } from 'react';
import './index.css';

type CircleProps = {
  size: number;
  progress: number;
  strokeWidth: number;
  circleOneStroke: string;
  circleTwoStroke: string;
};

const UnitHealthStatus = (props: CircleProps) => {
  // offset -> is the property , setOffset -> method to update the property
  const [offset, setOffset] = useState(0);
  const {
    size,
    progress,
    strokeWidth,
    circleOneStroke,
    circleTwoStroke,
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // progress -> what the user will give us (unit state in this case)
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
    // set the dependency to prevent infinte update (without offset, it always returns default value 0)
  }, [setOffset, progress, circumference, offset]);

  return (
    <div>
      <svg className="circular-char" width={size} height={size}>
        <circle
          className="circular-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className="circular-bg"
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        ></circle>
        <text x={center} y={center} className="percentage">
          Unit Health {progress}%
        </text>
      </svg>
    </div>
  );
};

export default UnitHealthStatus;
