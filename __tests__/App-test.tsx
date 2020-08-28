import 'react-native';
import React from 'react';
import {map} from 'ramda';

import {render} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import App from '../App';
import {NUMPAD_KEYS} from '../src/utils';

describe('App', () => {
  it('starts with 0', () => {
    const {getByTestId} = render(<App />);
    expect(getByTestId('total')).toHaveTextContent(/^0.00$/);
  });

  it('has numpad', function () {
    const {getByTestId} = render(<App />);

    function checkKey(key: string) {
      expect(getByTestId(key)).toBeTruthy();
    }

    map(checkKey, NUMPAD_KEYS);
  });
});
