import { KeyboardTypeOptions, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { styleDefault } from "../style";
import { useRef } from "react";
import { theme } from "../../../styles";

interface Props {
    esquerda?: boolean;
    marcacao?: string;
    obrigatorio?: boolean;
    text: string;
    title?: string;
    keyboardType?: KeyboardTypeOptions;
    placeholder: string;
    set: (text: string) => void;
}

export default function InputDefault(inputDefault: Props) {
    const inputRef = useRef<TextInput>(null);

    const handleChangeText = (text: string) => {
        if (inputDefault.keyboardType === 'numeric') {
            const sanitizedText = text.replace(/[^0-9]/g, '');
            inputDefault.set(sanitizedText);
        } else {
            inputDefault.set(text);
        }
    };

    return (<View style={styleDefault.viewPrincipal}>
        {inputDefault.title &&
            <View style={styleDefault.viewInputTitle}>
                <Text style={styleDefault.inputTitle}>{inputDefault.title}</Text>
                {
                    inputDefault.obrigatorio &&
                    <Text style={styleDefault.obrigatorio}>*</Text>
                }
            </View>
        }

        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
            <View style={styleDefault.viewInput}>
                {inputDefault.marcacao && inputDefault.esquerda &&
                    <Text style={styleDefault.inputText}>{inputDefault.marcacao}</Text>
                }
                <TextInput
                    keyboardType={inputDefault.keyboardType || 'default'}
                    onChangeText={handleChangeText}
                    placeholder={inputDefault.placeholder}
                    placeholderTextColor={theme.cinza2}
                    ref={inputRef}
                    style={styleDefault.inputText}
                >
                    {inputDefault.text}
                </TextInput>
                {inputDefault.marcacao && inputDefault.esquerda === undefined &&
                    <Text style={styleDefault.inputText}> {inputDefault.marcacao}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    </View>)
}