import React from "react";

type Props = {
  color?: string;
};

export default function CloseIcon({ color = "#718096" }: Props) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.50001 14.585L11 11.085M11 11.085L14.5 7.58495M11 11.085L14.5 14.585M11 11.085L7.50001 7.58495M20.5 11.085C20.5 16.3317 16.2467 20.585 11 20.585C5.75329 20.585 1.5 16.3317 1.5 11.085C1.5 5.83825 5.75329 1.58496 11 1.58496C16.2467 1.58496 20.5 5.83825 20.5 11.085Z" stroke="#F7FAFC" stroke-width="2.25" stroke-linecap="round" />
    </svg>
  );
}
