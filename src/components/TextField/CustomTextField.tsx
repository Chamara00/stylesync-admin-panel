import React from 'react';

interface Props {
  type: string;
  id: string;
  name: string;
  width?: string;
  autocomplete?: string;
}

export default function CustomTextField({ type, id, name, autocomplete = 'off', width }: Props) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      style={{ width: width }}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-secondary"
      autoComplete={autocomplete}
    />
  );
}
