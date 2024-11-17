import { Pressable, Text, View } from "react-native";
import { styleDefault } from "../style";

interface Props {
    titulo: string;
    status: number;
    set: (status: number) => void;
    subtitulos: string[];
}

export default function RadioButton(radiobutton: Props) {
    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewInputTitle}>
                <Text style={styleDefault.inputTitle}>{radiobutton.titulo}</Text>
            </View>
            <View style={styleDefault.viewRadiobuttonPrincipal}>
                {radiobutton.subtitulos.map((subtitulo, index) =>
                    <View style={styleDefault.viewRadiobutton} key={index}>
                        <Pressable onPress={() => radiobutton.set(index)}>
                            <View
                                style={radiobutton.status !== index ?
                                    styleDefault.inputRadiobutton :
                                    styleDefault.inputRadiobuttonSelected
                                }
                            />
                        </Pressable>
                        <Text style={styleDefault.radioText}>{subtitulo}</Text>
                    </View>
                )}
            </View>
        </View>
    )
}