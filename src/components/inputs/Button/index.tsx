import { Pressable, TextStyle, Animated, ViewStyle } from "react-native";

interface Props {
    color: string;
    colorPress?: string;
    background: string;
    backgroundPress?: string;
    onPress: () => void;
    style?: TextStyle;
    width?: ViewStyle['width'];
    title: string;
}

export default function Button(button: Props) {
    const animatedValue = new Animated.Value(0);

    const startAnimation = (pressed: boolean) => {
        Animated.timing(animatedValue, {
            toValue: pressed ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [button.background, button.backgroundPress || button.background],
    });

    const textColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [button.color, button.colorPress || button.color],
    });


    return (
        <Pressable
            onPress={() => button.onPress()}
            onPressIn={() => {
                startAnimation(true);
            }}
            onPressOut={() => startAnimation(false)}
        >
            <Animated.View style={{ backgroundColor, borderRadius: 5, width: button.width || 'auto' }}>
                <Animated.Text style={[{ color: textColor, textAlign: 'center' }, button.style]}>
                    {button.title}
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
}