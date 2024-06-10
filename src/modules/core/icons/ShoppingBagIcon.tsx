import React from "react";

type Props = {
  color?: string;
};

export default function ShoppingBagIcon({ color = "#718096" }: Props) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 7H4.5V17.78C4.5 18.919 4.5 19.4885 4.72517 19.9219C4.91492 20.2872 5.21276 20.5851 5.57805 20.7748C6.01153 21 6.58102 21 7.72 21H17.28C18.419 21 18.9885 21 19.4219 20.7748C19.7872 20.5851 20.0851 20.2872 20.2748 19.9219C20.5 19.4885 20.5 18.919 20.5 17.78V7Z"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M16.9717 3H8.02831C7.71 3 7.55084 3 7.40657 3.04459C7.28413 3.08243 7.1701 3.14346 7.0707 3.22434C6.95356 3.31965 6.86528 3.45208 6.68871 3.71693L4.5 7H20.5L18.3113 3.71693C18.1347 3.45208 18.0464 3.31965 17.9293 3.22434C17.8299 3.14346 17.7159 3.08243 17.5934 3.04459C17.4492 3 17.29 3 16.9717 3Z"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M8.5 10C9.94434 13.6108 15.0557 13.6108 16.5 10"
        stroke={color}
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  );
}
