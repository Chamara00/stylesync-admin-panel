import CustomTextField from './CustomTextField';
import React from 'react';

interface TextareaProps {
  text: React.ReactNode;
  width: string;
  id: string;
  type: string;
  name: string;
}

const CustomTextArea = ({ text, width, id, type, name }: TextareaProps) => {
  return (
    <div className="flex-col justify-start items-center">
      <div className="py-2 text-font_secondary font-[16px] text-normal">{text}</div>
      <CustomTextField width={width} id={id} type={type} name={name} />
    </div>
  );
};

export default CustomTextArea;
