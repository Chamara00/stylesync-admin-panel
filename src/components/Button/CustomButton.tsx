import React, { useState } from 'react';

interface Props {
  type?: 'submit' | 'reset' | 'button' | undefined;
  buttonColor?: string;
  textColor?: string;
  bold?: string;
  width?: string;
  height?: string;
  fontSize: string;
  children: React.ReactNode;
  className?: string;
  border?: string;
  hoverColor?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<Props> = ({
  type = 'button',
  buttonColor = '#844704',
  hoverColor = '#3A1F02',
  textColor = '#FFF',
  bold = '500',
  width,
  height,
  fontSize,
  children,
  className = 'py-2 px-4 w-full',
  border = 'none',
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    borderRadius: '12px',
    backgroundColor: isHovered ? hoverColor : buttonColor,
    color: textColor,
    fontWeight: bold,
    width: width,
    height: height,
    fontSize: fontSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: border,
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default CustomButton;
