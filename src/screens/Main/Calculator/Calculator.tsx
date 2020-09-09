import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {map} from 'ramda';
import {NUMPAD_KEYS} from '../../../utils';
import {ICalculator} from './ICalculator';

function Numpad({onPress}: any) {
  function keyToButton(key: string) {
    return (
      <Button testID={key} key={key} title={key} onPress={() => onPress(key)} />
    );
  }

  return <>{map(keyToButton, NUMPAD_KEYS)}</>;
}

export function Calculator({onPress, display}: ICalculator) {
  return (
    <View style={styles.sectionContainer}>
      <Text testID={'total'}>{display}</Text>
      <Numpad onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
