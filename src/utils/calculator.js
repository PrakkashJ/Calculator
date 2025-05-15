// Constants for calculator operations
export const OPERATORS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: '×',
  DIVIDE: '÷',
};

// Maximum number before using exponential notation
const MAX_NUMBER = 999999999;

/**
 * Performs arithmetic calculation between two numbers
 * @param {string|number} a - First number
 * @param {string|number} b - Second number
 * @param {string} operator - Operation to perform
 * @returns {number} Result of the calculation
 * @throws {Error} If operation is invalid or division by zero
 */
export const calculate = (a, b, operator) => {
  const num1 = Number(a);
  const num2 = Number(b);

  if (isNaN(num1) || isNaN(num2)) {
    throw new Error('Invalid number');
  }

  switch (operator) {
    case OPERATORS.ADD:
      return num1 + num2;
    case OPERATORS.SUBTRACT:
      return num1 - num2;
    case OPERATORS.MULTIPLY:
      return num1 * num2;
    case OPERATORS.DIVIDE:
      if (num2 === 0) {
        throw new Error('Cannot divide by zero');
      }
      return num1 / num2;
    default:
      throw new Error('Invalid operator');
  }
};

/**
 * Formats a number for display
 * @param {string|number} number - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (number) => {
  const num = Number(number);
  
  if (isNaN(num)) {
    return '0';
  }
  
  // Handle large numbers
  if (Math.abs(num) > MAX_NUMBER) {
    return num.toExponential(2);
  }
  
  // Handle decimals
  if (String(number).includes('.')) {
    const [whole, decimal] = String(number).split('.');
    return `${Number(whole).toLocaleString()}.${decimal}`;
  }
  
  return num.toLocaleString();
}; 