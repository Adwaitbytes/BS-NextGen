import React from 'react';

const Logo = ({ width = 120, height = 120 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="120" height="120" rx="12" fill="#1976d2" />
    <text
      x="60"
      y="45"
      fontFamily="Arial"
      fontSize="24"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      IITM
    </text>
    <text
      x="60"
      y="75"
      fontFamily="Arial"
      fontSize="20"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      BS
    </text>
    <text
      x="60"
      y="95"
      fontFamily="Arial"
      fontSize="12"
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      NextGen
    </text>
  </svg>
);

export default Logo;
