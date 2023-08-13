import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BallDisplay from './BallDisplay';


interface Props {
    stats: InningStats;
    balls: Ball[] | undefined;
}

const StatBoard: React.FC<Props> = ({ stats, balls }) => {

    return (
        <View style={styles.scoreContainer}>
            <View style={{ flex: 1 }}>
                <View style={styles.scoreDisplay}>
                    <Text style={styles.score}>{stats.score}/{stats.wickets}</Text>
                    <Text style={styles.overs}>({stats.overDetails.oversCount.totalOvers}{`${stats.overDetails.oversCount.lastOverBalls < 6 ? "." + stats.overDetails.oversCount.lastOverBalls : ""}`})</Text>
                </View>
            </View>
            <View style={styles.ballDisplay}>
                <BallDisplay balls={stats.overDetails.groupedBalls} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    scoreContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignSelf: 'center',
        marginBottom: 20,
        width: "100%"

    },
    scoreDisplay: {

        backgroundColor: 'white',
        padding: 10,
        borderRadius: 28,
        maxWidth: "80%",

        alignSelf: 'center',
        marginBottom: 20,
        width: "100%",


        elevation: 5, // Android
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 4,

    },
    
    ballDisplay: {
        // alignSelf: 'flex-end',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    score: {
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    overs: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    wickets: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default StatBoard;
