import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg"

const CheckIcon = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <G clipPath="url(#clip0_3075_21878)">
                <Path d="M5 12L10 17L20 7" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            </G>
            <Defs>
                <ClipPath id="clip0_3075_21878">
                    <Rect width="24" height="24" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default CheckIcon;
