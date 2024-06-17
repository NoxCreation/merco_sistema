import React from "react";

type Props = {
  color?: string;
};

export default function DollarIcon({ color = "#718096" }: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 18V21M12.5 18H13.5C15.1569 18 16.5 16.6569 16.5 15C16.5 13.3431 15.1569 12 13.5 12H11.5C9.84315 12 8.5 10.6569 8.5 9C8.5 7.34315 9.84315 6 11.5 6H12.5M12.5 18H11.5C9.84315 18 8.5 16.6569 8.5 15M12.5 6V3M12.5 6H13.5C15.1569 6 16.5 7.34315 16.5 9"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
}
