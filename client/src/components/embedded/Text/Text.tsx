import React from 'react';
import './Text.sass'

export interface TextProps {
  value?: string;
  className?: string;
}

export const Text = ({value = '', className = ''}: TextProps) => (
  <p className={'text ' + className}>{value}</p>
);
