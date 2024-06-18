import { Path, Svg } from "react-native-svg";

const DownIconSolid = ({color}) => {
    const stroke = color ? color : "black";
    return (
        <Svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 1L7 7L13 0.999999" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>

    )
}

export default DownIconSolid;