export type Operator = '+' | '-' | '*' | '/';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: Operator | null;
  shouldResetDisplay: boolean;
}

export const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  shouldResetDisplay: false,
};

export const calculate = (state: CalculatorState): string => {
  const { currentValue, previousValue, operator } = state;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(current)) return 'Error';

  let result: number;
  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) return 'Error';
      result = prev / current;
      break;
    default:
      return currentValue;
  }

  // Handle floating point precision issues
  if (Number.isInteger(result)) {
    return result.toString();
  }
  return result.toFixed(8).replace(/\.?0+$/, '');
};

export const formatNumber = (num: string): string => {
  if (num === 'Error') return num;
  const number = parseFloat(num);
  if (isNaN(number)) return '0';
  
  // Format large numbers
  if (Math.abs(number) > 1e9) {
    return number.toExponential(2);
  }
  
  // Format decimal numbers
  if (!Number.isInteger(number)) {
    return number.toFixed(8).replace(/\.?0+$/, '');
  }
  
  return number.toString();
}; 