import React from 'react';
import './SeparatorWithDate.sass'

export interface SeparatorWithDateProps {
  value?: string;
}

export const SeparatorWithDate = ({value}: SeparatorWithDateProps) => (
  <div className='separator-text'>
    {value}
  </div>
);
