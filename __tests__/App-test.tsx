import React from 'react';
import 'react-native';
import {map} from 'ramda';

import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import App from '../App';
import {numberToList, NUMPAD_KEYS} from '../src/utils';

describe('App', () => {
  let app: RenderAPI;

  beforeEach(() => {
    app = render(<App />);
  });

  function expectTotal(pattern: any) {
    expect(app.getByTestId('total')).toHaveTextContent(pattern);
  }

  function pressKey(key: string) {
    fireEvent(app.getByTestId(key), 'press');
  }

  function expectTotalNumber(x: number) {
    expectTotal(x.toFixed(2));
  }

  function enterNumber(x: number) {
    map(pressKey, numberToList(x));
  }

  it('should start with 0', () => {
    expectTotal(/^0.00$/);
  });

  it('should not crash when pressing = on an empty op', function () {
    function test() {
      pressKey('=');
      pressKey('=');
    }

    expect(test).not.toThrow();
  });

  it('should show entered number on +', function () {
    const x = 1.23;
    enterNumber(x);
    pressKey('+');
    expectTotalNumber(x);
  });

  it('should have numpad', function () {
    const {getByTestId} = render(<App />);

    function checkKey(key: string) {
      expect(getByTestId(key)).toBeTruthy();
    }

    map(checkKey, NUMPAD_KEYS);
  });

  it('should allow to enter 0.01', function () {
    pressKey('1');
    expectTotal(/^0.01$/);
  });

  it('should allow to enter 123.45', function () {
    enterNumber(123.45);
    expectTotal(/^123.45$/);
  });

  let MATH_CASES = [
    [8.0, '+', 0.02, 8.02],
    [1.1, '-', 2.32, -1.22],
  ];

  test.each(MATH_CASES)('should compute %p %p %p = %p', (a, op, b, result) => {
    enterNumber(a as number);
    pressKey(op as string);
    enterNumber(b as number);
    pressKey('=');
    expectTotal(result);
  });

  function applyOp(op: '-' | '+', value: number) {
    pressKey(op);
    enterNumber(value);
    pressKey('=');
  }

  function repeatLastOp() {
    pressKey('=');
  }

  it('should allow to reset state', function () {
    applyOp('-', 0.09);
    expectTotalNumber(-0.09);
    pressKey('AC');
    expectTotalNumber(0.0);
    repeatLastOp();
    expectTotalNumber(0.0);
  });

  it('should allow to repeat operations', function () {
    applyOp('-', 0.09);
    repeatLastOp();
    expectTotalNumber(-0.18);
    repeatLastOp();
    expectTotalNumber(-0.27);

    applyOp('+', 1.0);
    expectTotalNumber(0.73);
    repeatLastOp();
    expectTotalNumber(1.73);
  });
});
