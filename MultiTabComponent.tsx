// MultiTabComponent.tsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { InningType, useMatchContext } from './MatchContext';

const MultiTabComponent: React.FC = () => {
    const { currentInning, setCurrentInning } = useMatchContext();

    const handleTabClick = (inning: InningType) => {
        setCurrentInning(inning);
    };

    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tab, currentInning === 'inning1' ? styles.activeTab : {}]}
                onPress={() => handleTabClick('inning1')}
            >
                <Text style={styles.tabText}>1st Inning</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, currentInning === 'inning2' ? styles.activeTab : {}]}
                onPress={() => handleTabClick('inning2')}
            >
                <Text style={styles.tabText}>2nd Inning</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#64b5f6',
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MultiTabComponent;
