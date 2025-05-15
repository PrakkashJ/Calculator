import { useState, useCallback, useMemo } from 'react';
import { OPERATORS, calculate, formatNumber } from '../utils/calculator';

// Initial state for the calculator
const initialState = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  shouldResetDisplay: false
};

/**
 * Custom hook for calculator functionality
 * @returns {Object} Calculator state and handlers
 */
export const useCalculator = () => {
  const [state, setState] = useState(initialState);

  // Reset calculator to initial state
  const resetCalculator = useCallback(() => {
    setState(initialState);
  }, []);

  // Handle number input
  const handleNumber = useCallback((number) => {
    setState(prev => {
      if (prev.shouldResetDisplay) {
        return {
          ...prev,
          currentValue: number,
          shouldResetDisplay: false
        };
      }

      if (prev.currentValue === '0' && number !== '.') {
        return {
          ...prev,
          currentValue: number
        };
      }

      if (number === '.' && prev.currentValue.includes('.')) {
        return prev;
      }

      return {
        ...prev,
        currentValue: prev.currentValue + number
      };
    });
  }, []);

  // Handle operator input
  const handleOperator = useCallback((operator) => {
    setState(prev => {
      if (prev.operator && !prev.shouldResetDisplay) {
        try {
          const result = calculate(
            prev.previousValue,
            prev.currentValue,
            prev.operator
          );
          return {
            currentValue: result.toString(),
            previousValue: result.toString(),
            operator,
            shouldResetDisplay: true
          };
        } catch (error) {
          return {
            ...initialState,
            currentValue: 'Error'
          };
        }
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operator,
        shouldResetDisplay: true
      };
    });
  }, []);

  // Handle equals operation
  const handleEqual = useCallback(() => {
    setState(prev => {
      if (!prev.operator || !prev.previousValue) {
        return prev;
      }

      try {
        const result = calculate(
          prev.previousValue,
          prev.currentValue,
          prev.operator
        );
        return {
          ...initialState,
          currentValue: result.toString()
        };
      } catch (error) {
        return {
          ...initialState,
          currentValue: 'Error'
        };
      }
    });
  }, []);

  // Handle decimal point
  const handleDecimal = useCallback(() => {
    handleNumber('.');
  }, [handleNumber]);

  // Memoize formatted display values
  const display = useMemo(() => formatNumber(state.currentValue), [state.currentValue]);
  const equation = useMemo(() => 
    state.previousValue && state.operator
      ? `${formatNumber(state.previousValue)} ${state.operator}`
      : '',
    [state.previousValue, state.operator]
  );

  return {
    display,
    equation,
    handleNumber,
    handleOperator,
    handleEqual,
    handleClear: resetCalculator,
    handleDecimal
  };
}; 