import React from 'react';

interface Props {
  type: string;
  id: string;
  name: string;
  autocomplete?: string;
}

export default function CustomTextField({ type, id, name, autocomplete = 'off' }: Props) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-secondary"
      autoComplete={autocomplete}
    />
  );
}
