import {map, range, toString} from 'ramda';

export const NUMPAD_KEYS = map(toString, range(0, 10)).concat(
  '+',
  '-',
  '=',
  'AC',
);

export function numberToList(x: number) {
  return x.toFixed(2).replace('.', '').split('');
}

export function listToNumber(list: string[]): number {
  if (!list || !list?.length) {
    return 0.0;
  }
  return parseInt(list.join(''), 10) / 100.0;
}
