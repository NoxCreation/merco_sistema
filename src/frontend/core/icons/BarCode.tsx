import React from "react";

type Props = {
  color?: string;
};

export default function BarCode({ color = "#718096" }: Props) {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.20004 12.874H16.8M9 17.674V8.074M7 17.674V8.074M11 17.674V8.074M15 17.674V8.074M17 17.674V8.074M16 4.87402H18C19.1046 4.87402 20 5.76945 20 6.87402V8.87402M16 20.874H18C19.1046 20.874 20 19.9786 20 18.874V16.874M8 4.87402H6C4.89543 4.87402 4 5.76945 4 6.87402V8.87402M8 20.874H6C4.89543 20.874 4 19.9786 4 18.874V16.874" stroke="white" stroke-width="1.25" stroke-linecap="round" />
    </svg>
  );
}
