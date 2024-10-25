import { useEffect, useState } from "react";
import { Text, View, Image, Pressable, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styleDefault } from "../style";
import { format } from "date-fns";

interface Props {
    data: Date;
    title: string;
    set: (data: Date) => void;
}

export default function InputDataCheckout(inputDataCheckout: Props) {
    const [isDateLocked, setIsDateLocked] = useState(true);
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const today = new Date();

    const handleToggleImage = () => {
        setIsDateLocked(!isDateLocked);
        if (!isDateLocked) {
            inputDataCheckout.set(today);
        }
    };

    function handleDateChange(_event: any, selectedDate: Date | undefined) {
        if (selectedDate) {
            inputDataCheckout.set(selectedDate);
        }
        if (Platform.OS !== 'ios') {
            setIsPickerVisible(false);
        }
    }

    useEffect(() => {
        const isSameDate = (date1: Date, date2: Date) => {
            return (
                date1.getDate() === date2.getDate() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getFullYear() === date2.getFullYear()
            );
        };
    
        if (!isSameDate(inputDataCheckout.data, today)) {
            setIsDateLocked(false);
        }
    }, [inputDataCheckout.data]);

    const formatDate = (date: Date) => {
        return format(date, "dd/MM/yyyy");
    };


    const openDatePicker = () => {
        setIsPickerVisible(true);
    };

    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewInputTitle}>
                <Text style={styleDefault.inputTitle}>{inputDataCheckout.title}</Text>
                <Text style={styleDefault.obrigatorio}>*</Text>
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
                <Text style={styleDefault.checkText}>Hoje</Text>
                {isDateLocked ? (
                    <View style={[styleDefault.viewTextSelected, styleDefault.borderTextSelected]}>
                        <Text style={styleDefault.selectText}>
                            {formatDate(today)}
                        </Text>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity onPress={openDatePicker}>
                            <View style={styleDefault.viewInputCheck}>
                                <Text style={styleDefault.inputText}>
                                    {formatDate(inputDataCheckout.data)}
                                </Text>
                                <Image
                                    source={require("../../../../assets/calendar.png")}
                                    style={styleDefault.inputIcons}
                                />
                            </View>
                        </TouchableOpacity>

                        {isPickerVisible && (
                            <DateTimePicker
                                maximumDate={today}
                                mode="date"
                                value={inputDataCheckout.data}
                                onChange={handleDateChange}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}
