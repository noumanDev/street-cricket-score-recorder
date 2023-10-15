import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMatchContext } from './MatchContext';
import AddMatchPopup from './AddMatchPopup';

const Stepper: React.FC = () => {
    const { switchToNextMatch, editMatch, switchToPreviousMatch, matchTitle, currentMatchIndex, currentMatch, currentInning, currentInningDetails, currentInningStats } = useMatchContext();
    const [isAddMatchPopupVisible, setAddMatchPopupVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={switchToPreviousMatch}>
                <Text style={styles.arrows}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.middleContainer} onPress={() => setAddMatchPopupVisible(true)}>
                <Text style={styles.whiteColor}>{matchTitle}</Text>
                <Text style={styles.whiteColor}>{currentMatch?.overs} overs match</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={switchToNextMatch}>
                <Text style={styles.arrows}>{">"}</Text>
            </TouchableOpacity>
            <AddMatchPopup
                isVisible={isAddMatchPopupVisible}
                onCancel={() => setAddMatchPopupVisible(false)}
                onConfirm={editMatch}
                isEditing={true}
                initialOvers={currentMatch?.overs}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2e2e2e',
    },
    arrows: {
        fontSize: 40,
        color: "white",
        paddingLeft: 10,
        paddingRight: 10,
    },
    middleContainer: {
        flex: 1,
        alignItems: "center",
    },
    whiteColor: {
        color: "white",
    },
});

export default Stepper;
