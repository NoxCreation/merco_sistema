import React from "react";

type Props = {
  color?: string;
};

export default function ListIcon({ color = "#718096" }: Props) {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 2H6M15 7H6M15 12H6M1 1H3V3H1V1ZM1 6H3V8H1V6ZM1 11H3V13H1V11Z"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
}
