import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface AddMatchPopupProps {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: (numberOfOvers: number) => void;
    isEditing?: boolean; // Add this prop for editing
    initialOvers?: number; // Add this prop for editing
}

const AddMatchPopup: React.FC<AddMatchPopupProps> = ({ isVisible, onCancel, onConfirm, isEditing = false, initialOvers = 0 }) => {
    const [numberOfOvers, setNumberOfOvers] = useState(isEditing ? initialOvers.toString() : '');

    useEffect(() => {
        if (isEditing) {
            setNumberOfOvers(initialOvers.toString());
        }
    }, [isEditing, initialOvers]);

    const handleConfirm = () => {
        const overs = parseInt(numberOfOvers, 10);
        if (!isNaN(overs)) {
            onConfirm(overs);
            setNumberOfOvers('');
            onCancel();//dismiss modal
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>
                        {isEditing ? 'Edit Number of Overs:' : 'Enter Number of Overs:'}
                    </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={numberOfOvers}
                        onChangeText={setNumberOfOvers}
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.confirmButton, styles.cancelButton]} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.buttonText}>{isEditing ? 'Update' : 'OK'}</Text>
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
    cancelButton: {
        marginRight: 10,
        backgroundColor: 'gray', // Change the color for cancel button
    },
});

export default AddMatchPopup;
