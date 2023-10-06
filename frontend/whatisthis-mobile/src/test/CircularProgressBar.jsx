import React, { useState } from "react";

const CircularProgressBar = ({ percentage }) => {
  const radius = 60; // 원의 반지름
  const strokeWidth = 15; // 원의 두께
  const viewBox = `0 0 ${radius * 2} ${radius * 2}`;
  const circumference = radius * 2 * Math.PI;
  const offset = ((107 - percentage) / 100) * circumference;

  // 회전을 적용하여 원형 프로그래스 바가 12시 방향에서 시작하도록 함
  const rotation = -90; // 12시 방향에서 시작

  return (
    <svg width={radius * 2} height={radius * 2} viewBox={viewBox}>
      <g>
        {/* <g transform={`rotate(0, ${radius}, ${radius})`}> */}
        <circle
          className="progress-ring__circle"
          stroke="#2d4059" // 원의 색상
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
          style={{
            border: "none",
          }}
        />
        <circle
          transform={`rotate(${rotation}, ${radius}, ${radius})`}
          className="progress-ring__circle"
          stroke="#ea5455" // 프로그레스 바의 색상
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius - strokeWidth / 2}
          cx={radius}
          cy={radius}
          style={{
            border: "none",
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 1s ease-in-out", // 애니메이션
          }}
        />
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "1.8rem",
            color: "#2d4059",
            fontWeight: "bold",
          }}
          className="progress-ring__text"
        >
          {`${percentage}%`}
        </text>
      </g>
    </svg>
  );
};

export default CircularProgressBar;
