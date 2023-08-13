import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getOrdinalSuffix } from './utility';
import _ from 'lodash';

// (Rest of the code remains the same)

const BallDisplay: React.FC<Props> = ({ balls }) => {
    const scrollViewRef = useRef<ScrollView>(null);

    // Scroll to the last ball when the balls array changes
    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [balls]);

    // Group balls by overs
    const groupedBalls: Ball[][] = balls;

    return (
        <ScrollView
            horizontal // Set the horizontal prop to display items horizontally
            ref={scrollViewRef}
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
        >
            {groupedBalls.map((overBalls, overIndex) => (
                <View key={overIndex} style={styles.overContainer}>
                    <Text style={styles.scoreLabel}>score: {_.sumBy(overBalls, "score")} </Text>
                    <Text style={styles.overLabel}>{`${overIndex + 1}${getOrdinalSuffix(overIndex + 1)} over`} </Text>
                    <View style={styles.overLine} />
                    <ScrollView
                        horizontal // Set the horizontal prop to display balls horizontally within an over
                        contentContainerStyle={styles.overContentContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {overBalls.map((ball, ballIndex) => (
                            <View key={ballIndex} style={[styles.ball, ball.isWicket && styles.wicketBall]}>
                                <Text style={styles.ballText}>
                                    {ball.isWide
                                        ? 'WD'
                                        : ball.isNoBall
                                            ? 'NB'
                                            : ball.isWicket
                                                ? 'W'
                                                : ball.score !== null
                                                    ? ball.score.toString()
                                                    : ''}
                                </Text>
                                {ball.score !== null && ball.isNoBall && ball.score > 1 && (
                                    <Text style={styles.scoreText}>{ball.score}</Text>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    overContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    overContentContainer: {
        flexDirection: 'row', // Align balls horizontally within an over
    },
    overLine: {
        height: 2,
        backgroundColor: 'grey', // You can change the color for each over line here
        width: 40 * 6 + 10, // Total width of an over (6 balls + 10 for padding)
        marginBottom: 5
    },
    overLabel: {
        color: 'black', // You can change the color  for each over label here
        fontWeight: 'bold',
    },
    scoreLabel: {
        color: 'grey', // You can change the color  for each over label here
        marginTop: 5,
        opacity: 0.7
    },
    ball: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#2e2e2e',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    wicketBall: {
        backgroundColor: '#cc0000',
    },
    ballText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    scoreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: -5,
    },
});

export default BallDisplay;
