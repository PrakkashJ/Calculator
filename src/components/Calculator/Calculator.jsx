import { memo } from 'react';
import { useCalculator } from '../../hooks/useCalculator';
import CalculatorButton from './CalculatorButton';
import './Calculator.css';

const Calculator = () => {
  const {
    display,
    equation,
    handleNumber,
    handleOperator,
    handleEqual,
    handleClear,
    handleDecimal,
  } = useCalculator();

  return (
    <div className="calculator">
      <div className="display">
        <div className="equation" aria-label="Previous calculation">{equation}</div>
        <div className="current" aria-label="Current value">{display}</div>
      </div>
      <div className="buttons">
        <CalculatorButton className="operator" onClick={handleClear}>C</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('÷')}>÷</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('×')}>×</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('-')}>-</CalculatorButton>
        
        <CalculatorButton onClick={() => handleNumber('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => handleNumber('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => handleNumber('9')}>9</CalculatorButton>
        <CalculatorButton className="operator" onClick={() => handleOperator('+')}>+</CalculatorButton>
        
        <CalculatorButton onClick={() => handleNumber('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => handleNumber('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => handleNumber('6')}>6</CalculatorButton>
        <CalculatorButton className="equals" onClick={handleEqual}>=</CalculatorButton>
        
        <CalculatorButton onClick={() => handleNumber('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => handleNumber('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => handleNumber('3')}>3</CalculatorButton>
        
        <CalculatorButton className="zero" onClick={() => handleNumber('0')}>0</CalculatorButton>
        <CalculatorButton onClick={handleDecimal}>.</CalculatorButton>
      </div>
    </div>
  );
};

export default memo(Calculator); 