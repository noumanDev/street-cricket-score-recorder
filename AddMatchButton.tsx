


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {

  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';


import  { useMatchContext } from './MatchContext';
import AddMatchPopup from './AddMatchPopup';

function AddMatchButton(): JSX.Element {
  const { addNewMatch } = useMatchContext();
  const [isAddMatchPopupVisible, setAddMatchPopupVisible] = useState(false);

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
