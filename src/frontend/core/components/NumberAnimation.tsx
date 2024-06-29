import CountUp from 'react-countup';

export const NumberAnimation = ({ value }: { value: number }) => {
    return (
        <CountUp end={value} decimal="." decimals={2} separator=" " duration={0.5}/>
    )
}