import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {listToNumber, numberToList, NUMPAD_KEYS} from './src/utils';
import {flip, identity, map} from 'ramda';

function Numpad({onPress}: any) {
  function keyToButton(key: string) {
    return (
      <Button testID={key} key={key} title={key} onPress={() => onPress(key)} />
    );
  }

  return <>{map(keyToButton, NUMPAD_KEYS)}</>;
}

function CalculatorSection({onPress, input}: any) {
  function formatTotal(x: number) {
    return x.toFixed(2);
  }

  return (
    <View style={styles.sectionContainer}>
      <Text testID={'total'}>{formatTotal(input)}</Text>
      <Numpad onPress={onPress} />
    </View>
  );
}

const App = () => {
  const INITIAL_STATE = {
    reg1: [],
    reg2: [],
    op: undefined,
  };

  const [registers, setRegisters] = useState(INITIAL_STATE);

  const addKeyToState = (key: string) => (state: any) => {
    return {...state, reg1: [...state.reg1, key]};
  };

  function pushMinusToState(state: any) {
    return {
      ...state,
      reg1: [],
      reg2: state.reg1,
      swapArguments: false,
      op: (a: string[], b: string[]) =>
        numberToList(listToNumber(b) - listToNumber(a)),
    };
  }

  function pushPlusToState(state: any) {
    return {
      ...state,
      reg1: [],
      reg2: state.reg1,
      swapArguments: false,
      op: (a: string[], b: string[]) =>
        numberToList(listToNumber(a) + listToNumber(b)),
    };
  }

  function concludeState(state: any) {
    if (!state.op) {
      return state;
    }
    return {
      ...state,
      reg1: (state.swapArguments ? flip : identity)(state.op)(
        state.reg1,
        state.reg2,
      ),
      reg2: state.swapArguments ? state.reg2 : state.reg1,
      swapArguments: true,
    };
  }

  function reset() {
    return INITIAL_STATE;
  }

  function onPress(key: string) {
    if (key === '+') {
      setRegisters(pushPlusToState);
    } else if (key === 'AC') {
      setRegisters(reset);
    } else if (key === '-') {
      setRegisters(pushMinusToState);
    } else if (key === '=') {
      setRegisters(concludeState);
    } else {
      setRegisters(addKeyToState(key));
    }
  }

  function selectInput() {
    return listToNumber(
      registers?.reg1?.length ? registers.reg1 : registers.reg2,
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <CalculatorSection onPress={onPress} input={selectInput()} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
