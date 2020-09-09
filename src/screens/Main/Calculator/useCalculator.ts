import {useState} from 'react';
import {listToNumber, numberToList} from '../../../utils';
import {flip, identity} from 'ramda';
import {ICalculator} from './ICalculator';

export const useCalculator = (): ICalculator => {
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

  function selectInput(): number {
    return listToNumber(
      registers?.reg1?.length ? registers.reg1 : registers.reg2,
    );
  }

  return {onPress, display: selectInput().toFixed(2)};
};
