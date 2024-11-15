import { useEffect, useState } from "react";
import { Text, View, Image, Pressable, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styleDefault } from "../style";
import { format } from "date-fns";

interface Props {
    data?: Date;
    title: string;
    set: (data?: Date) => void;
};

export default function InputData(inputData: Props) {
    const [isDateLocked, setIsDateLocked] = useState(true);
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const handleToggleImage = () => {
        setIsDateLocked(!isDateLocked);
        inputData.set(isDateLocked ? undefined : new Date());
    };

    useEffect(() => setIsDateLocked(inputData.data !== undefined), []);

    function handleDateChange(_event: any, selectedDate: Date | undefined) {
        if (selectedDate) {
            inputData.set(selectedDate);
        };
        if (Platform.OS !== 'ios') {
            setIsPickerVisible(false);
        };
    };

    const formatDate = (date: Date) => {
        return format(date, "dd/MM/yyyy");
    };


    const openDatePicker = () => {
        setIsPickerVisible(true);
    };

    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewInputTitle}>
                <Text style={styleDefault.inputTitle}>{inputData.title}</Text>
            </View>

            <View style={styleDefault.viewDataCheck}>
                <Pressable onPress={handleToggleImage}>
                    <Image
                        source={
                            isDateLocked
                                ? require("../../../../assets/checkTrue.png")
                                : require("../../../../assets/checkFalse.png")
                        }
                        style={styleDefault.inputIcons}
                    />
                </Pressable>
                {inputData.data !== undefined ?
                    <View>
                        <TouchableOpacity onPress={openDatePicker}>
                            <View style={styleDefault.viewInputCheck2}>
                                <Text style={styleDefault.inputText}>
                                    {formatDate(inputData.data)}
                                </Text>
                                <Image
                                    source={require("../../../../assets/calendar.png")}
                                    style={styleDefault.inputIcons}
                                />
                            </View>
                        </TouchableOpacity>

                        {isPickerVisible && (
                            <DateTimePicker
                                maximumDate={new Date()}
                                mode="date"
                                value={inputData.data}
                                onChange={handleDateChange}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            />
                        )
                        }
                    </View>
                    :
                    <Text style={styleDefault.checkText}>Filtar data</Text>
                }
            </View>
        </View>
    );
};