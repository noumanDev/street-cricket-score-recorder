import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const FreeHitIndicator: React.FC = () => {
    const [scaleAnim] = useState(new Animated.Value(1));

    const animateScale = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
        ]).start(animateScale);
    };

    useEffect(() => {
        animateScale();
    }, []);

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.text}>Free Hit</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default FreeHitIndicator;
