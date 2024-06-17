import { TextField } from '@mui/material';
import React from 'react';

interface Props {
  id: string;
  name: string;
  width?: string;
  autocomplete?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function CustomTextField({ id, name, autocomplete = 'off', width, onChange }: Props) {
  return (
    <TextField
      id={id}
      autoComplete={autocomplete}
      style={{ width: width }}
      name={name}
      onChange={onChange}
      size="small"
    />
  );
}
