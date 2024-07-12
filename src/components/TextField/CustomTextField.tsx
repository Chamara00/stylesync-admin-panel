import { TextField } from '@mui/material';
import React from 'react';

interface Props {
  id: string;
  name: string;
  width?: string;
  type?: string;
  autocomplete?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled?: boolean;
  value?: string;
}

export default function CustomTextField({
  id,
  name,
  type = 'text',
  autocomplete = 'off',
  width,
  onChange,
  disabled = false,
  value = '',
}: Props) {
  return (
    <TextField
      type={type}
      id={id}
      autoComplete={autocomplete}
      style={{ width: width }}
      name={name}
      onChange={onChange}
      size="small"
      disabled={disabled}
      defaultValue={value}
    />
  );
}
