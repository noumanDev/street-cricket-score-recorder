


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
    TouchableOpacity,
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
import MainComponent from './HomeComponent';
import AddMatchPopup from './AddMatchPopup';

function AddMatchButton(): JSX.Element {
    const { setAddMatchPopupVisible ,isAddMatchPopupVisible, addNewMatch} = useMatchContext();

    return (<>
        < TouchableOpacity
            style={styles.addButton}
            onPress={() => setAddMatchPopupVisible(true)
            }
        >
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity >
        <AddMatchPopup
            isVisible={isAddMatchPopupVisible}
            onCancel={() => setAddMatchPopupVisible(false)}
            onConfirm={addNewMatch}
        />
    </>
    );
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //position: 'relative', // Important for positioning the button and popup
    },
    addButton: {
      position: 'absolute',
      bottom: 5,
      right: 20,
      
      backgroundColor: '#64b5f6',
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default AddMatchButton;
