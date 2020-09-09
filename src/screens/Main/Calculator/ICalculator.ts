type CalculatorKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '-'
  | '+'
  | '='
  | 'AC';

export interface ICalculator {
  onPress: (key: CalculatorKey) => void;
  display: string;
}
