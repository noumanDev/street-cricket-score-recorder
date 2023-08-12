// AddMatchPopup.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface AddMatchPopupProps {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: (numberOfOvers: number) => void;
}

const AddMatchPopup: React.FC<AddMatchPopupProps> = ({ isVisible, onCancel, onConfirm }) => {
    const [numberOfOvers, setNumberOfOvers] = useState('');

    const handleConfirm = () => {
        const overs = parseInt(numberOfOvers, 10);
        if (!isNaN(overs)) {
            onConfirm(overs);
            setNumberOfOvers('');
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Enter Number of Overs:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={numberOfOvers}
                        onChangeText={setNumberOfOvers}
                    />
                    <View style={styles.buttonsContainer}>
                       
                        <TouchableOpacity style={styles.confirmButton} onPress={onCancel}>
                            <Text style={styles.buttonText}>cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cancelButton: {
        marginRight: 10,
    },
    confirmButton: {
        backgroundColor: 'blue',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default AddMatchPopup;
