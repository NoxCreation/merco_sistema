import React from "react";

type Props = {
  color?: string;
};

export default function BoxIcon({ color = "#718096" }: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.1656 5.52905L12.6656 3.23493C12.2349 3.08291 11.7651 3.08291 11.3344 3.23493L4.83436 5.52905C4.03474 5.81127 3.5 6.56706 3.5 7.41503V15.2308C3.5 16.0055 3.94742 16.7106 4.64841 17.0404L11.1484 20.0993C11.6878 20.3531 12.3122 20.3531 12.8516 20.0992L19.3516 17.0404C20.0526 16.7106 20.5 16.0055 20.5 15.2308V7.41503C20.5 6.56706 19.9653 5.81127 19.1656 5.52905Z"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M12 10L17.625 7.125M12 10L6.375 7.125M12 10V17.5"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
}
