import React from "react";

type Props = {
  color?: string;
};

export default function HomeIcon({ color = "#718096" }: Props) {
  return (
    <svg
      width="17"
      height="19"
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 16V7.82842C15.5 7.29799 15.2794 6.80146 14.869 6.46531C13.7908 5.58195 11.5968 3.82622 9.8509 2.26565C9.0717 1.56917 7.8873 1.52517 7.0938 2.2053L2.19842 6.40135C1.75513 6.78131 1.5 7.33601 1.5 7.91986V16C1.5 17.1046 2.39543 18 3.5 18H4C5.10457 18 6 17.1046 6 16V14C6 12.8954 6.8954 12 8 12H9C10.1046 12 11 12.8954 11 14V16C11 17.1046 11.8954 18 13 18H13.5C14.6046 18 15.5 17.1046 15.5 16Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
