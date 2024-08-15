import React from 'react';

const Button = ({ onClick, text, className, type }) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {text}
    </button>
  );
};

export default Button;