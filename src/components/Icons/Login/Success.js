import React from 'react';
import { Svg, Rect, G, Path, Defs, ClipPath } from 'react-native-svg';
const Success = () => {
  return (
    <Svg
      width="60"
      height="60"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect width="80" height="80" rx="40" fill="#32D022" fillOpacity="0.1" />
      <Rect x="12" y="12" width="56" height="56" rx="28" fill="#0040FF" />
      <G clip-path="url(#clip0_4965_1338)">
        <Path
          d="M30.667 39.9997L37.3337 46.6663L50.667 33.333"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4965_1338">
          <Rect
            width="32"
            height="32"
            fill="white"
            transform="translate(24 24)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Success;
