// BallInputComponent.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useMatchContext } from './MatchContext';

const BallInputComponent: React.FC = () => {
    const { addBallToInning, currentInning, currentInningDetails, undoLastBall, toggleLockInning, isFreeHit } = useMatchContext();
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = (score: number, isWide: boolean, isNoBall: boolean, isWicket: boolean = false) => {
        if (isNoBall) {
            // Show the popup for the user to select the score
            setShowPopup(true);
        } else {
            const ballData = {
                score,
                isWide,
                isNoBall,
                isWicket,
            };

            // Add the ball data to the current inning in the match context
            addBallToInning(ballData);
        }
    };

    const handlePopupButtonClick = (selectedScore: number) => {
        // Close the popup and add the selected score + 1 as the ball data to the inning
        setShowPopup(false);
        const ballData = {
            score: selectedScore + 1,
            isWide: false,
            isNoBall: true,
            isWicket: false,
        };

        // Add the ball data to the current inning in the match context
        addBallToInning(ballData);
    };

    return (
        <View style={styles.container}>
            {currentInningDetails && currentInningDetails.locked ?
                <Text>inning is locked</Text> : <View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, styles.dotButton]} onPress={() => handleButtonClick(0, false, false)}>
                            <Text style={styles.buttonText}>Dot</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.normalButton]} onPress={() => handleButtonClick(1, false, false)}>
                            <Text style={styles.buttonText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.normalButton]} onPress={() => handleButtonClick(2, false, false)}>
                            <Text style={styles.buttonText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.normalButton]} onPress={() => handleButtonClick(3, false, false)}>
                            <Text style={styles.buttonText}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, styles.normalButton]} onPress={() => handleButtonClick(4, false, false)}>
                            <Text style={styles.buttonText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.normalButton]} onPress={() => handleButtonClick(5, false, false)}>
                            <Text style={styles.buttonText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.normalButton]} onPress={() => handleButtonClick(6, false, false)}>
                            <Text style={styles.buttonText}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity style={[styles.button, styles.wideButton]} onPress={() => handleButtonClick(1, true, false)}>
                            <Text style={[styles.buttonText, styles.wideButtonText]}>Wide</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.noButton]} onPress={() => handleButtonClick(0, false, true)}>
                            <Text style={[styles.buttonText, styles.noButtonText]}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={isFreeHit} style={[styles.button, styles.wicketButton]} onPress={() => handleButtonClick(0, false, false, true)}>
                            <Text style={[styles.buttonText, styles.wicketButtonText]}>Wicket</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.undoButton]} onPress={undoLastBall}>
                            <Text style={[styles.buttonText, styles.undoButtonText]}>Undo</Text>
                        </TouchableOpacity>
                    </View>

                </View>}
            <View style={styles.row}>


                <TouchableOpacity style={[styles.button, styles.endInningButton]} onPress={toggleLockInning}>
                    <Text style={[styles.buttonText, styles.endInningText]}>{currentInningDetails?.locked ? "unlock" : "lock"} Inning</Text>
                </TouchableOpacity>
            </View>

            {/* Popup for No Ball */}
            <Modal visible={showPopup} transparent animationType="fade">
                <View style={styles.popupContainer}>
                    <TouchableOpacity style={styles.popupButton} onPress={() => handlePopupButtonClick(0)}>
                        <Text style={styles.popupButtonText}>Dot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupButton} onPress={() => handlePopupButtonClick(1)}>
                        <Text style={styles.popupButtonText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupButton} onPress={() => handlePopupButtonClick(2)}>
                        <Text style={styles.popupButtonText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupButton} onPress={() => handlePopupButtonClick(3)}>
                        <Text style={styles.popupButtonText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupButton} onPress={() => handlePopupButtonClick(4)}>
                        <Text style={styles.popupButtonText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupButton} onPress={() => handlePopupButtonClick(5)}>
                        <Text style={styles.popupButtonText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupButton} onPress={() => handlePopupButtonClick(6)}>
                        <Text style={styles.popupButtonText}>6</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginLeft:2
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalButton: {
        backgroundColor: '#f1f1f1',
    },
    dotButton: {
        backgroundColor: '#f1f1f1',
    },
    wideButton: {
        backgroundColor: '#cc0000',
    },
    wideButtonText: {
        color: 'white',
    },
    noButton: {
        backgroundColor: '#cc0000',
    },
    noButtonText: {
        color: 'white',
    },
    wicketButton: {
        backgroundColor: '#cc0000',
    },
    wicketButtonText: {
        color: 'white',
    },
    undoButton: {
        backgroundColor: '#cc0000',
    },
    undoButtonText: {
        color: 'white',
    },
    endInningButton: {
        backgroundColor: 'red',
        maxWidth:300
    },
    endInningText: {
        color: 'white',
    },
    popupContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 10,
        marginLeft: 10,
    },
    popupButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BallInputComponent;
