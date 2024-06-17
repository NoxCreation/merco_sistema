import React from "react";

type Props = {
  color?: string;
};

export default function DocumentIcon({ color = "#718096" }: Props) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.99995 5.5H10.9999M4.99995 12.5H8M4.99995 9H10.9999M12.9999 1L3.00025 1.00002C1.8957 1.00002 1.00028 1.89543 1.00026 2.99998L1 15C0.99998 16.1045 1.89541 17 3 17H13C14.1045 17 15 16.1046 15 15C15 11 15 7 15 3C15 1.89543 14.1045 1 12.9999 1Z"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
}
