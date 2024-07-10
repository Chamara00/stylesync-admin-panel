import CustomTextField from './CustomTextField';
import React from 'react';

interface TextareaProps {
  text: React.ReactNode;
  width: string;
  id: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string | number;
}

const CustomTextArea = ({ text, width, id, name, onChange, disabled = false, value = '' }: TextareaProps) => {
  return (
    <div className="flex-col justify-start items-center">
      <div className="py-2 text-font_secondary font-[16px] text-normal">{text}</div>
      <CustomTextField
        width={width}
        id={id}
        name={name}
        onChange={onChange}
        disabled={disabled}
        value={value.toString()}
      />
    </div>
  );
};

export default CustomTextArea;
