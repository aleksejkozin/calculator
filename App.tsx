import React from 'react';
import {useCalculator} from './src/screens/Main/Calculator/useCalculator';
import {MainScreen} from './src/screens/Main/Main';
import {SafeAreaView, StatusBar} from 'react-native';

const App = () => {
  const calculatorImpl = useCalculator();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <MainScreen calculatorImpl={calculatorImpl} />
      </SafeAreaView>
    </>
  );
};

export default App;
