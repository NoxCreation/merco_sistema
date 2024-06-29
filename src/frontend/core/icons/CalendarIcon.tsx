import React from "react";

type Props = {
    color?: string;
};

export default function CalendarIcon({ color = "#718096" }: Props) {
    return (
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.61111 4.26291V1.37402V4.26291ZM10.3889 4.26291V1.37402V4.26291ZM3.88889 7.1518H11.1111H3.88889ZM2.44444 14.374H12.5556C13.3533 14.374 14 13.7273 14 12.9296V4.26291C14 3.46517 13.3533 2.81847 12.5556 2.81847H2.44444C1.6467 2.81847 1 3.46517 1 4.26291V12.9296C1 13.7273 1.6467 14.374 2.44444 14.374Z" stroke="#4A5568" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
}
