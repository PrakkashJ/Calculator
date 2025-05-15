import { memo } from 'react';
import PropTypes from 'prop-types';

const CalculatorButton = memo(({ className, onClick, children }) => (
  <button 
    className={className} 
    onClick={onClick}
    aria-label={typeof children === 'string' ? children : 'Calculator button'}
  >
    {children}
  </button>
));

CalculatorButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

CalculatorButton.defaultProps = {
  className: ''
};

CalculatorButton.displayName = 'CalculatorButton';

export default CalculatorButton; 