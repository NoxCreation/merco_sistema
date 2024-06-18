import React from "react";

type Props = {
  color?: string;
};

export default function CurvedArrowIcon({ color = "#718096" }: Props) {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.83325 10.5846L4.54761 7.1559C4.89431 6.4625 5.86405 6.4102 6.28325 7.0624L8.61845 10.6949C9.08665 11.4233 10.1966 11.2527 10.4244 10.4172L12.8333 1.58462M9.83355 3.08234L13.0006 1.25391L14.829 4.42084M3.83325 12.0846C3.83325 12.913 3.16168 13.5846 2.33325 13.5846C1.50482 13.5846 0.833252 12.913 0.833252 12.0846C0.833252 11.2562 1.50482 10.5846 2.33325 10.5846C3.16168 10.5846 3.83325 11.2562 3.83325 12.0846Z"
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
