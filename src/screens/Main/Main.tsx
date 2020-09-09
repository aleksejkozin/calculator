import {ScrollView, StyleSheet} from 'react-native';
import {Calculator} from './Calculator/Calculator';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ICalculator} from './Calculator/ICalculator';

export interface MainScreenProps {
  calculatorImpl: ICalculator;
}

export function MainScreen({calculatorImpl}: MainScreenProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Calculator {...calculatorImpl} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});
