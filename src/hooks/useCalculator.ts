import { useState, useCallback } from 'react';
import { CalculatorState, Operator, initialState, calculate } from '../utils/calculator';

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const handleNumber = useCallback((num: string) => {
    setState(prev => {
      if (prev.shouldResetDisplay) {
        return {
          ...prev,
          currentValue: num,
          shouldResetDisplay: false
        };
      }
      return {
        ...prev,
        currentValue: prev.currentValue === '0' ? num : prev.currentValue + num
      };
    });
  }, []);

  const handleOperator = useCallback((operator: Operator) => {
    setState(prev => {
      if (prev.operator && !prev.shouldResetDisplay) {
        const result = calculate(prev);
        return {
          currentValue: result,
          previousValue: result,
          operator,
          shouldResetDisplay: true
        };
      }
      return {
        ...prev,
        previousValue: prev.currentValue,
        operator,
        shouldResetDisplay: true
      };
    });
  }, []);

  const handleEqual = useCallback(() => {
    setState(prev => {
      if (!prev.operator || prev.shouldResetDisplay) return prev;
      const result = calculate(prev);
      return {
        ...initialState,
        currentValue: result
      };
    });
  }, []);

  const handleClear = useCallback(() => {
    setState(initialState);
  }, []);

  const handleDecimal = useCallback(() => {
    setState(prev => {
      if (prev.shouldResetDisplay) {
        return {
          ...prev,
          currentValue: '0.',
          shouldResetDisplay: false
        };
      }
      if (prev.currentValue.includes('.')) return prev;
      return {
        ...prev,
        currentValue: prev.currentValue + '.'
      };
    });
  }, []);

  return {
    display: state.currentValue,
    equation: state.previousValue && state.operator ? `${state.previousValue} ${state.operator}` : '',
    handleNumber,
    handleOperator,
    handleEqual,
    handleClear,
    handleDecimal
  };
}; 