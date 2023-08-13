/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Stepper from './Stepper';
import MatchProvider, { useMatchContext } from './MatchContext';
import AddMatchButton from './AddMatchButton';
import BallInputComponent from './BallInputComponent';
import MultiTabComponent from './MultiTabComponent';
import StatBoard from './StatBoard';
import BallDisplay from './BallDisplay';

const MainComponent: React.FC = () => {
    const { switchToNextMatch, switchToPreviousMatch, matchTitle, currentMatchIndex, currentMatch, currentInning, currentInningDetails, currentInningStats } = useMatchContext();

    return (
        <View style={styles.container}>
            {/* Other components */}
            <Stepper

            />
            <MultiTabComponent />
            <View style={{ flex: 1 }}>
                <StatBoard stats={currentInningStats} balls={currentInningDetails?.balls || []} />
            </View>
            <BallInputComponent />
            <AddMatchButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },

});
export default MainComponent;
