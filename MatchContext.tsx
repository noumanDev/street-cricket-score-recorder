// MatchContext.tsx

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import AddMatchPopup from './AddMatchPopup';

// Import the types from the previous section (Inning and CricketMatch)
export type InningType = 'inning1' | 'inning2';

const calculateScoreNWickets = (balls: Ball[]) => {
    let totalScore = 0;
    let totalWickets = 0;
    balls.forEach((ball) => {
        if (ball.score !== undefined) {
            totalScore += ball.score;
            if (ball.isWicket) {
                totalWickets += 1;
            }
        }
    });

    return { score: totalScore, wickets: totalWickets };
};
const calculateInningStat = (balls: Ball[]) => {
    const BallsNWickets = calculateScoreNWickets(balls);
    const overDetails = groupBallsByOvers(balls);
    return { ...BallsNWickets, overDetails };
};

const groupBallsByOvers = (balls: Ball[]): GroupedBallsAndOvers => {
    const groupedBalls: GroupedBalls = [];
    let currentOver: Ball[] = [];
    let validDeliveriesInOver = 0;


    balls.forEach((ball) => {
        if (validDeliveriesInOver === 6) {
            groupedBalls.push(currentOver);
            currentOver = [];
            validDeliveriesInOver = 0;

        }

        if (!ball.isNoBall && !ball.isWide) {
            currentOver.push(ball);
            validDeliveriesInOver += 1;
        } else {
            currentOver.push(ball);
        }
    });

    if (currentOver.length > 0) {
        groupedBalls.push(currentOver);
    }

    const oversCount: OversCount = {
        totalOvers: groupedBalls.length === 0 ? 0 : validDeliveriesInOver === 0 || validDeliveriesInOver === 6 ? groupedBalls.length : groupedBalls.length - 1,
        lastOverBalls: validDeliveriesInOver,
    };

    return { groupedBalls, oversCount };
};


interface MatchContextType {
    matches: CricketMatch[];
    currentMatchIndex: number;
    switchToNextMatch: () => void;
    switchToPreviousMatch: () => void;
    matchTitle: String | null;
    addNewMatch: (numberOfOvers: number) => void;
    currentMatch?: CricketMatch;
    currentInning: InningType;
    setCurrentInning: React.Dispatch<React.SetStateAction<InningType>>;
    addBallToInning: any;
    currentInningDetails: Inning | null | undefined
    currentInningStats: InningStats;
    undoLastBall: () => void;
    toggleLockInning: () => void;
    currentInningOvers: GroupedBallsAndOvers;
    editMatch: (newOvers: number) => void
}
const testMatches: CricketMatch[] = [
    {
        id: 1,
        inning1: { balls: [], locked: false, },
        inning2: { balls: [], locked: true, },
        matchDate: new Date(),
        overs: 8
    }
];

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatchContext = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error('useMatchContext must be used within a MatchProvider');
    }
    return context;
};

const MatchProvider: React.FC = ({ children }) => {
    const [matches, setMatches] = useState<CricketMatch[]>([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState<number>(0);
    const [currentInning, setCurrentInning] = useState<InningType>('inning1');

    // Fetch matches from AsyncStorage on initial load
    useEffect(() => {
        const fetchMatches = async () => {
            try {

                const storedMatches = await AsyncStorage.getItem('matches');

                if (storedMatches) {
                    const initialData = JSON.parse(storedMatches).length > 0 ? JSON.parse(storedMatches) : testMatches;
                    setMatches(initialData);
                    setCurrentMatchIndex(0);
                }

            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    const currentMatch = useMemo(() => { if (matches.length > 0) return matches[currentMatchIndex] }, [currentMatchIndex, matches]);

    const matchTitle = useMemo(() => {
        if (!currentMatch) return "";
        const matchDate = new Date(currentMatch.matchDate);
        return `${matchDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
        })
            } Match ${currentMatch.id}`
    }, [currentMatch, currentMatchIndex, matches])

    // Save matches to AsyncStorage whenever it changes
    useEffect(() => {
        const saveMatches = async () => {
            try {
                await AsyncStorage.setItem('matches', JSON.stringify(matches));
            } catch (error) {
                console.error('Error saving matches:', error);
            }
        };
        saveMatches();
    }, [matches]);

    const switchToNextMatch = () => {
        setCurrentMatchIndex((prevIndex) => Math.min(prevIndex + 1, matches.length - 1));
    };

    const switchToPreviousMatch = () => {
        setCurrentMatchIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const addNewMatch = (numberOfOvers: number) => {
        // Generate a unique ID for the new match
        const newMatchId = matches.length > 0 ? Math.max(...matches.map((match) => match.id)) + 1 : 1;

        // Create the new match object
        const newMatch: CricketMatch = {
            id: newMatchId,
            matchDate: new Date(),
            overs: numberOfOvers,
            inning1: { balls: [], locked: false },
            inning2: { balls: [], locked: true },
        };

        setMatches((prevMatches) => [...prevMatches, newMatch]);
    };

    const addBallToInning = useCallback((ballData: Ball) => {
        setMatches(prevMatches => {
            const updatedMatches = [...prevMatches];
            const currentMatch = updatedMatches[currentMatchIndex];

            if (!currentMatch[currentInning]?.locked) {
                currentMatch[currentInning].balls = [...currentMatch[currentInning]?.balls, ballData];
            }

            return updatedMatches;
        });
    }, [currentInning, currentMatchIndex, setMatches]);

    const toggleLockInning = useCallback(() => {
        setMatches(prevMatches => {
            const updatedMatches = [...prevMatches];
            const currentMatch = updatedMatches[currentMatchIndex];
            currentMatch[currentInning].locked = !currentMatch[currentInning].locked;
            return updatedMatches;
        });
    }, [currentInning, currentMatchIndex, setMatches]);

    const undoLastBall = useCallback(() => {
        setMatches((prevMatches) => {
            const updatedMatches = [...prevMatches];
            const currentMatch = updatedMatches[currentMatchIndex];

            if (!currentMatch[currentInning]?.locked) {
                const newBalls = currentMatch[currentInning].balls.slice(0, -1); // Create a new array without the last ball
                currentMatch[currentInning].balls = newBalls;
            }

            return updatedMatches;
        });
    }, [currentInning, currentMatchIndex, setMatches]);

    const currentInningDetails = useMemo(() => currentMatch ? currentMatch[currentInning] : null, [currentInning, currentMatch]);

    const currentInningStats = useMemo(() => {

        let stats: InningStats = { score: 0, wickets: 0, overDetails: { groupedBalls: [], oversCount: { totalOvers: 0, lastOverBalls: 0 } } };

        if (currentInningDetails && currentInningDetails.balls) {
            stats = { ...calculateInningStat(currentInningDetails.balls) };
        }

        return stats;
    }, [currentInningDetails?.balls, calculateInningStat, addBallToInning, undoLastBall]);

    const currentInningOvers = useMemo(() => {
        let overDetails: GroupedBallsAndOvers = { groupedBalls: [], oversCount: { totalOvers: 0, lastOverBalls: 0 } }
        if (currentInningDetails?.balls)
            overDetails = groupBallsByOvers(currentInningDetails?.balls);
        return overDetails
    }, [currentInningDetails?.balls])

    const editMatch = (newOvers: number) => {
        setMatches(prevMatches => {
            const updatedMatches = [...prevMatches];
            const currentMatch = updatedMatches[currentMatchIndex];

            // Update the overs of the current match
            currentMatch.overs = newOvers;

            return updatedMatches;
        });
    };

    return (
        <MatchContext.Provider
            value={{
                matches,
                currentMatchIndex,
                switchToNextMatch,
                switchToPreviousMatch,
                matchTitle,
                addNewMatch,
                currentMatch,
                currentInning,
                setCurrentInning,
                addBallToInning,
                currentInningDetails,
                currentInningStats,
                undoLastBall,
                toggleLockInning,
                currentInningOvers,
                editMatch
            }}
        >
            {children}

        </MatchContext.Provider>
    );
};



export default MatchProvider;
