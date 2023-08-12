import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface CustomStepperProps {
    text: string;
    nextButtonHandler: () => void;
    previousButtonHandler: () => void;
}

const Stepper: React.FC<CustomStepperProps> = ({
    text,
    nextButtonHandler,
    previousButtonHandler,
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>

            <TouchableOpacity onPress={previousButtonHandler}>
                <Text style={{ fontSize: 40 }}>{"<"}</Text>
            </TouchableOpacity>
            <Text>{text}</Text>
            <TouchableOpacity onPress={nextButtonHandler}>
                <Text style={{ fontSize: 40 }}>{">"}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Stepper;
