import {map, range, toString} from 'ramda';

export const NUMPAD_KEYS = map(toString, range(0, 10)).concat('+', '-', '=');
