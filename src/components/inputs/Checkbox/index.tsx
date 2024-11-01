import { Image, Pressable, Text, View } from "react-native";
import { styleDefault } from "../style";

interface Props {
    status: boolean;
    set: (status: boolean) => void;
    titulo: string
}

export default function Checkbox(checkbox: Props) {
    return (
        <View style={styleDefault.viewCheckbox}>
            <Pressable onPress={() => checkbox.set(!checkbox.status)}>
                <Image
                    source={
                        checkbox.status
                            ? require("../../../../assets/checkTrue.png")
                            : require("../../../../assets/checkFalse.png")
                    }
                    style={styleDefault.inputIconsCheckbox}
                />
            </Pressable>
            <Text style={styleDefault.checkText}>{checkbox.titulo}</Text>
        </View>
    )
}