import React, { useState } from 'react';

interface Props {
  type?: 'submit' | 'reset' | 'button' | undefined;
  buttonColor?: string;
  textColor?: string;
  bold?: string;
  width?: string;
  fontSize: string;
  text: string;
  className?: string;
}

export default function CustomButton({
  type = 'button',
  buttonColor = '#844704',
  textColor = '#FFF',
  bold = '500',
  width,
  fontSize,
  text,
  className = 'py-2 px-4 w-full',
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    borderRadius: '12px',
    backgroundColor: isHovered ? '#3A1F02' : buttonColor, // Change color on hover
    color: textColor,
    fontWeight: bold,
    width: width,
    fontSize: fontSize,
  };

  return (
    <button
      type={type}
      className={className}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
}
