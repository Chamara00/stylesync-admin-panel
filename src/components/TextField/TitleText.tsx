import React from 'react';

interface Props {
  text: string;
}

export default function TitleText({ text }: Props) {
  return <div className="text-[20px] text-font_secondary font-bold">{text}</div>;
}
